"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

interface Booking {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  hours: number;
  total_price: number;
  status: string;
  created_at: string;
  listings: { title: string; location: string; image: string | null } | null;
  guest: { full_name: string; email: string } | null;
  host: { full_name: string; email: string } | null;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  confirmed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [token, setToken] = useState("");

  const fetchBookings = async (status?: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/bookings?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setBookings(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await getSupabase().auth.getSession();
      if (session) setToken(session.access_token);
    };
    init();
  }, []);

  useEffect(() => {
    if (token) fetchBookings(statusFilter);
  }, [token, statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) fetchBookings(statusFilter);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-wide">Bookings</h1>
        <p className="text-[#6b7280] text-sm mt-1">View and manage all platform bookings</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["", "pending", "confirmed", "completed", "cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`text-[10px] px-3 py-1.5 rounded-lg font-bold tracking-wide transition-colors ${statusFilter === s ? "bg-purple-600 text-white" : "bg-[#171b27] border border-white/10 text-[#6b7280] hover:text-white"}`}
          >
            {s ? s.toUpperCase() : "ALL"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b.id} className="bg-[#171b27] border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4">
              {b.listings?.image && <img src={b.listings.image} alt="" className="w-full md:w-16 h-16 object-cover rounded-lg" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-white font-bold text-sm truncate">{b.listings?.title || "Unknown listing"}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[b.status] || ""}`}>
                    {b.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-[#6b7280] text-xs mt-1">
                  {b.guest?.full_name || b.guest?.email || "Unknown guest"} → {b.host?.full_name || b.host?.email || "Unknown host"}
                </p>
                <p className="text-[#6b7280] text-xs">
                  {b.booking_date} · {b.start_time}–{b.end_time} · {b.hours}h · ${b.total_price}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                {b.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(b.id, "confirmed")} className="text-[10px] px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wide transition-colors">CONFIRM</button>
                    <button onClick={() => updateStatus(b.id, "cancelled")} className="text-[10px] px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide transition-colors">CANCEL</button>
                  </>
                )}
                {b.status === "confirmed" && (
                  <>
                    <button onClick={() => updateStatus(b.id, "completed")} className="text-[10px] px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide transition-colors">COMPLETE</button>
                    <button onClick={() => updateStatus(b.id, "cancelled")} className="text-[10px] px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide transition-colors">CANCEL</button>
                  </>
                )}
              </div>
            </div>
          ))}
          {bookings.length === 0 && <p className="text-center text-[#6b7280] py-12 text-sm">No bookings found.</p>}
        </div>
      )}
    </div>
  );
}
