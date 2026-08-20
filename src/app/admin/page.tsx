"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

interface Stats {
  users: { total: number; hosts: number; guests: number; verified: number; banned: number };
  listings: { total: number; active: number; pending: number; inactive: number; needsApproval: number };
  bookings: { total: number; pending: number; confirmed: number; completed: number; cancelled: number; totalRevenue: number };
  reviews: { total: number; avgRating: string };
  disputes: { total: number; open: number; investigating: number; resolved: number };
}

function StatCard({ label, value, sub, color }: { label: string; value: string | number; sub?: string; color: string }) {
  return (
    <div className="bg-[#171b27] border border-white/5 rounded-xl p-5">
      <p className="text-[10px] text-[#6b7280] tracking-widest uppercase mb-2">{label}</p>
      <p className={`text-3xl font-bold font-headline ${color}`}>{value}</p>
      {sub && <p className="text-xs text-[#6b7280] mt-1">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data: { session } } = await getSupabase().auth.getSession();
      if (!session) return;
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (res.ok) setStats(await res.json());
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!stats) return <p className="text-[#6b7280] text-sm">Failed to load stats.</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-wide">Dashboard</h1>
        <p className="text-[#6b7280] text-sm mt-1">Platform overview and key metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.users.total} sub={`${stats.users.hosts} hosts · ${stats.users.guests} guests`} color="text-white" />
        <StatCard label="Total Listings" value={stats.listings.total} sub={`${stats.listings.active} active · ${stats.listings.needsApproval} need approval`} color="text-white" />
        <StatCard label="Total Bookings" value={stats.bookings.total} sub={`${stats.bookings.completed} completed`} color="text-white" />
        <StatCard label="Revenue" value={`$${stats.bookings.totalRevenue.toLocaleString()}`} sub={`${stats.bookings.pending} pending bookings`} color="text-emerald-400" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Avg Rating" value={stats.reviews.avgRating} sub={`${stats.reviews.total} reviews`} color="text-amber-400" />
        <StatCard label="Open Disputes" value={stats.disputes.open} sub={`${stats.disputes.investigating} investigating`} color="text-red-400" />
        <StatCard label="Verified Users" value={stats.users.verified} sub={`of ${stats.users.total} total`} color="text-purple-400" />
        <StatCard label="Banned Users" value={stats.users.banned} sub="permanently banned" color="text-red-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#171b27] border border-white/5 rounded-xl p-5">
          <p className="text-[10px] text-[#6b7280] tracking-widest uppercase mb-4">Booking Status</p>
          <div className="space-y-3">
            {[
              { label: "Pending", value: stats.bookings.pending, color: "bg-amber-500" },
              { label: "Confirmed", value: stats.bookings.confirmed, color: "bg-blue-500" },
              { label: "Completed", value: stats.bookings.completed, color: "bg-emerald-500" },
              { label: "Cancelled", value: stats.bookings.cancelled, color: "bg-red-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-sm text-[#a0aec0] flex-1">{item.label}</span>
                <span className="text-sm text-white font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#171b27] border border-white/5 rounded-xl p-5">
          <p className="text-[10px] text-[#6b7280] tracking-widest uppercase mb-4">Listing Status</p>
          <div className="space-y-3">
            {[
              { label: "Active", value: stats.listings.active, color: "bg-emerald-500" },
              { label: "Pending", value: stats.listings.pending, color: "bg-amber-500" },
              { label: "Needs Approval", value: stats.listings.needsApproval, color: "bg-purple-500" },
              { label: "Inactive", value: stats.listings.inactive, color: "bg-slate-500" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-sm text-[#a0aec0] flex-1">{item.label}</span>
                <span className="text-sm text-white font-mono">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
