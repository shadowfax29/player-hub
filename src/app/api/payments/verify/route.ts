import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const RAZORPAY_API = "https://api.razorpay.com/v1";

async function razorpayAuth() {
  return "Basic " + Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString("base64");
}

async function initiateTransfer(
  paymentId: string,
  hostAccountId: string,
  hostPayoutPaise: number,
  orderId: string,
  bookingId: string
) {
  try {
    const authorization = await razorpayAuth();
    const res = await fetch(`${RAZORPAY_API}/payments/${paymentId}/transfers`, {
      method: "POST",
      headers: { Authorization: authorization, "Content-Type": "application/json" },
      body: JSON.stringify({
        transfers: [
          {
            account: hostAccountId,
            amount: hostPayoutPaise,
            currency: "INR",
            notes: { booking_id: bookingId, order_id: orderId },
            linked_account_notes: ["booking_id"],
            on_hold: 0,
          },
        ],
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error?.description || "Transfer failed");

    const transferId = data.id || data.transfers?.[0]?.id || null;
    return { transferId, status: "pending", error: "" };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Transfer failed";
    console.error("Transfer failed:", msg);
    return { transferId: null, status: "failed" as const, error: msg };
  }
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

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, booking_id } = await request.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !booking_id) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Verify signature: HMAC-SHA256(order_id|payment_id, key_secret)
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return NextResponse.json({ success: false, error: "Invalid payment signature" }, { status: 400 });
  }

  // Fetch booking to get host info and price
  const { data: booking } = await supabase
    .from("bookings")
    .select("id, host_id, total_price")
    .eq("id", booking_id)
    .single();

  if (!booking) {
    return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 });
  }

  // Fetch host profile for Razorpay account
  const { data: hostProfile } = await supabase
    .from("profiles")
    .select("razorpay_account_id, platform_fee_percent")
    .eq("id", booking.host_id)
    .single();

  // Calculate splits
  const feePercent = hostProfile?.platform_fee_percent || 15;
  const platformFee = Math.round(booking.total_price * (feePercent / 100) * 100); // in paise
  const hostPayoutPaise = Math.round(booking.total_price * 100) - platformFee;

  // Update booking with payment + split info
  const { error: updateError } = await auth
    .from("bookings")
    .update({
      payment_id: razorpay_payment_id,
      payment_order_id: razorpay_order_id,
      payment_status: "paid",
      payment_method: "razorpay",
      paid_at: new Date().toISOString(),
      status: "confirmed",
      platform_fee: platformFee / 100,
      host_payout: hostPayoutPaise / 100,
    })
    .eq("id", booking_id)
    .eq("guest_id", user.id);

  if (updateError) {
    return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
  }

  // Initiate transfer to host if they have a Razorpay linked account
  let transferResult = { transferId: null as string | null, status: "skipped" as string, error: "" };

  if (hostProfile?.razorpay_account_id && process.env.RAZORPAY_KEY_ID && !process.env.RAZORPAY_KEY_ID.includes("placeholder")) {
    transferResult = await initiateTransfer(
      razorpay_payment_id,
      hostProfile.razorpay_account_id,
      hostPayoutPaise,
      razorpay_order_id,
      booking_id
    );

    // Update booking with transfer info
    await auth
      .from("bookings")
      .update({
        transfer_id: transferResult.transferId,
        transfer_status: transferResult.status,
      })
      .eq("id", booking_id);
  }

  return NextResponse.json({
    success: true,
    transfer: {
      status: transferResult.status,
      hostPayout: hostPayoutPaise / 100,
      platformFee: platformFee / 100,
      error: transferResult.error || undefined,
    },
  });
}
