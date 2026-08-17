"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { getSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn(email, password);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      const { data: { user } } = await getSupabase().auth.getUser();
      const role = user?.user_metadata?.role;
      router.push(role === "host" ? "/dashboard" : "/marketplace");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f131e] flex items-center justify-center px-4">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5203d5]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00daf3]/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="block text-center mb-8">
          <span className="text-3xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-[#b0c6ff] to-[#5203d5] font-headline">
            PlayHub
          </span>
        </Link>

        <div className="bg-[#161929] border border-[#1e2235] rounded-2xl p-8">
          <h1 className="font-heading text-2xl font-extrabold text-white tracking-wide mb-1">
            WELCOME BACK
          </h1>
          <p className="text-[#6b7280] text-sm mb-6">
            Log in to access your gaming sessions
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">EMAIL</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">PASSWORD</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
              />
            </div>

            <Button
              type="submit"
              variant="cyan"
              size="lg"
              disabled={loading}
              className="w-full tracking-widest mt-2"
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
            </Button>
          </form>

          <p className="text-center text-sm text-[#6b7280] mt-6">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
