"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Radio } from "lucide-react";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { ListingStepper } from "@/components/dashboard/ListingStepper";
import { useAuth } from "@/lib/auth-context";
import { getSupabase } from "@/lib/supabase";
import type { Listing } from "@/lib/types";

interface HostBooking {
  id: string;
  status: string;
  total_price: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [bookings, setBookings] = useState<HostBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    Promise.all([
      getSupabase().auth.getSession(),
      fetch(`/api/listings?host_id=${user.id}`).then((r) => r.json()),
    ]).then(([sessionRes, listingsRes]) => {
      const token = sessionRes.data.session?.access_token;
      setListings(listingsRes.listings || []);

      if (token) {
        fetch("/api/bookings?role=host", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((r) => r.json())
          .then((data) => setBookings(data.bookings || []))
          .catch(() => {});
      }
    }).finally(() => setLoading(false));
  }, [user]);

  const totalEarnings = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + b.total_price, 0);

  const activeListings = listings.filter((l) => l.status === "active").length;
  const pendingListings = listings.filter((l) => l.status === "pending").length;

  return (
    <AuthGuard>
      <HomeLayout>
        <div className="flex gap-0 min-h-[calc(100vh-56px)] pt-20">
          {/* Main content */}
          <div className="flex-1 px-8 py-8">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h1 className="font-heading text-4xl font-extrabold text-white tracking-wide">
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
            <div className="grid grid-cols-3 gap-4 mb-8">
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

            {/* Listing Stepper */}
            <ListingStepper />
          </div>

          {/* Right panel — Your Listings */}
          <div className="w-72 shrink-0 bg-[#111320] border-l border-[#1e2235] px-5 py-8">
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
