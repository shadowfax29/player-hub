"use client";

import Image from "next/image";
import { Plus, TrendingUp, Radio } from "lucide-react";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { Button } from "@/components/ui/Button";
import { ListingStepper } from "@/components/dashboard/ListingStepper";
import { activeArrays } from "@/lib/data";

// Host Control Nexus — earnings stats, forge listing form, and active arrays panel
export default function DashboardPage() {
  return (
    <HomeLayout>
      <div className="flex gap-0 min-h-[calc(100vh-56px)] pt-20">
        {/* Main content area */}
        <div className="flex-1 px-8 py-8">
          {/* Page header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="font-heading text-4xl font-extrabold text-white tracking-wide">
                HOST CONTROL <span className="text-cyan-400">NEXUS</span>
              </h1>
              <p className="text-[#a0aec0] text-sm mt-1">
                Managing 4 active setups across 2 locations.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="md" className="tracking-widest text-xs">
                DOWNLOAD REPORT
              </Button>
            </div>
          </div>

          {/* Stats cards row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {/* Net Earnings */}
            <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-[#6b7280] tracking-widest font-semibold">NET EARNINGS</p>
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <TrendingUp size={12} /> +12.4%
                </span>
              </div>
              <p className="font-heading text-3xl font-bold text-white mb-3">
                $12,482 <span className="text-sm text-[#6b7280] font-normal">USD</span>
              </p>
              {/* Mini bar chart */}
              <div className="flex items-end gap-1 h-10">
                {[30, 45, 35, 60, 50, 75, 65, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-[#2a2d45] rounded-sm"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>

            {/* Active Bookings */}
            <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-[#6b7280] tracking-widest font-semibold">ACTIVE BOOKINGS</p>
                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-bold tracking-widest px-2 py-0.5 rounded">
                  LIVE
                </span>
              </div>
              <p className="font-heading text-3xl font-bold text-white mb-3">
                142 <span className="text-sm text-[#6b7280] font-normal">Sessions</span>
              </p>
              {/* Avatar stack */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["bg-purple-600", "bg-cyan-600", "bg-pink-600"].map((color, i) => (
                    <div key={i} className={`w-7 h-7 rounded-full ${color} border-2 border-[#161929] flex items-center justify-center text-[9px] font-bold text-white`}>
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                  <div className="w-7 h-7 rounded-full bg-[#2a2d45] border-2 border-[#161929] flex items-center justify-center text-[9px] font-bold text-[#a0aec0]">
                    +8
                  </div>
                </div>
                <span className="text-[#6b7280] text-xs">Updated 2m ago</span>
              </div>
            </div>

            {/* Host Rating */}
            <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-[#6b7280] tracking-widest font-semibold">HOST RATING</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
              </div>
              <p className="font-heading text-3xl font-bold text-white mb-2">
                4.92 <span className="text-sm text-[#6b7280] font-normal">/ 5.0</span>
              </p>
              <p className="text-[#a0aec0] text-xs italic">
                &quot;Exceptional setup, the PS5 Pro experience was flawless!&quot;
              </p>
            </div>
          </div>

          {/* Listing Stepper Form */}
          <ListingStepper />
        </div>

        {/* Right panel — Active Arrays */}
        <div className="w-72 shrink-0 bg-[#111320] border-l border-[#1e2235] px-5 py-8">
          <div className="flex items-center gap-2 mb-6">
            <Radio size={14} className="text-cyan-400" />
            <h2 className="font-heading text-sm font-bold text-white tracking-widest">ACTIVE ARRAYS</h2>
          </div>

          <div className="space-y-3">
            {activeArrays.map((array) => (
              <div key={array.id} className="bg-[#161929] border border-[#1e2235] rounded-xl overflow-hidden hover:border-purple-500/30 transition-colors">
                <div className="flex gap-3 p-3">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-14 rounded-lg overflow-hidden shrink-0">
                    <Image src={array.image} alt={array.name} fill className="object-cover" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="font-heading text-xs font-bold text-white truncate">{array.name}</p>
                      {/* Status dot */}
                      <div className={`w-2 h-2 rounded-full shrink-0 ${
                        array.status === "online" ? "bg-emerald-400" :
                        array.status === "maintenance" ? "bg-[#6b7280]" : "bg-red-400"
                      }`} />
                    </div>
                    <p className="text-[10px] text-[#6b7280] mb-2 leading-tight">{array.hardware}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 text-xs font-bold">
                        ${array.pricePerHour}<span className="text-[#6b7280] font-normal">/hr</span>
                      </span>
                      {array.occupancy && (
                        <span className="text-[10px] text-[#a0aec0]">{array.occupancy}% Occupancy</span>
                      )}
                      {array.status === "maintenance" && (
                        <span className="text-[10px] text-[#6b7280]">Maintenance</span>
                      )}
                      {array.bookings && (
                        <span className="text-[10px] text-[#a0aec0]">{array.bookings} Bookings</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full text-center text-xs text-[#6b7280] hover:text-cyan-400 transition-colors mt-4 tracking-widest">
            VIEW ALL TERMINALS
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="ml-0 border-t border-[#1e2235] py-4 px-8 text-center">
        <div className="flex items-center justify-center gap-6 mb-2">
          <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            GLOBAL SERVER: ONLINE
          </span>
          <span className="text-[10px] text-[#6b7280]">LATENCY: 14MS</span>
        </div>
        <div className="flex items-center justify-center gap-4 text-[10px] text-[#6b7280]">
          <a href="#" className="hover:text-white transition-colors">PRIVACY PROTOCOL</a>
          <a href="#" className="hover:text-white transition-colors">SYSTEM LOGS</a>
          <span>© 2024 PLAYHUB INTERFACE</span>
        </div>
      </footer>
    </HomeLayout>
  );
}
