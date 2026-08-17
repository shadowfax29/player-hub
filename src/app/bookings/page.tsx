"use client";

import Link from "next/link";
import { Calendar, MapPin, Clock, Gamepad2 } from "lucide-react";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Button } from "@/components/ui/Button";

const mockBookings = [
  {
    id: "1",
    title: "NEXUS ALPHA: PRO LEAGUE SUITE",
    location: "Shoreditch, London",
    date: "May 24, 2024",
    time: "18:00 - 21:00",
    status: "confirmed",
    price: "$147.50",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
  },
  {
    id: "2",
    title: "CYBER LOUNGE VIP ROOM",
    location: "Shibuya, Tokyo",
    date: "Jun 2, 2024",
    time: "14:00 - 17:00",
    status: "pending",
    price: "$120.00",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
  },
];

export default function BookingsPage() {
  return (
    <AuthGuard>
    <HomeLayout>
      <div className="px-8 py-8 pt-24 max-w-5xl mx-auto">
        <h1 className="font-heading text-4xl font-extrabold text-white tracking-wide mb-2">
          MY BOOKINGS
        </h1>
        <p className="text-[#a0aec0] text-sm mb-8">
          View and manage your upcoming gaming sessions.
        </p>

        {mockBookings.length === 0 ? (
          <div className="text-center py-20">
            <Gamepad2 size={48} className="text-[#2a2d45] mx-auto mb-4" />
            <p className="text-[#6b7280] text-lg mb-4">No bookings yet</p>
            <Link href="/marketplace">
              <Button variant="cyan" size="md" className="tracking-widest">
                EXPLORE SETUPS
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#161929] border border-[#1e2235] rounded-xl overflow-hidden hover:border-purple-500/30 transition-colors"
              >
                <div className="flex gap-0">
                  <div className="relative w-40 h-32 shrink-0">
                    <img
                      src={booking.image}
                      alt={booking.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-heading text-sm font-bold text-white tracking-wide">
                          {booking.title}
                        </h3>
                        <span
                          className={`text-[9px] font-bold tracking-widest px-2 py-0.5 rounded ${
                            booking.status === "confirmed"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {booking.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[#6b7280] text-xs mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {booking.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {booking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} /> {booking.time}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="font-heading text-xl font-bold text-cyan-400">{booking.price}</p>
                      <Button variant="outline" size="sm" className="mt-2 text-[10px] tracking-widest">
                        VIEW DETAILS
                      </Button>
                    </div>
                  </div>
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
