import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const RAZORPAY_API = "https://api.razorpay.com/v1";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
const IFSC_REGEX = /^[A-Z]{4}0[A-Z0-9]{6}$/;
const PHONE_REGEX = /^[6-9]\d{9}$/;
const ACCOUNT_REGEX = /^\d{9,18}$/;

function getRazorpayAuth(): string | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret || keyId.includes("placeholder") || keySecret.includes("placeholder")) {
    return null;
  }
  return "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64");
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    const auth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user }, error: authError } = await auth.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { full_name, email, phone, pan_number, bank_account_number, bank_ifsc, bank_holder_name } = body;

    if (!full_name || !email || !phone || !pan_number || !bank_account_number || !bank_ifsc || !bank_holder_name) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    const cleanPan = pan_number.toUpperCase();
    const cleanIfsc = bank_ifsc.toUpperCase();

    if (!PHONE_REGEX.test(cleanPhone)) {
      return NextResponse.json({ error: "Invalid phone number. Enter a valid 10-digit Indian mobile number." }, { status: 400 });
    }
    if (!PAN_REGEX.test(cleanPan)) {
      return NextResponse.json({ error: "Invalid PAN number. Format: ABCDE1234F" }, { status: 400 });
    }
    if (!ACCOUNT_REGEX.test(bank_account_number)) {
      return NextResponse.json({ error: "Invalid account number. Must be 9-18 digits." }, { status: 400 });
    }
    if (!IFSC_REGEX.test(cleanIfsc)) {
      return NextResponse.json({ error: "Invalid IFSC code. Format: SBIN0001234" }, { status: 400 });
    }
    if (bank_holder_name.trim().length < 3) {
      return NextResponse.json({ error: "Account holder name must be at least 3 characters." }, { status: 400 });
    }

    // Check if already onboarded
    const { data: profile } = await supabase
      .from("profiles")
      .select("razorpay_account_id, kyc_status")
      .eq("id", user.id)
      .single();

    if (profile?.razorpay_account_id && profile?.kyc_status === "activated") {
      return NextResponse.json({ error: "Already onboarded" }, { status: 400 });
    }

    // Always save bank details to DB first
    const { error: updateError } = await auth
      .from("profiles")
      .update({
        bank_account_number,
        bank_ifsc: cleanIfsc,
        bank_holder_name: bank_holder_name.trim(),
        pan_number: cleanPan,
        kyc_status: "submitted",
      })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    // Attempt Razorpay onboarding if keys are configured
    const authorization = getRazorpayAuth();
    let accountId = profile?.razorpay_account_id || null;
    let razorpayError: string | null = null;

    if (authorization) {
      try {
        // Step 1: Create Linked Account
        if (!accountId) {
          const accountRes = await fetch(`${RAZORPAY_API}/accounts`, {
            method: "POST",
            headers: { Authorization: authorization, "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              contact_name: full_name,
              phone: cleanPhone,
              profile: { category: "services", subcategory: "gaming" },
              legal_business_name: full_name,
              business_type: "individual",
              legal_info: { pan: cleanPan },
              type: "route",
            }),
          });
          const accountData = await accountRes.json();
          if (!accountRes.ok) throw new Error(accountData.error?.description || "Failed to create linked account");
          accountId = accountData.id;
        }

        // Step 2: Create Stakeholder
        try {
          await fetch(`${RAZORPAY_API}/accounts/${accountId}/stakeholders`, {
            method: "POST",
            headers: { Authorization: authorization, "Content-Type": "application/json" },
            body: JSON.stringify({
              name: full_name,
              email,
              phone: { primary: cleanPhone },
              relationship: { director: true },
              kyc_details: { pan: cleanPan },
            }),
          });
        } catch { /* non-critical */ }

        // Step 3: Request Product Configuration
        let configId: string | null = null;
        try {
          const configRes = await fetch(`${RAZORPAY_API}/accounts/${accountId}/product_configurations`, {
            method: "POST",
            headers: { Authorization: authorization, "Content-Type": "application/json" },
            body: JSON.stringify({ product: "route" }),
          });
          const configData = await configRes.json();
          if (configRes.ok) configId = configData.id;
        } catch { /* may already exist */ }

        // Step 4: Update Product Config with bank details
        if (configId) {
          try {
            await fetch(`${RAZORPAY_API}/accounts/${accountId}/product_configurations/${configId}`, {
              method: "PUT",
              headers: { Authorization: authorization, "Content-Type": "application/json" },
              body: JSON.stringify({
                route: {
                  bank_account: {
                    ifsc: cleanIfsc,
                    account_number: bank_account_number,
                    beneficiary_name: bank_holder_name.trim(),
                  },
                },
              }),
            });
          } catch { /* non-critical */ }
        }

        // Update profile with Razorpay account ID
        if (accountId) {
          await auth.from("profiles").update({ razorpay_account_id: accountId }).eq("id", user.id);
        }
      } catch (err) {
        razorpayError = err instanceof Error ? err.message : "Razorpay onboarding failed";
      }
    }

    return NextResponse.json({
      success: true,
      accountId: accountId || null,
      message: razorpayError
        ? `Bank details saved. Razorpay onboarding pending: ${razorpayError}`
        : "Bank details submitted. Verification in progress.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const token = authHeader.split(" ")[1];

    const auth = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { global: { headers: { Authorization: `Bearer ${token}` } } }
    );

    const { data: { user }, error: authError } = await auth.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("razorpay_account_id, kyc_status, bank_holder_name, bank_ifsc, bank_account_number, pan_number")
      .eq("id", user.id)
      .single();

    return NextResponse.json({
      onboarded: !!profile?.razorpay_account_id,
      kycStatus: profile?.kyc_status || "pending",
      bankHolderName: profile?.bank_holder_name || "",
      bankIfsc: profile?.bank_ifsc || "",
      hasBankDetails: !!profile?.bank_account_number,
      hasPan: !!profile?.pan_number,
    });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
