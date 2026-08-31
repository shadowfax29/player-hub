import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function verifyWebhookSignature(body: string, signature: string, secret: string): boolean {
  try {
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");
    return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (webhookSecret && webhookSecret !== "placeholder_webhook_secret") {
      const isValid = verifyWebhookSignature(body, signature, webhookSecret);
      if (!isValid) {
        console.error("Webhook signature verification failed");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(body);
    const eventType = event.event;
    const payload = event.payload;

    console.log(`Razorpay webhook: ${eventType}`);

    // ─── ACCOUNT EVENTS ───
    if (eventType === "account.activated" || eventType === "account.instantly_activated") {
      const accountId = payload?.account?.id;
      if (accountId) {
        await supabase.from("profiles").update({ kyc_status: "activated" }).eq("razorpay_account_id", accountId);
        console.log(`Account ${accountId} activated`);
      }
    }

    if (eventType === "account.activated_kyc_pending") {
      const accountId = payload?.account?.id;
      if (accountId) {
        await supabase.from("profiles").update({ kyc_status: "kyc_pending" }).eq("razorpay_account_id", accountId);
        console.log(`Account ${accountId} activated but KYC pending`);
      }
    }

    // ─── PAYMENT EVENTS ───
    if (eventType === "payment.captured") {
      const paymentId = payload?.payment?.entity?.id;
      const orderId = payload?.payment?.entity?.order_id;
      console.log(`Payment captured: ${paymentId} for order ${orderId}`);
    }

    if (eventType === "payment.authorized") {
      const paymentId = payload?.payment?.entity?.id;
      console.log(`Payment authorized: ${paymentId}`);
    }

    if (eventType === "payment.failed") {
      const paymentId = payload?.payment?.entity?.id;
      const error = payload?.payment?.entity?.error_description;
      console.error(`Payment failed: ${paymentId} — ${error}`);
    }

    // ─── ORDER EVENTS ───
    if (eventType === "order.paid") {
      const orderId = payload?.order?.entity?.id;
      const amount = payload?.order?.entity?.amount_paid;
      console.log(`Order paid: ${orderId} — ₹${amount / 100}`);
    }

    // ─── DISPUTE EVENTS ───
    if (eventType?.startsWith("payment.dispute.")) {
      const disputeId = payload?.dispute?.entity?.id;
      const status = eventType.split(".")[2];
      console.log(`Dispute ${disputeId}: ${status}`);
    }

    // ─── REFUND EVENTS ───
    if (eventType === "refund.created" || eventType === "refund.processed" || eventType === "refund.failed" || eventType === "refund.speed_changed") {
      const refundId = payload?.refund?.entity?.id;
      const paymentId = payload?.refund?.entity?.payment_id;
      const status = eventType.split(".")[1];
      console.log(`Refund ${refundId} for payment ${paymentId}: ${status}`);

      if (status === "processed" && paymentId) {
        const { data: booking } = await supabase
          .from("bookings")
          .select("id, status")
          .eq("payment_id", paymentId)
          .single();
        if (booking) {
          await supabase.from("bookings").update({ status: "cancelled" }).eq("id", booking.id);
        }
      }
    }

    // ─── SETTLEMENT EVENTS ───
    if (eventType === "settlement.processed") {
      const settlementId = payload?.settlement?.entity?.id;
      const amount = payload?.settlement?.entity?.amount;
      console.log(`Settlement processed: ${settlementId} — ₹${amount / 100}`);
    }

    // ─── FUND ACCOUNT EVENTS ───
    if (eventType === "fund_account.validation.completed") {
      const fundAccountId = payload?.fund_account?.entity?.id;
      console.log(`Fund account validated: ${fundAccountId}`);
    }

    if (eventType === "fund_account.validation.failed") {
      const fundAccountId = payload?.fund_account?.entity?.id;
      console.error(`Fund account validation failed: ${fundAccountId}`);
    }

    // ─── INVOICE EVENTS ───
    if (eventType?.startsWith("invoice.")) {
      const invoiceId = payload?.invoice?.entity?.id;
      const status = eventType.split(".")[1];
      console.log(`Invoice ${invoiceId}: ${status}`);
    }

    // ─── DOWNTIME EVENTS ───
    if (eventType?.startsWith("payment.downtime.")) {
      const status = eventType.split(".")[2];
      console.log(`Payment downtime: ${status}`);
    }

    // ─── PAYMENT LINK EVENTS ───
    if (eventType?.startsWith("payment_link.")) {
      const paymentLinkId = payload?.payment_link?.entity?.id;
      const status = eventType.split(".")[1];
      console.log(`Payment link ${paymentLinkId}: ${status}`);
    }

    // ─── ENGAGE EVENTS ───
    if (eventType?.startsWith("engage.")) {
      console.log(`Engage event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
