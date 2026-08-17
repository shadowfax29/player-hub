"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ShoppingCart, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "STORE", href: "/store" },
  { label: "LIBRARY", href: "/library" },
  { label: "DASHBOARD", href: "/" },
  { label: "TROPHIES", href: "/trophies" },
];

interface TopnavProps {
  showSearch?: boolean;
}

// Top navigation bar — PlayConsole logo, nav links, search, and user icons
export function Topnav({ showSearch = false }: TopnavProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-[#0d0f1a]/95 backdrop-blur border-b border-[#1e2235] flex items-center px-6 z-30">
      {/* Brand logo */}
      <Link href="/" className="font-heading text-xl font-bold text-white mr-8 tracking-wide">
        Play<span className="text-cyan-400">Hub</span>
      </Link>

      {/* Primary nav links */}
      <nav className="flex items-center gap-6 flex-1">
        {navLinks.map(({ label, href }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-xs font-semibold tracking-widest transition-colors pb-0.5",
                isActive
                  ? "text-cyan-400 border-b-2 border-cyan-400"
                  : "text-[#6b7280] hover:text-white"
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Optional search bar (shown on host dashboard) */}
      {showSearch && (
        <div className="flex items-center gap-2 bg-[#1a1d2e] border border-[#1e2235] rounded px-3 py-1.5 mr-4 w-52">
          <Search size={13} className="text-[#6b7280]" />
          <input
            type="text"
            placeholder="Search setups..."
            className="bg-transparent text-xs text-white placeholder-[#6b7280] outline-none w-full"
          />
        </div>
      )}

      {/* Right-side icon cluster */}
      <div className="flex items-center gap-3 ml-auto">
        <button className="text-[#6b7280] hover:text-white transition-colors relative">
          <Bell size={18} />
          {/* Notification dot */}
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-purple-500 rounded-full" />
        </button>
        <button className="text-[#6b7280] hover:text-white transition-colors">
          <ShoppingCart size={18} />
        </button>
        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
          U
        </div>
      </div>
    </header>
  );
}
