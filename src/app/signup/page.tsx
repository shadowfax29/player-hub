"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Upload, Gamepad2, Home, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"guest" | "host">("guest");
  const [idType, setIdType] = useState("passport");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idFileName, setIdFileName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError("File must be under 5MB");
        return;
      }
      setIdFile(file);
      setIdFileName(file.name);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!idFile) {
      setError("Please upload a government ID document");
      return;
    }

    setLoading(true);
    const result = await signUp(email, password, fullName, {
      role,
      id_type: idType,
    });

    if (result.error) {
      setLoading(false);
      setError(result.error);
      return;
    }

    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      setError("Account created but could not verify user. Please log in.");
      return;
    }

    // Upload government ID to Supabase Storage
    let idDocUrl = "";
    try {
      const ext = idFile.name.split(".").pop() || "jpg";
      const filePath = `${user.id}/government-id.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("government-ids")
        .upload(filePath, idFile, { upsert: true });

      if (uploadError) {
        console.error("Upload error:", uploadError);
      } else {
        const { data: urlData } = supabase.storage
          .from("government-ids")
          .getPublicUrl(filePath);
        idDocUrl = urlData.publicUrl;
      }
    } catch (err) {
      console.error("File upload failed:", err);
    }

    // Insert profile with document URL
    await supabase.from("profiles").insert({
      id: user.id,
      full_name: fullName,
      email: email,
      role: role,
      id_type: idType,
      id_document_url: idDocUrl,
      verified: false,
    });

    setLoading(false);
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0f131e] flex items-center justify-center px-4 py-12">
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
            CREATE ACCOUNT
          </h1>
          <p className="text-[#6b7280] text-sm mb-6">
            Join the ultimate gaming marketplace
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
              <p className="text-red-400 text-xs">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">
                I WANT TO
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("guest")}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                    role === "guest"
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-[#2a2d45] bg-[#1a1d2e] hover:border-[#4a4d65]"
                  )}
                >
                  <Gamepad2 size={24} className={role === "guest" ? "text-cyan-400" : "text-[#6b7280]"} />
                  <div className="text-center">
                    <p className={cn("text-xs font-bold tracking-wider", role === "guest" ? "text-white" : "text-[#a0aec0]")}>
                      PLAY GAMES
                    </p>
                    <p className="text-[9px] text-[#6b7280] mt-0.5">Book gaming sessions</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("host")}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                    role === "host"
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-[#2a2d45] bg-[#1a1d2e] hover:border-[#4a4d65]"
                  )}
                >
                  <Home size={24} className={role === "host" ? "text-purple-400" : "text-[#6b7280]"} />
                  <div className="text-center">
                    <p className={cn("text-xs font-bold tracking-wider", role === "host" ? "text-white" : "text-[#a0aec0]")}>
                      HOST SETUP
                    </p>
                    <p className="text-[9px] text-[#6b7280] mt-0.5">List your gaming space</p>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">FULL NAME</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
              />
            </div>

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
                placeholder="Min 6 characters"
                required
                className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
              />
            </div>

            <div>
              <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">CONFIRM PASSWORD</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter password"
                required
                className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
              />
            </div>

            {/* Govt Document Section */}
            <div className="border-t border-[#1e2235] pt-4 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <Shield size={14} className="text-purple-400" />
                <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold">
                  GOVERNMENT ID VERIFICATION
                </label>
              </div>

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-3">
                <p className="text-[10px] text-[#a0aec0] leading-relaxed">
                  All users must verify their identity with one government-issued document.
                  Your document is encrypted and stored securely.
                </p>
              </div>

              <div className="mb-3">
                <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-1.5">DOCUMENT TYPE</label>
                <select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
                >
                  <option value="passport">Passport</option>
                  <option value="drivers_license">Driver&apos;s License</option>
                  <option value="national_id">National ID Card</option>
                  <option value="aadhaar">Aadhaar Card</option>
                </select>
              </div>

              <label className="flex flex-col items-center justify-center w-full h-24 bg-[#1a1d2e] border-2 border-dashed border-[#2a2d45] rounded-lg cursor-pointer hover:border-purple-500/50 transition-colors">
                <Upload size={18} className="text-[#6b7280] mb-1.5" />
                <span className="text-[10px] text-[#6b7280]">
                  {idFileName || "Click to upload your government ID"}
                </span>
                <span className="text-[9px] text-[#4a4d65] mt-0.5">JPG, PNG, or PDF — Max 5MB</span>
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.pdf"
                  className="hidden"
                  onChange={handleFileChange}
                  required
                />
              </label>
            </div>

            <Button
              type="submit"
              variant="cyan"
              size="lg"
              disabled={loading}
              className="w-full tracking-widest mt-2"
            >
              {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
            </Button>
          </form>

          <p className="text-center text-sm text-[#6b7280] mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
