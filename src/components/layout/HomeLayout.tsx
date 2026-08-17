"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

const baseLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/marketplace" },
];

const hostLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/marketplace" },
  { label: "Dashboard", href: "/dashboard" },
];

const guestLinks = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/marketplace" },
  { label: "Become a Host", href: "/signup" },
];

const authLinks = [
  { label: "My Bookings", href: "/bookings" },
  { label: "Profile", href: "/profile" },
];

// Home page layout — full-width, no sidebar.
// Matches the HTML design: frosted glass nav, gradient logo, search pill.
export function HomeLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, loading, user, signOut } = useAuth();
  const role = user?.user_metadata?.role;
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
              PlayHub
            </Link>
            <div className="hidden md:flex gap-6 font-headline uppercase tracking-wider text-sm">
              {topLinks.map(({ label, href }) => {
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
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                    {user?.user_metadata?.full_name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <button
                    onClick={async () => {
                      await signOut();
                      router.push("/");
                    }}
                    className="text-[10px] text-[#6b7280] hover:text-white tracking-widest transition-colors"
                  >
                    SIGN OUT
                  </button>
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

      {/* ── Mobile bottom nav ── */}
      <div className="fixed bottom-0 w-full md:hidden bg-[#171b27]/90 backdrop-blur-xl border-t border-white/10 z-50 px-6 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex flex-col items-center gap-1 text-[#00daf3]">
            <span className="text-xs font-headline uppercase font-bold">Home</span>
          </Link>
          <Link href="/marketplace" className="flex flex-col items-center gap-1 text-slate-400">
            <span className="text-xs font-headline uppercase">Explore</span>
          </Link>
          <div className="bg-gradient-to-br from-[#b0c6ff] to-[#5203d5] p-3 rounded-full -mt-10 shadow-lg border-4 border-[#0f131e]">
            <span className="text-[#002661] font-bold text-lg">+</span>
          </div>
          {!loading && (
            isLoggedIn ? (
              <>
                <Link href="/bookings" className="flex flex-col items-center gap-1 text-slate-400">
                  <span className="text-xs font-headline uppercase">Bookings</span>
                </Link>
                <Link href="/profile" className="flex flex-col items-center gap-1 text-slate-400">
                  <span className="text-xs font-headline uppercase">Profile</span>
                </Link>
              </>
            ) : (
              <Link
                href="/login"
                className="flex flex-col items-center gap-1 text-cyan-400"
              >
                <span className="text-xs font-headline uppercase font-bold">Login</span>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}
