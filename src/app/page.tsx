"use client";

import Image from "next/image";
import Link from "next/link";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { useAuth } from "@/lib/auth-context";
import consoleImg from "../media/console.png";

export default function HomePage() {
  const { user, isLoggedIn } = useAuth();
  const role = user?.user_metadata?.role || user?.app_metadata?.role;
  return (
    <HomeLayout>

      {/* ── HERO SECTION ─────────────────────────────────────────────
          Full-screen, centered. Background blobs + carbon texture.
          Left: badge, headline, CTAs, stats.
          Right: glowing PS5 console with decorative rings.
      ──────────────────────────────────────────────────────────────── */}
      <main className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

        {/* Background ambient blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5203d5]/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00daf3]/10 blur-[150px] rounded-full" />
          {/* Carbon fibre texture overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/carbon-fibre.png')" }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT CONTENT ── */}
          <div className="flex flex-col gap-8">

            {/* Live system badge */}
            <div className="inline-flex items-center gap-2 bg-[#5203d5]/30 border border-[#cdbdff]/20 px-4 py-1 rounded-full w-fit">
              <span className="flex h-2 w-2 rounded-full bg-[#00daf3] animate-pulse" />
              <span className="text-xs font-headline uppercase tracking-[0.2em] text-[#00daf3]">
                Live System Online
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-8xl font-black font-headline uppercase leading-none tracking-tighter">
                Find.<br />
                {/* Gradient "Book." matching from-primary to-tertiary */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b0c6ff] to-[#00daf3]">
                  Book.
                </span><br />
                Play.
              </h1>
              <p className="text-lg md:text-xl text-[#c2c6d7] max-w-md font-body leading-relaxed">
                Your nearest PlayStation experience is just one click away. Access high-end setups in your local neighborhood.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/marketplace" className="px-8 py-4 bg-gradient-to-br from-[#b0c6ff] to-[#5203d5] text-[#002661] font-headline font-bold uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(176,198,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-300">
                {isLoggedIn && role === "host" ? "EXPLORE" : "Find a PlayStation"}
              </Link>
              <Link href={isLoggedIn && role === "host" ? "/dashboard" : "/signup"} className="px-8 py-4 border border-[#424655]/30 text-[#dfe2f2] font-headline font-bold uppercase tracking-wider rounded-xl hover:bg-white/5 hover:border-[#b0c6ff] transition-all duration-300 active:scale-95">
                {isLoggedIn && role === "host" ? "GO TO DASHBOARD" : "BECOME A HOST"}
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-8 pt-8 border-t border-white/5">
              <div>
                <div className="text-2xl font-headline font-bold text-[#00daf3]">1.2k+</div>
                <div className="text-xs font-body uppercase tracking-widest text-[#c2c6d7]">Active Hosts</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <div className="text-2xl font-headline font-bold text-[#b0c6ff]">15k+</div>
                <div className="text-xs font-body uppercase tracking-widest text-[#c2c6d7]">Gaming Hours</div>
              </div>
            </div>
          </div>

          {/* ── RIGHT VISUAL — PS5 with glow rings ── */}
          <div className="relative flex items-center justify-center py-20">
            {/* Radial purple glow behind console */}
            <div className="absolute w-[120%] h-[120%] hero-glow -z-10" />

            <div className="relative w-full aspect-square flex items-center justify-center">
              {/* Console image — slightly rotated, hover effect */}
              <div className="relative z-10 scale-110 -rotate-[5deg] group">
                <Image
                  src={consoleImg}
                  alt="PS5 Console"
                  width={480}
                  height={480}
                  className="rounded-2xl transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1 object-contain"
                  priority
                />
                {/* Decorative pulsing border ring */}
                <div className="absolute -inset-4 border border-[#00daf3]/20 rounded-3xl -z-10 animate-pulse" />
                {/* Outer faint ring */}
                <div className="absolute -inset-10 border border-[#b0c6ff]/10 rounded-full -z-10" />
              </div>

              {/* Floating "Instant Access" glass card — bottom left */}
              <div className="absolute bottom-20 left-0 glass-panel border border-white/10 p-4 rounded-xl shadow-2xl hidden md:block">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#00daf3]/20 rounded-lg">
                    {/* Lightning bolt icon */}
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#00daf3]">
                      <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-tighter">Instant Access</div>
                    <div className="text-[10px] text-slate-400">Zero Latency Connections</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ── PREMIUM HUBS BENTO GRID ──────────────────────────────────
          Section with large feature card (8 cols) + vertical card (4 cols).
          Matches the HTML bento grid layout exactly.
      ──────────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#171b27]/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-4xl font-headline font-bold uppercase tracking-tight text-[#dfe2f2]">
                Premium Hubs
              </h2>
              <p className="text-[#c2c6d7] max-w-md">
                Curated elite gaming environments for the ultimate competitive experience.
              </p>
            </div>
            <Link
              href="/marketplace"
              className="group flex items-center gap-2 text-[#00daf3] font-headline uppercase text-sm font-bold tracking-widest hover:opacity-80 transition-opacity"
            >
              View All Destinations
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* Large feature card — 8 cols */}
            <div className="md:col-span-8 group relative aspect-video md:aspect-auto h-[400px] overflow-hidden rounded-2xl border border-white/5 hover:border-[#00daf3]/50 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80"
                alt="Cyberpunk Gaming Lounge"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f131e] via-transparent to-transparent opacity-80" />

              {/* Bottom content */}
              <div className="absolute bottom-0 p-8 w-full">
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <span className="px-3 py-1 bg-[#00daf3] text-[#00363d] text-[10px] font-black uppercase rounded-sm">
                      Verified Venue
                    </span>
                    <h3 className="text-3xl font-headline font-bold uppercase text-white">
                      The Nexus Lounge
                    </h3>
                    <div className="flex items-center gap-4 text-slate-300 text-sm">
                      <span className="flex items-center gap-1">
                        📍 Shoreditch, London
                      </span>
                      <span className="flex items-center gap-1">
                        🎮 4x PS5 Pro
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-headline font-bold text-[#00daf3]">
                      £25<span className="text-xs text-slate-400">/hr</span>
                    </div>
                    <button className="mt-2 px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-widest transition-all text-white">
                      Quick Book
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Vertical small card — 4 cols */}
            <div className="md:col-span-4 group relative h-[400px] overflow-hidden rounded-2xl border border-white/5 hover:border-[#b0c6ff]/50 transition-all duration-500">
              <Image
                src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80"
                alt="Cozy Gaming Corner"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f131e] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-0 p-6">
                <div className="space-y-1">
                  {/* 5 filled stars */}
                  <div className="flex text-[#00daf3] gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <h3 className="text-xl font-headline font-bold uppercase text-white">
                    Zen Attic Studio
                  </h3>
                  <p className="text-xs text-slate-400 uppercase tracking-wider">
                    Perfect for Solo Play
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </HomeLayout>
  );
}
