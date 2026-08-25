"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const ADMIN_EMAIL = "admin@playconsole.com";
const ADMIN_PASSWORD = "Admin@123";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const { notify } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = await signIn(email, password);
    setLoading(false);

    if (result.error) {
      notify(result.error);
    } else {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        notify("Could not verify account. Please try again.");
        return;
      }

      // Check if this is the default admin email — auto-setup admin role
      if (user.email === ADMIN_EMAIL) {
        await supabase.from("profiles").upsert({
          id: user.id,
          email: user.email,
          full_name: user.user_metadata?.full_name || "Admin",
          role: "admin",
          verified: true,
        }, { onConflict: "id" });
        router.push("/admin");
        return;
      }

      // Check if profile exists and is verified
      const { data: profile } = await supabase
        .from("profiles")
        .select("verified")
        .eq("id", user.id)
        .single();

      if (profile && !profile.verified) {
        await supabase.auth.signOut();
        notify("Your account is pending verification. Please wait for your identity to be verified before logging in.", "info");
        return;
      }

      const role = user.user_metadata?.role;
      router.push(role === "host" ? "/dashboard" : "/marketplace");
    }
  };

  const handleAdminLogin = async () => {
    setLoading(true);

    // First try to sign up the admin if they don't exist
    const supabase = getSupabase();
    const { error: signUpError } = await supabase.auth.signUp({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      options: { data: { full_name: "Admin", role: "admin" } },
    });

    // Ignore "already registered" errors — we'll just sign in
    if (signUpError && !signUpError.message.includes("already")) {
      // If signup fails for other reasons, try sign in anyway
    }

    const result = await signIn(ADMIN_EMAIL, ADMIN_PASSWORD);
    setLoading(false);

    if (result.error) {
      notify(result.error);
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("profiles").upsert({
        id: user.id,
        email: ADMIN_EMAIL,
        full_name: "Admin",
        role: "admin",
        verified: true,
      }, { onConflict: "id" });
    }

    router.push("/admin");
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
            PlayConsole
          </span>
        </Link>

        <div className="bg-[#161929] border border-[#1e2235] rounded-2xl p-8">
          <h1 className="font-heading text-2xl font-extrabold text-white tracking-wide mb-1">
            WELCOME BACK
          </h1>
          <p className="text-[#6b7280] text-sm mb-6">
            Log in to access your gaming sessions
          </p>

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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 pr-10 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
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

          {/* Admin Quick Login */}
          {/* <div className="mt-6 pt-6 border-t border-[#1e2235]">
            <button
              onClick={handleAdminLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-purple-600/10 border border-purple-500/20 text-purple-400 hover:bg-purple-600/20 hover:text-purple-300 transition-colors text-sm font-bold tracking-wide disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {loading ? "SETTING UP ADMIN..." : "ADMIN LOGIN"}
            </button>
            <p className="text-[10px] text-[#4a4d65] text-center mt-2">Default: admin@playconsole.com</p>
          </div> */}

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
