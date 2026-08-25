"use client";

import { useState, useEffect } from "react";
import { DollarSign, Clock, CheckCircle, XCircle, Users } from "lucide-react";

interface PayoutStats {
  totalRevenue: number;
  platformFees: number;
  totalHostPayouts: number;
  pendingPayouts: number;
  processedPayouts: number;
  failedTransfers: number;
  totalBookings: number;
}

interface HostSummary {
  id: string;
  name: string;
  email: string;
  totalEarned: number;
  totalFees: number;
  bookings: number;
  kycStatus: string;
}

interface PayoutBooking {
  id: string;
  booking_date: string;
  total_price: number;
  hours: number;
  status: string;
  payment_status: string;
  payment_id: string;
  transfer_id: string | null;
  transfer_status: string;
  platform_fee: number;
  host_payout: number;
  paid_at: string;
  host_id: string;
  guest_id: string;
  listings: { title: string; location: string };
  profiles: { full_name: string; email: string } | null;
}

export default function AdminPayoutsPage() {
  const [stats, setStats] = useState<PayoutStats | null>(null);
  const [hosts, setHosts] = useState<HostSummary[]>([]);
  const [bookings, setBookings] = useState<PayoutBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [tab, setTab] = useState<"overview" | "hosts" | "transactions">("overview");

  useEffect(() => {
    fetchPayouts();
  }, [filter]);

  async function fetchPayouts() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/payouts?status=${filter}`);
      const data = await res.json();
      setStats(data.stats);
      setHosts(data.hosts || []);
      setBookings(data.bookings || []);
    } catch {
      console.error("Failed to fetch payouts");
    } finally {
      setLoading(false);
    }
  }

  const transferStatusColors: Record<string, string> = {
    processed: "bg-emerald-500/20 text-emerald-400",
    pending: "bg-amber-500/20 text-amber-400",
    failed: "bg-red-500/20 text-red-400",
    not_started: "bg-slate-500/20 text-slate-400",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            PAYOUTS
          </h1>
          <p className="text-[#6b7280] text-xs mt-1">Platform revenue and host payouts via Razorpay Route</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={14} className="text-cyan-400" />
            <span className="text-[10px] text-[#6b7280] tracking-widest font-semibold">PLATFORM REVENUE</span>
          </div>
          <p className="font-heading text-2xl font-bold text-white">₹{stats?.platformFees.toLocaleString() || 0}</p>
          <p className="text-[10px] text-[#6b7280] mt-1">15% platform fee</p>
        </div>
        <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={14} className="text-amber-400" />
            <span className="text-[10px] text-[#6b7280] tracking-widest font-semibold">PENDING PAYOUTS</span>
          </div>
          <p className="font-heading text-2xl font-bold text-amber-400">₹{stats?.pendingPayouts.toLocaleString() || 0}</p>
          <p className="text-[10px] text-[#6b7280] mt-1">Settling in T+2 days</p>
        </div>
        <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={14} className="text-emerald-400" />
            <span className="text-[10px] text-[#6b7280] tracking-widest font-semibold">SETTLED TO HOSTS</span>
          </div>
          <p className="font-heading text-2xl font-bold text-emerald-400">₹{stats?.processedPayouts.toLocaleString() || 0}</p>
          <p className="text-[10px] text-[#6b7280] mt-1">{stats?.totalBookings || 0} bookings</p>
        </div>
        <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <XCircle size={14} className="text-red-400" />
            <span className="text-[10px] text-[#6b7280] tracking-widest font-semibold">FAILED TRANSFERS</span>
          </div>
          <p className="font-heading text-2xl font-bold text-red-400">{stats?.failedTransfers || 0}</p>
          <p className="text-[10px] text-[#6b7280] mt-1">Requires attention</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-[#161929] border border-[#1e2235] rounded-xl p-1 mb-6 w-fit">
        {(["overview", "hosts", "transactions"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest transition-colors ${
              tab === t ? "bg-purple-500/20 text-white" : "text-[#6b7280] hover:text-white"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Filter bar (transactions tab) */}
      {tab === "transactions" && (
        <div className="flex gap-2 mb-4">
          {["all", "pending", "processed", "failed", "not_started"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest transition-colors ${
                filter === f ? "bg-purple-500/20 text-white border border-purple-500/30" : "text-[#6b7280] border border-[#2a2d45] hover:text-white"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-[#161929] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Overview Tab */}
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-6">
                <h3 className="font-heading text-sm font-bold text-white mb-4 tracking-wide border-l-4 border-purple-500 pl-3">
                  PLATFORM FEE SUMMARY
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-[#1a1d2e] border border-[#2a2d45] rounded-xl p-4 text-center">
                    <p className="text-[10px] text-[#6b7280] tracking-widest mb-1">TOTAL REVENUE</p>
                    <p className="font-heading text-xl font-bold text-white">₹{stats?.totalRevenue.toLocaleString() || 0}</p>
                  </div>
                  <div className="bg-[#1a1d2e] border border-[#2a2d45] rounded-xl p-4 text-center">
                    <p className="text-[10px] text-[#6b7280] tracking-widest mb-1">PLATFORM EARNED</p>
                    <p className="font-heading text-xl font-bold text-cyan-400">₹{stats?.platformFees.toLocaleString() || 0}</p>
                  </div>
                  <div className="bg-[#1a1d2e] border border-[#2a2d45] rounded-xl p-4 text-center">
                    <p className="text-[10px] text-[#6b7280] tracking-widest mb-1">HOSTS EARNED</p>
                    <p className="font-heading text-xl font-bold text-emerald-400">₹{stats?.totalHostPayouts.toLocaleString() || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hosts Tab */}
          {tab === "hosts" && (
            <div className="bg-[#161929] border border-[#1e2235] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#1e2235]">
                      <th className="text-left px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">HOST</th>
                      <th className="text-left px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">EMAIL</th>
                      <th className="text-center px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">KYC</th>
                      <th className="text-center px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">BOOKINGS</th>
                      <th className="text-right px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">EARNED</th>
                      <th className="text-right px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">PLATFORM FEES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hosts.map((host) => (
                      <tr key={host.id} className="border-b border-[#1e2235]/50 hover:bg-white/[0.02]">
                        <td className="px-4 py-3 text-white font-medium flex items-center gap-2">
                          <Users size={12} className="text-purple-400" />
                          {host.name}
                        </td>
                        <td className="px-4 py-3 text-[#6b7280]">{host.email}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest ${
                            host.kycStatus === "activated"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : host.kycStatus === "submitted"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-slate-500/20 text-slate-400"
                          }`}>
                            {host.kycStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center text-white font-bold">{host.bookings}</td>
                        <td className="px-4 py-3 text-right text-emerald-400 font-bold">₹{host.totalEarned}</td>
                        <td className="px-4 py-3 text-right text-cyan-400 font-bold">₹{host.totalFees}</td>
                      </tr>
                    ))}
                    {hosts.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-[#6b7280] text-xs">
                          No hosts with paid bookings yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {tab === "transactions" && (
            <div className="bg-[#161929] border border-[#1e2235] rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-[#1e2235]">
                      <th className="text-left px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">DATE</th>
                      <th className="text-left px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">LISTING</th>
                      <th className="text-left px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">HOST</th>
                      <th className="text-right px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">AMOUNT</th>
                      <th className="text-right px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">HOST PAYOUT</th>
                      <th className="text-center px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">TRANSFER</th>
                      <th className="text-left px-4 py-3 text-[10px] text-[#6b7280] tracking-widest font-semibold">TRANSFER ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-[#1e2235]/50 hover:bg-white/[0.02]">
                        <td className="px-4 py-3 text-[#a0aec0]">
                          {new Date(b.booking_date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-white font-medium">{b.listings?.title || "—"}</td>
                        <td className="px-4 py-3 text-[#a0aec0]">{b.profiles?.full_name || "—"}</td>
                        <td className="px-4 py-3 text-right text-white font-bold">₹{b.total_price}</td>
                        <td className="px-4 py-3 text-right text-emerald-400 font-bold">₹{b.host_payout}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest ${
                            transferStatusColors[b.transfer_status] || ""
                          }`}>
                            {b.transfer_status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#6b7280] font-mono text-[10px]">
                          {b.transfer_id || "—"}
                        </td>
                      </tr>
                    ))}
                    {bookings.length === 0 && (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-[#6b7280] text-xs">
                          No paid bookings yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
