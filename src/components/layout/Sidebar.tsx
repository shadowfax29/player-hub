"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, Gamepad2, Settings, HelpCircle, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navItems = [
  { label: "HOME", href: "/", icon: Home },
  { label: "MARKETPLACE", href: "/marketplace", icon: ShoppingBag },
  { label: "MY GAMES", href: "/my-games", icon: Gamepad2 },
  { label: "SETTINGS", href: "/settings", icon: Settings },
  { label: "SUPPORT", href: "/support", icon: HelpCircle },
];

// Left sidebar — persistent across all dashboard pages
// Shows system console branding, nav links, and tournament CTA
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-44 bg-[#111320] border-r border-[#1e2235] flex flex-col z-40">
      {/* System Console branding block */}
      <div className="px-5 pt-6 pb-5 border-b border-[#1e2235]">
        <div className="flex items-center gap-2 mb-1">
          <Monitor size={14} className="text-purple-400" />
          <span className="font-heading text-xs font-bold text-white tracking-widest">SYSTEM CONSOLE</span>
        </div>
        <span className="text-[10px] text-emerald-400 tracking-widest font-medium">V2.04 ONLINE</span>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 px-3 pt-4 space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded text-xs font-semibold tracking-wider transition-colors",
                isActive
                  ? "bg-purple-600/20 text-white border-l-2 border-purple-500"
                  : "text-[#6b7280] hover:text-white hover:bg-[#1a1d2e]"
              )}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Tournament CTA at the bottom of sidebar */}
      <div className="px-3 pb-6">
        <Button variant="outline" size="sm" className="w-full border-purple-500/50 text-purple-300 hover:bg-purple-600/20 text-[10px] tracking-widest">
          JOIN TOURNAMENT
        </Button>
      </div>
    </aside>
  );
}
