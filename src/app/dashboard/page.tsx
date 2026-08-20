"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Radio, Calendar, Clock, MapPin, Gamepad2 } from "lucide-react";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ListingStepper } from "@/components/dashboard/ListingStepper";
import { useAuth } from "@/lib/auth-context";
import { getSupabase } from "@/lib/supabase";
import { SessionControls } from "@/components/session/SessionControls";
import type { Listing } from "@/lib/types";

interface HostBooking {
  id: string;
  status: string;
  total_price: number;
  hours: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  session_started_at: string | null;
  session_ends_at: string | null;
  session_active: boolean;
  host_confirmed_end: boolean;
  guest_confirmed_end: boolean;
  host_wants_continue: boolean;
  guest_wants_continue: boolean;
  continue_notes: string | null;
  host_id: string;
  guest_id: string;
  listings: { title: string; image: string; location: string } | null;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  active: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
  awaiting_confirmation: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  awaiting_continue: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  completed: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusLabels: Record<string, string> = {
  active: "LIVE",
  awaiting_confirmation: "CONFIRMING",
  awaiting_continue: "CONTINUE?",
};

export default function DashboardPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [bookings, setBookings] = useState<HostBooking[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    if (!user) return;
    const { data: { session } } = await getSupabase().auth.getSession();
    const token = session?.access_token;
    if (!token) return;
    try {
      const res = await fetch("/api/bookings?role=host", { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch {
      setBookings([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    Promise.all([
      getSupabase().auth.getSession(),
      fetch(`/api/listings?host_id=${user.id}`).then((r) => r.json()),
    ]).then(([sessionRes, listingsRes]) => {
      const token = sessionRes.data.session?.access_token;
      setListings(listingsRes.listings || []);
      if (token) fetchBookings();
    }).finally(() => setLoading(false));
  }, [user, fetchBookings]);

  const handleBookingUpdate = (updated: Partial<HostBooking> & { id: string }) => {
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? { ...b, ...updated } : b)));
  };

  const totalEarnings = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.total_price, 0);

  const activeListings = listings.filter((l) => l.status === "active").length;
  const pendingListings = listings.filter((l) => l.status === "pending").length;

  return (
    <AuthGuard>
      <HomeLayout>
        <div className="flex flex-col lg:flex-row gap-0 min-h-[calc(100vh-56px)] pt-20">
          {/* Main content */}
          <div className="flex-1 px-4 md:px-8 py-8 pb-24 md:pb-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-wide">
                  HOST CONTROL <span className="text-cyan-400">NEXUS</span>
                </h1>
                <p className="text-[#a0aec0] text-sm mt-1">
                  {loading
                    ? "Loading..."
                    : `Managing ${activeListings} active setup${activeListings !== 1 ? "s" : ""}${pendingListings > 0 ? ` • ${pendingListings} pending review` : ""}`}
                </p>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
                <p className="text-[10px] text-[#6b7280] tracking-widest font-semibold mb-3">NET EARNINGS</p>
                <p className="font-heading text-3xl font-bold text-white">
                  ${totalEarnings.toLocaleString()} <span className="text-sm text-[#6b7280] font-normal">USD</span>
                </p>
              </div>
              <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
                <p className="text-[10px] text-[#6b7280] tracking-widest font-semibold mb-3">TOTAL LISTINGS</p>
                <p className="font-heading text-3xl font-bold text-white">
                  {listings.length} <span className="text-sm text-[#6b7280] font-normal">Setups</span>
                </p>
              </div>
              <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
                <p className="text-[10px] text-[#6b7280] tracking-widest font-semibold mb-3">TOTAL BOOKINGS</p>
                <p className="font-heading text-3xl font-bold text-white">
                  {bookings.length} <span className="text-sm text-[#6b7280] font-normal">Sessions</span>
                </p>
              </div>
            </div>

            {/* Active Bookings with Session Controls */}
            {bookings.filter((b) => !["completed", "cancelled"].includes(b.status)).length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading text-lg font-bold text-white mb-4 tracking-wide border-l-4 border-cyan-500 pl-3">
                  ACTIVE BOOKINGS
                </h2>
                <div className="space-y-4">
                  {bookings
                    .filter((b) => !["completed", "cancelled"].includes(b.status))
                    .map((booking) => (
                      <div key={booking.id} className="bg-[#161929] border border-[#1e2235] rounded-xl overflow-hidden">
                        <div className="p-4 flex flex-col sm:flex-row gap-4">
                          <div className="w-full sm:w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-[#1a1d2e]">
                            {booking.listings?.image ? (
                              <img src={booking.listings.image} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Gamepad2 size={20} className="text-[#6b7280]" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-heading text-sm font-bold text-white truncate">
                                {booking.listings?.title || "Unknown"}
                              </h3>
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest border ${
                                statusColors[booking.status] || ""
                              }`}>
                                {statusLabels[booking.status] || booking.status.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3 text-[10px] text-[#6b7280]">
                              <span className="flex items-center gap-1"><MapPin size={10} className="text-cyan-400" />{booking.listings?.location || "—"}</span>
                              <span className="flex items-center gap-1"><Calendar size={10} className="text-cyan-400" />{new Date(booking.booking_date).toLocaleDateString()}</span>
                              <span className="flex items-center gap-1"><Clock size={10} className="text-cyan-400" />{booking.start_time} — {booking.end_time}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0 sm:self-center">
                            <p className="text-sm font-heading font-bold text-white">${booking.total_price}</p>
                            <p className="text-[9px] text-[#6b7280] tracking-widest">{booking.hours}H</p>
                          </div>
                        </div>
                        {user && (
                          <div className="px-4 pb-4">
                            <SessionControls booking={booking} userId={user.id} onBookingUpdate={handleBookingUpdate} />
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Listing Stepper */}
            <ListingStepper />

            {/* Mobile-only listings panel */}
            <div className="lg:hidden mt-8">
              <div className="flex items-center gap-2 mb-4">
                <Radio size={14} className="text-cyan-400" />
                <h2 className="font-heading text-sm font-bold text-white tracking-widest">YOUR LISTINGS</h2>
              </div>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 bg-[#161929] rounded-xl animate-pulse" />
                  ))}
                </div>
              ) : listings.length === 0 ? (
                <p className="text-[#6b7280] text-xs text-center py-8">
                  No listings yet. Use the form to create your first setup.
                </p>
              ) : (
                <div className="space-y-3">
                  {listings.map((listing) => (
                    <div key={listing.id} className="bg-[#161929] border border-[#1e2235] rounded-xl overflow-hidden hover:border-purple-500/30 transition-colors">
                      <div className="flex gap-3 p-3">
                        <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-[#1a1d2e]">
                          {listing.image ? (
                            <Image src={listing.image} alt={listing.title} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-[#6b7280]">No img</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-0.5">
                            <p className="font-heading text-xs font-bold text-white truncate">{listing.title}</p>
                            <div className={`w-2 h-2 rounded-full shrink-0 ${
                              listing.status === "active" ? "bg-emerald-400" :
                              listing.status === "pending" ? "bg-amber-400" : "bg-[#6b7280]"
                            }`} />
                          </div>
                          <p className="text-[10px] text-[#6b7280] mb-1">{listing.location}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-cyan-400 text-xs font-bold">
                              ${listing.price_per_hour}<span className="text-[#6b7280] font-normal">/hr</span>
                            </span>
                            <span className={`text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded ${
                              listing.status === "active" ? "bg-emerald-500/20 text-emerald-400" :
                              listing.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                              "bg-slate-500/20 text-slate-400"
                            }`}>
                              {listing.status?.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right panel — Your Listings */}
          <div className="hidden lg:block w-72 shrink-0 bg-[#111320] border-l border-[#1e2235] px-5 py-8">
            <div className="flex items-center gap-2 mb-6">
              <Radio size={14} className="text-cyan-400" />
              <h2 className="font-heading text-sm font-bold text-white tracking-widest">YOUR LISTINGS</h2>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-20 bg-[#161929] rounded-xl animate-pulse" />
                ))}
              </div>
            ) : listings.length === 0 ? (
              <p className="text-[#6b7280] text-xs text-center py-8">
                No listings yet. Use the form to create your first setup.
              </p>
            ) : (
              <div className="space-y-3">
                {listings.map((listing) => (
                  <div key={listing.id} className="bg-[#161929] border border-[#1e2235] rounded-xl overflow-hidden hover:border-purple-500/30 transition-colors">
                    <div className="flex gap-3 p-3">
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0 bg-[#1a1d2e]">
                        {listing.image ? (
                          <Image src={listing.image} alt={listing.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-[#6b7280]">No img</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="font-heading text-xs font-bold text-white truncate">{listing.title}</p>
                          <div className={`w-2 h-2 rounded-full shrink-0 ${
                            listing.status === "active" ? "bg-emerald-400" :
                            listing.status === "pending" ? "bg-amber-400" : "bg-[#6b7280]"
                          }`} />
                        </div>
                        <p className="text-[10px] text-[#6b7280] mb-1">{listing.location}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-cyan-400 text-xs font-bold">
                            ${listing.price_per_hour}<span className="text-[#6b7280] font-normal">/hr</span>
                          </span>
                          <span className={`text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded ${
                            listing.status === "active" ? "bg-emerald-500/20 text-emerald-400" :
                            listing.status === "pending" ? "bg-amber-500/20 text-amber-400" :
                            "bg-slate-500/20 text-slate-400"
                          }`}>
                            {listing.status?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </HomeLayout>
    </AuthGuard>
  );
}
