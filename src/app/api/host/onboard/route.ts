import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const RAZORPAY_API = "https://api.razorpay.com/v1";

async function razorpayAuth() {
  return "Basic " + Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
}

export async function POST(request: NextRequest) {
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

  if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.includes("placeholder")) {
    return NextResponse.json({ error: "Razorpay not configured" }, { status: 503 });
  }

  const body = await request.json();
  const { full_name, email, phone, pan_number, bank_account_number, bank_ifsc, bank_holder_name } = body;

  if (!full_name || !email || !phone || !pan_number || !bank_account_number || !bank_ifsc || !bank_holder_name) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("razorpay_account_id, kyc_status")
    .eq("id", user.id)
    .single();

  if (profile?.razorpay_account_id && profile?.kyc_status === "activated") {
    return NextResponse.json({ error: "Already onboarded" }, { status: 400 });
  }

  const authorization = await razorpayAuth();

  try {
    let accountId = profile?.razorpay_account_id;

    // Step 1: Create Linked Account via raw API
    if (!accountId) {
      const accountRes = await fetch(`${RAZORPAY_API}/accounts`, {
        method: "POST",
        headers: { Authorization: authorization, "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          contact_name: full_name,
          phone: phone.replace(/[^0-9]/g, ""),
          profile: { category: "services", subcategory: "gaming" },
          legal_business_name: full_name,
          business_type: "individual",
          legal_info: { pan: pan_number },
          type: "route",
        }),
      });
      const accountData = await accountRes.json();
      if (!accountRes.ok) throw new Error(accountData.error?.description || "Failed to create linked account");
      accountId = accountData.id;
    }

    // Step 2: Create Stakeholder via raw API (required for Route)
    try {
      await fetch(`${RAZORPAY_API}/accounts/${accountId}/stakeholders`, {
        method: "POST",
        headers: { Authorization: authorization, "Content-Type": "application/json" },
        body: JSON.stringify({
          name: full_name,
          email,
          phone: { primary: phone.replace(/[^0-9]/g, "") },
          relationship: { director: true },
          kyc_details: { pan: pan_number },
        }),
      });
    } catch {
      // Non-critical: stakeholder may already exist
    }

    // Step 3: Request Product Configuration via raw API
    let configId: string | null = null;
    try {
      const configRes = await fetch(`${RAZORPAY_API}/accounts/${accountId}/product_configurations`, {
        method: "POST",
        headers: { Authorization: authorization, "Content-Type": "application/json" },
        body: JSON.stringify({ product: "route" }),
      });
      const configData = await configRes.json();
      if (configRes.ok) configId = configData.id;
    } catch {
      // Config may already exist
    }

    // Step 4: Update Product Config with bank details
    if (configId) {
      try {
        await fetch(`${RAZORPAY_API}/accounts/${accountId}/product_configurations/${configId}`, {
          method: "PUT",
          headers: { Authorization: authorization, "Content-Type": "application/json" },
          body: JSON.stringify({
            route: {
              bank_account: {
                ifsc: bank_ifsc,
                account_number: bank_account_number,
                beneficiary_name: bank_holder_name,
              },
            },
          }),
        });
      } catch {
        // Non-critical: will need manual bank detail setup
      }
    }

    // Step 5: Update profile in database
    const { error: updateError } = await auth
      .from("profiles")
      .update({
        razorpay_account_id: accountId,
        bank_account_number,
        bank_ifsc,
        bank_holder_name,
        pan_number,
        kyc_status: "submitted",
      })
      .eq("id", user.id);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      accountId,
      message: "Bank details submitted. Verification in progress.",
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Onboarding failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
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
}
