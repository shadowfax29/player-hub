"use client";

import { useState, useEffect } from "react";
import { CreditCard, CheckCircle, AlertCircle, Loader2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSupabase } from "@/lib/supabase";

export function HostBankSetup() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [kycStatus, setKycStatus] = useState<string>("pending");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    pan_number: "",
    bank_account_number: "",
    bank_ifsc: "",
    bank_holder_name: "",
  });

  useEffect(() => {
    fetchStatus();
  }, []);

  async function fetchStatus() {
    try {
      const { data: { session } } = await getSupabase().auth.getSession();
      const token = session?.access_token;
      if (!token) return;

      const res = await fetch("/api/host/onboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setOnboarded(data.onboarded);
      setKycStatus(data.kycStatus);

      const { data: { user } } = await getSupabase().auth.getUser();
      setForm((prev) => ({
        ...prev,
        full_name: user?.user_metadata?.full_name || "",
        email: user?.email || "",
      }));
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const { data: { session } } = await getSupabase().auth.getSession();
      const token = session?.access_token;
      if (!token) throw new Error("Not authenticated");

      const res = await fetch("/api/host/onboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setOnboarded(true);
      setKycStatus("submitted");
      setSuccess(data.message || "Bank details submitted successfully!");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-[#161929] border border-[#1e2235] rounded-2xl p-6">
        <div className="h-6 w-48 bg-[#1a1d2e] rounded animate-pulse mb-4" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-[#1a1d2e] rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (onboarded && kycStatus === "activated") {
    return (
      <div className="bg-[#161929] border border-emerald-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle size={20} className="text-emerald-400" />
          <h3 className="font-heading text-sm font-bold text-white tracking-wide">PAYOUTS ACTIVE</h3>
        </div>
        <p className="text-[#6b7280] text-xs leading-relaxed">
          Your bank account is verified. Guest payments will be automatically transferred to your account after each completed session (minus 15% platform fee).
        </p>
      </div>
    );
  }

  if (onboarded && kycStatus === "submitted") {
    return (
      <div className="bg-[#161929] border border-amber-500/30 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <AlertCircle size={20} className="text-amber-400" />
          <h3 className="font-heading text-sm font-bold text-white tracking-wide">VERIFICATION IN PROGRESS</h3>
        </div>
        <p className="text-[#6b7280] text-xs leading-relaxed">
          Your bank details have been submitted to Razorpay. Verification typically takes 1-2 business days. You&apos;ll be notified once approved.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#161929] border border-[#1e2235] rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-1">
        <CreditCard size={18} className="text-cyan-400" />
        <h3 className="font-heading text-sm font-bold text-white tracking-wide">BANK DETAILS FOR PAYOUTS</h3>
      </div>
      <p className="text-[#6b7280] text-[11px] mb-5 ml-7">
        Required to receive guest payments via Razorpay Route (15% platform fee deducted automatically)
      </p>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4 text-xs text-red-400">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg px-4 py-3 mb-4 text-xs text-emerald-400">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] text-[#6b7280] tracking-widest font-semibold mb-1.5">FULL NAME</label>
            <input
              type="text"
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#6b7280] focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] text-[#6b7280] tracking-widest font-semibold mb-1.5">EMAIL</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#6b7280] focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] text-[#6b7280] tracking-widest font-semibold mb-1.5">PHONE</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#6b7280] focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-[10px] text-[#6b7280] tracking-widest font-semibold mb-1.5">PAN NUMBER</label>
            <input
              type="text"
              value={form.pan_number}
              onChange={(e) => setForm({ ...form, pan_number: e.target.value.toUpperCase() })}
              placeholder="ABCDE1234F"
              maxLength={10}
              className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#6b7280] focus:border-purple-500 focus:outline-none uppercase"
              required
            />
          </div>
        </div>

        <div className="border-t border-[#1e2235] pt-4 mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={14} className="text-purple-400" />
            <span className="text-[10px] text-[#6b7280] tracking-widest font-semibold">BANK ACCOUNT</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-[10px] text-[#6b7280] tracking-widest font-semibold mb-1.5">ACCOUNT NUMBER</label>
              <input
                type="text"
                value={form.bank_account_number}
                onChange={(e) => setForm({ ...form, bank_account_number: e.target.value })}
                placeholder="1234567890"
                className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#6b7280] focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] text-[#6b7280] tracking-widest font-semibold mb-1.5">IFSC CODE</label>
              <input
                type="text"
                value={form.bank_ifsc}
                onChange={(e) => setForm({ ...form, bank_ifsc: e.target.value.toUpperCase() })}
                placeholder="SBIN0001234"
                maxLength={11}
                className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#6b7280] focus:border-purple-500 focus:outline-none uppercase"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-[10px] text-[#6b7280] tracking-widest font-semibold mb-1.5">ACCOUNT HOLDER NAME</label>
            <input
              type="text"
              value={form.bank_holder_name}
              onChange={(e) => setForm({ ...form, bank_holder_name: e.target.value })}
              placeholder="As per bank records"
              className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-[#6b7280] focus:border-purple-500 focus:outline-none"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={submitting}
          className="w-full mt-4 tracking-widest text-xs gap-2"
        >
          {submitting ? (
            <>
              <Loader2 size={14} className="animate-spin" /> SUBMITTING...
            </>
          ) : (
            "SUBMIT BANK DETAILS"
          )}
        </Button>
      </form>
    </div>
  );
}
