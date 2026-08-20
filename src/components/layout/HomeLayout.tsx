"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { Footer } from "./Footer";
import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

const baseLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/marketplace" },
  { label: "Become a Host", href: "/signup" },
];

const hostLinks = [
  { label: "Dashboard", href: "/dashboard" },
];

const guestLinks = [
  { label: "Explore", href: "/marketplace" },
];

const authLinks = [
  { label: "My Bookings", href: "/bookings" },
];

// Home page layout — full-width, no sidebar.
// Matches the HTML design: frosted glass nav, gradient logo, search pill.
export function HomeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, loading, user, signOut } = useAuth();
  const role = user?.user_metadata?.role;
  const [profileRole, setProfileRole] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getSupabase().from("profiles").select("role").eq("id", user.id).single().then(({ data }) => {
      setProfileRole(data?.role || null);
    });
  }, [user]);

  const isAdmin = profileRole === "admin" || role === "admin";
  const navLinks = role === "host" ? hostLinks : isLoggedIn ? guestLinks : baseLinks;
  const topLinks = [...navLinks, ...(isLoggedIn ? authLinks : [])];

  return (
    <div className="min-h-screen bg-[#0f131e]">
      {/* ── Top Nav ── frosted glass, purple shadow, matches HTML exactly */}
      <nav className="fixed top-0 w-full z-50 bg-[#0f131e]/60 backdrop-blur-xl border-b border-white/10 shadow-[0_0_40px_rgba(79,0,208,0.1)]">
        <div className="flex items-center justify-between px-8 py-4 w-full max-w-screen-2xl mx-auto">
          {/* Left: logo + nav links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#b0c6ff] to-[#5203d5] font-headline">
              PlayConsole
            </Link>
            <div className="hidden md:flex gap-6 font-headline uppercase tracking-wider text-sm">
              {!loading && topLinks.map(({ label, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "transition-colors pb-1",
                      isActive
                        ? "text-[#00daf3] border-b-2 border-[#00daf3]"
                        : "text-slate-400 hover:text-white"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: auth controls */}
          <div className="flex items-center gap-4">
            {!loading && (
              isLoggedIn ? (
                <div className="flex items-center gap-3">
                  {isAdmin && (
                    <Link href="/admin" className="text-[10px] text-purple-400 hover:text-purple-300 tracking-widest transition-colors font-headline uppercase font-bold">
                      Admin
                    </Link>
                  )}
                  <Link href="/profile" className="text-[10px] text-[#6b7280] hover:text-white tracking-widest transition-colors font-headline uppercase">
                    Profile
                  </Link>
                  <Link href="/profile" className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white hover:ring-2 hover:ring-cyan-400/50 transition-all">
                    {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || "U"}
                  </Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-1.5 bg-gradient-to-br from-[#b0c6ff] to-[#5203d5] text-[#002661] text-xs font-headline font-bold uppercase tracking-wider rounded-full hover:scale-105 active:scale-95 transition-all"
                >
                  Login
                </Link>
              )
            )}
          </div>
        </div>
      </nav>

      {children}

      {/* Footer */}
      <Footer />

      {/* ── Mobile bottom nav ── */}
      <div className="fixed bottom-0 w-full md:hidden bg-[#171b27]/95 backdrop-blur-xl border-t border-white/10 z-50 safe-bottom">
        <div className="flex justify-around items-center px-2 py-2">
          {!loading && !isLoggedIn && (
            <Link href="/" className="flex flex-col items-center gap-0.5 text-[#00daf3] min-w-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
              <span className="text-[9px] font-headline uppercase font-bold">Home</span>
            </Link>
          )}
          <Link href="/marketplace" className="flex flex-col items-center gap-0.5 text-slate-400 min-w-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <span className="text-[9px] font-headline uppercase">Explore</span>
          </Link>
          {!loading && !isLoggedIn && (
            <Link href="/signup" className="flex flex-col items-center gap-0.5 text-slate-400 min-w-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M14 4h4a2 2 0 0 1 2 2v4"/></svg>
              <span className="text-[9px] font-headline uppercase">Host</span>
            </Link>
          )}
          {!loading && isLoggedIn && role === "host" && (
            <Link href="/dashboard" className="flex flex-col items-center gap-0.5 text-slate-400 min-w-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              <span className="text-[9px] font-headline uppercase">Dashboard</span>
            </Link>
          )}
          {!loading && isLoggedIn && (
            <Link href="/bookings" className="flex flex-col items-center gap-0.5 text-slate-400 min-w-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <span className="text-[9px] font-headline uppercase">Bookings</span>
            </Link>
          )}
          {!loading && isLoggedIn && isAdmin && (
            <Link href="/admin" className="flex flex-col items-center gap-0.5 text-purple-400 min-w-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg>
              <span className="text-[9px] font-headline uppercase font-bold">Admin</span>
            </Link>
          )}
          {!loading && isLoggedIn ? (
            <Link href="/profile" className="flex flex-col items-center gap-0.5 text-slate-400 min-w-0">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-[8px] font-bold text-white">
                {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <span className="text-[9px] font-headline uppercase">Profile</span>
            </Link>
          ) : !loading && !isLoggedIn ? (
            <Link href="/login" className="flex flex-col items-center gap-0.5 text-cyan-400 min-w-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
              <span className="text-[9px] font-headline uppercase font-bold">Login</span>
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
