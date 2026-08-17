"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, Gamepad2 } from "lucide-react";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";
import { getSupabase } from "@/lib/supabase";

interface Booking {
  id: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  hours: number;
  total_price: number;
  status: string;
  listings: { title: string; image: string; location: string } | null;
}

const statusColors: Record<string, string> = {
  confirmed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  completed: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function BookingsPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    getSupabase().auth.getSession().then(({ data: { session } }) => {
      const token = session?.access_token;
      if (!token) return;

      fetch("/api/bookings?role=guest", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setBookings(data.bookings || []))
        .catch(() => setBookings([]))
        .finally(() => setLoading(false));
    });
  }, [user]);

  return (
    <AuthGuard>
      <HomeLayout>
        <div className="px-4 md:px-8 py-8 pt-24 pb-24 md:pb-8 max-w-5xl mx-auto">
          <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-wide mb-2">
            MY BOOKINGS
          </h1>
          <p className="text-[#a0aec0] text-sm mb-8">
            Track and manage your upcoming gaming sessions
          </p>

          {loading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="bg-[#161929] border border-[#1e2235] rounded-xl h-36 animate-pulse" />
              ))}
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-[#161929] border border-[#1e2235] flex items-center justify-center mx-auto mb-6">
                <Gamepad2 size={32} className="text-[#6b7280]" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-white mb-2">NO BOOKINGS YET</h2>
              <p className="text-[#a0aec0] text-sm mb-6 max-w-md mx-auto">
                You haven&apos;t booked any gaming sessions yet. Explore our marketplace to find the perfect setup.
              </p>
              <Link href="/marketplace">
                <Button variant="primary" size="lg" className="tracking-widest">
                  EXPLORE SETUPS
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-[#161929] border border-[#1e2235] rounded-xl p-4 md:p-5 flex flex-col sm:flex-row gap-4 sm:gap-5"
                >
                  <div className="w-full sm:w-28 h-40 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-[#1a1d2e]">
                    {booking.listings?.image ? (
                      <img src={booking.listings.image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Gamepad2 size={24} className="text-[#6b7280]" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-heading text-lg font-bold text-white tracking-wide truncate">
                        {booking.listings?.title || "Unknown Listing"}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest border ${
                          statusColors[booking.status] || "bg-slate-500/20 text-slate-400 border-slate-500/30"
                        }`}
                      >
                        {booking.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-[#6b7280]">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-cyan-400" />
                        {booking.listings?.location || "—"}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-cyan-400" />
                        {new Date(booking.booking_date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-cyan-400" />
                        {booking.start_time} — {booking.end_time}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 sm:self-center">
                    <p className="text-lg font-heading font-bold text-white">${booking.total_price}</p>
                    <p className="text-[10px] text-[#6b7280] tracking-widest">{booking.hours}H SESSION</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </HomeLayout>
    </AuthGuard>
  );
}
