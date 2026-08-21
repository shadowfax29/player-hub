import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Razorpay from "razorpay";

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

  const body = await request.json();
  const { booking_id } = body;

  if (!booking_id) {
    return NextResponse.json({ error: "booking_id is required" }, { status: 400 });
  }

  // Fetch the booking and verify ownership (use auth client for RLS)
  const { data: booking, error: bookingError } = await auth
    .from("bookings")
    .select("id, guest_id, total_price, payment_status, listing_id")
    .eq("id", booking_id)
    .single();

  if (bookingError || !booking) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 });
  }

  if (booking.guest_id !== user.id) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  if (booking.payment_status === "paid") {
    return NextResponse.json({ error: "Already paid" }, { status: 400 });
  }

  // Fetch listing title for the receipt
  const { data: listing } = await auth
    .from("listings")
    .select("title")
    .eq("id", booking.listing_id)
    .single();

  // Razorpay amount in paise (INR). If your prices are in USD, convert to INR.
  // For now we assume prices are already in INR-compatible units (multiply by 100 for paise).
  const amountInPaise = Math.round(booking.total_price * 100);

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  const order = await razorpay.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: `bk_${booking.id.slice(0, 30)}`,
    notes: {
      booking_id: booking.id,
      guest_id: user.id,
      listing_title: listing?.title || "Gaming Session",
    },
  });

  // Store order_id on the booking
  await auth
    .from("bookings")
    .update({ payment_order_id: order.id })
    .eq("id", booking.id);

  return NextResponse.json({
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    bookingId: booking.id,
    listingTitle: listing?.title || "Gaming Session",
    customerName: user.user_metadata?.full_name || user.email?.split("@")[0] || "",
    customerEmail: user.email || "",
  });
}
