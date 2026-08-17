"use client";

import { Mail, Shield, Calendar, Gamepad2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/auth-context";

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const fullName = user?.user_metadata?.full_name || "User";
  const email = user?.email || "user@example.com";
  const role = user?.user_metadata?.role || "guest";

  return (
    <HomeLayout>
      <div className="px-8 py-8 pt-24 max-w-3xl mx-auto">
        <h1 className="font-heading text-4xl font-extrabold text-white tracking-wide mb-8">
          PROFILE
        </h1>

        {/* Profile card */}
        <div className="bg-[#161929] border border-[#1e2235] rounded-2xl p-8 mb-6">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white shrink-0">
              {fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-white">{fullName}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[#6b7280] text-sm flex items-center gap-1">
                  <Mail size={12} /> {email}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <span className={`text-[10px] font-bold tracking-widest px-2 py-0.5 rounded ${
                  role === "host"
                    ? "bg-purple-500/20 text-purple-400"
                    : "bg-cyan-500/20 text-cyan-400"
                }`}>
                  {role === "host" ? "HOST" : "GAMER"}
                </span>
                <span className="text-[10px] text-[#6b7280] tracking-widest flex items-center gap-1">
                  <Shield size={10} className="text-emerald-400" /> VERIFIED
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#1a1d2e] border border-[#2a2d45] rounded-xl p-4 text-center">
              <Gamepad2 size={20} className="text-cyan-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">12</p>
              <p className="text-[10px] text-[#6b7280] tracking-widest">SESSIONS PLAYED</p>
            </div>
            <div className="bg-[#1a1d2e] border border-[#2a2d45] rounded-xl p-4 text-center">
              <Calendar size={20} className="text-purple-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">Mar 2024</p>
              <p className="text-[10px] text-[#6b7280] tracking-widest">MEMBER SINCE</p>
            </div>
          </div>

          <div className="border-t border-[#1e2235] pt-5">
            <Button
              variant="outline"
              size="md"
              className="tracking-widest text-xs gap-2 text-red-400 border-red-500/30 hover:bg-red-500/10"
              onClick={async () => {
                await signOut();
                router.push("/");
              }}
            >
              <LogOut size={14} /> SIGN OUT
            </Button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
