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
    if (webhookSecret) {
      const isValid = verifyWebhookSignature(body, signature, webhookSecret);
      if (!isValid) {
        console.error("Webhook signature verification failed");
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
      }
    }

    const event = JSON.parse(body);
    const eventType = event.event;
    const payload = event.payload;

    console.log(`Razorpay webhook received: ${eventType}`);

    switch (eventType) {
      case "account.activated": {
        const accountId = payload?.account?.id;
        if (!accountId) break;

        const { error } = await supabase
          .from("profiles")
          .update({ kyc_status: "activated" })
          .eq("razorpay_account_id", accountId);

        if (error) {
          console.error("Failed to update kyc_status:", error.message);
        } else {
          console.log(`Account ${accountId} activated — KYC verified`);
        }
        break;
      }

      case "account.deactivated": {
        const accountId = payload?.account?.id;
        if (!accountId) break;

        const { error } = await supabase
          .from("profiles")
          .update({ kyc_status: "deactivated" })
          .eq("razorpay_account_id", accountId);

        if (error) {
          console.error("Failed to deactivate account:", error.message);
        } else {
          console.log(`Account ${accountId} deactivated`);
        }
        break;
      }

      case "payout.processed": {
        const payoutId = payload?.payout?.id;
        const accountId = payload?.payout?.account_id;
        console.log(`Payout ${payoutId} processed for account ${accountId}`);
        break;
      }

      case "payout.failed": {
        const payoutId = payload?.payout?.id;
        const accountId = payload?.payout?.account_id;
        const reason = payload?.payout?.failure_reason;
        console.error(`Payout ${payoutId} failed for account ${accountId}:`, reason);
        break;
      }

      default:
        console.log(`Unhandled event: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
