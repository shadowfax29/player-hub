"use client";

import { useState } from "react";
import { CreditCard, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
    confirm_close?: boolean;
    backdropclose?: boolean;
  };
  notes?: Record<string, string>;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, handler: (response: { error: { description: string } }) => void) => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayCheckoutProps {
  bookingId: string;
  amount: number;
  listingTitle: string;
  onSuccess: () => void;
  onError?: (error: string) => void;
}

export function RazorpayCheckout({ bookingId, amount, listingTitle, onSuccess, onError }: RazorpayCheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setPaymentStatus("processing");
    setErrorMsg("");

    try {
      const { data: { session } } = await getSupabase().auth.getSession();
      const token = session?.access_token;
      if (!token) {
        setErrorMsg("Session expired. Please log in again.");
        setPaymentStatus("failed");
        setLoading(false);
        return;
      }

      // 1. Create order on server
      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ booking_id: bookingId }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        setErrorMsg(orderData.error || "Failed to create payment order.");
        setPaymentStatus("failed");
        setLoading(false);
        return;
      }

      // 2. Open Razorpay checkout
      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "PlayConsole",
        description: `Booking: ${orderData.listingTitle}`,
        order_id: orderData.orderId,
        handler: async (response: RazorpayResponse) => {
          // 3. Verify payment on server
          try {
            const verifyRes = await fetch("/api/payments/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                ...response,
                booking_id: bookingId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              setPaymentStatus("success");
              onSuccess();
            } else {
              setErrorMsg(verifyData.error || "Payment verification failed.");
              setPaymentStatus("failed");
              onError?.(verifyData.error);
            }
          } catch {
            setErrorMsg("Payment verification failed. Contact support.");
            setPaymentStatus("failed");
            onError?.("Verification request failed");
          }
          setLoading(false);
        },
        prefill: {
          name: orderData.customerName,
          email: orderData.customerEmail,
        },
        theme: {
          color: "#06b6d4",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            setPaymentStatus("idle");
          },
          confirm_close: true,
          backdropclose: false,
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response: { error: { description: string } }) => {
        setErrorMsg(response.error?.description || "Payment failed.");
        setPaymentStatus("failed");
        setLoading(false);
      });
      rzp.open();
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setPaymentStatus("failed");
      setLoading(false);
    }
  };

  if (paymentStatus === "success") {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 text-center">
        <CheckCircle2 size={32} className="text-emerald-400 mx-auto mb-2" />
        <p className="text-sm font-bold text-emerald-400 tracking-wide">PAYMENT SUCCESSFUL</p>
        <p className="text-xs text-[#a0aec0] mt-1">Your booking is now confirmed!</p>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="cyan"
        size="lg"
        className="w-full tracking-widest"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 size={16} className="animate-spin" />
            PROCESSING...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <CreditCard size={16} />
            PAY ₹{amount.toFixed(2)}
          </span>
        )}
      </Button>

      {paymentStatus === "failed" && errorMsg && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mt-3">
          <div className="flex items-start gap-2">
            <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400 text-xs">{errorMsg}</p>
          </div>
        </div>
      )}

      <p className="text-center text-[10px] text-[#6b7280] mt-2">
        Secure payment powered by Razorpay
      </p>
    </div>
  );
}
