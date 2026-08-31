"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Upload, Gamepad2, Home, Shield, Camera, CheckCircle2, XCircle, RotateCcw, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { getSupabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { ThemedSelect } from "@/components/ui/ThemedSelect";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

type Step = "details" | "documents" | "verify";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const { notify } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Form state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<"guest" | "host">("guest");
  const [idType, setIdType] = useState("passport");
  const [idFile, setIdFile] = useState<File | null>(null);
  const [idFileName, setIdFileName] = useState("");
  const [idPreview, setIdPreview] = useState<string | null>(null);

  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const [selfieBlob, setSelfieBlob] = useState<Blob | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  // Verification state
  const [step, setStep] = useState<Step>("details");

  // General state
  const [loading, setLoading] = useState(false);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const handleIdFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        notify("File must be under 5MB");
        return;
      }
      setIdFile(file);
      setIdFileName(file.name);
      // Generate preview
      const reader = new FileReader();
      reader.onload = (ev) => setIdPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      setCameraActive(true);
    } catch {
      notify("Camera access denied. Please allow camera permissions and try again.");
    }
  };

  useEffect(() => {
    if (cameraActive && streamRef.current && videoRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [cameraActive]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureSelfie = useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(video, 0, 0);

    canvas.toBlob((blob) => {
      if (blob) {
        setSelfieBlob(blob);
        const url = URL.createObjectURL(blob);
        setSelfiePreview(url);
        stopCamera();
      }
    }, "image/jpeg", 0.9);
  }, []);

  const retakeSelfie = () => {
    setSelfieBlob(null);
    setSelfiePreview(null);
    startCamera();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === "details") {
      if (password !== confirmPassword) {
        notify("Passwords do not match");
        return;
      }
      if (password.length < 8) {
        notify("Password must be at least 8 characters");
        return;
      }
      if (!/[A-Z]/.test(password)) {
        notify("Password must contain at least one uppercase letter");
        return;
      }
      if (!/[a-z]/.test(password)) {
        notify("Password must contain at least one lowercase letter");
        return;
      }
      if (!/[0-9]/.test(password)) {
        notify("Password must contain at least one number");
        return;
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        notify("Password must contain at least one special character");
        return;
      }
      setStep("documents");
      return;
    }

    if (step === "documents") {
      if (!idFile) {
        notify("Please upload a government ID document");
        return;
      }
      setStep("verify");
      return;
    }

    if (step === "verify") {
      if (!selfieBlob) {
        notify("Please take a selfie to continue.");
        return;
      }
    }

    // Final submit
    setLoading(true);
    const result = await signUp(email, password, fullName, {
      role,
      id_type: idType,
    });

    if (result.error) {
      setLoading(false);
      notify(result.error);
      return;
    }

    const supabase = getSupabase();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      notify("Account created but could not verify user. Please log in.");
      return;
    }

    // Upload government ID
    let idDocUrl = "";
    if (idFile) {
      try {
        const ext = idFile.name.split(".").pop() || "jpg";
        const filePath = `${user.id}/government-id.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from("government-ids")
          .upload(filePath, idFile, { upsert: true });
        if (!uploadErr) {
          const { data: urlData } = supabase.storage
            .from("government-ids")
            .getPublicUrl(filePath);
          idDocUrl = urlData.publicUrl;
        }
      } catch (err) {
        console.error("ID upload failed:", err);
      }
    }

    // Upload live selfie
    let selfieUrl = "";
    if (selfieBlob) {
      try {
        const filePath = `${user.id}/selfie.jpg`;
        const { error: uploadErr } = await supabase.storage
          .from("government-ids")
          .upload(filePath, selfieBlob, { upsert: true });
        if (!uploadErr) {
          const { data: urlData } = supabase.storage
            .from("government-ids")
            .getPublicUrl(filePath);
          selfieUrl = urlData.publicUrl;
        }
      } catch (err) {
        console.error("Selfie upload failed:", err);
      }
    }

    // Insert profile — verified only if face match passed
    await supabase.from("profiles").insert({
      id: user.id,
      full_name: fullName,
      email: email,
      role: role,
      id_type: idType,
      id_document_url: idDocUrl,
      selfie_url: selfieUrl,
      verified: false,
    });

    setLoading(false);
    router.push("/login");
  };

  const stepIndex = step === "details" ? 0 : step === "documents" ? 1 : 2;

  return (
    <div className="min-h-screen bg-[#0f131e] flex items-center justify-center px-4 py-12">
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#5203d5]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#00daf3]/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8">
          <Image
            src="/logo.png"
            alt="PlayConsole"
            width={200}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </Link>

        <div className="bg-[#161929] border border-[#1e2235] rounded-2xl p-6 md:p-8">
          <h1 className="font-heading text-2xl font-extrabold text-white tracking-wide mb-1">
            CREATE ACCOUNT
          </h1>
          <p className="text-[#6b7280] text-sm mb-4">
            Join the ultimate gaming marketplace
          </p>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all shrink-0",
                  i < stepIndex ? "bg-cyan-500 border-cyan-500 text-[#002661]" :
                  i === stepIndex ? "bg-cyan-500/20 border-cyan-400 text-cyan-400" :
                  "bg-[#1a1d2e] border-[#2a2d45] text-[#6b7280]"
                )}>
                  {i < stepIndex ? <CheckCircle2 size={12} /> : i + 1}
                </div>
                {i < 2 && (
                  <div className={cn("flex-1 h-px mx-2", i < stepIndex ? "bg-cyan-500" : "bg-[#2a2d45]")} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mb-6">
            <span className={cn("text-[9px] tracking-widest", stepIndex >= 0 ? "text-white" : "text-[#6b7280]")}>DETAILS</span>
            <span className={cn("text-[9px] tracking-widest", stepIndex >= 1 ? "text-white" : "text-[#6b7280]")}>DOCUMENT</span>
            <span className={cn("text-[9px] tracking-widest", stepIndex >= 2 ? "text-white" : "text-[#6b7280]")}>VERIFY</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* STEP 1: Account Details */}
            {step === "details" && (
              <>
                <div>
                  <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">I WANT TO</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button type="button" onClick={() => setRole("guest")}
                      className={cn("flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                        role === "guest" ? "border-cyan-400 bg-cyan-400/10" : "border-[#2a2d45] bg-[#1a1d2e] hover:border-[#4a4d65]"
                      )}>
                      <Gamepad2 size={24} className={role === "guest" ? "text-cyan-400" : "text-[#6b7280]"} />
                      <div className="text-center">
                        <p className={cn("text-xs font-bold tracking-wider", role === "guest" ? "text-white" : "text-[#a0aec0]")}>PLAY GAMES</p>
                        <p className="text-[9px] text-[#6b7280] mt-0.5">Book gaming sessions</p>
                      </div>
                    </button>
                    <button type="button" onClick={() => setRole("host")}
                      className={cn("flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                        role === "host" ? "border-purple-500 bg-purple-500/10" : "border-[#2a2d45] bg-[#1a1d2e] hover:border-[#4a4d65]"
                      )}>
                      <Home size={24} className={role === "host" ? "text-purple-400" : "text-[#6b7280]"} />
                      <div className="text-center">
                        <p className={cn("text-xs font-bold tracking-wider", role === "host" ? "text-white" : "text-[#a0aec0]")}>HOST SETUP</p>
                        <p className="text-[9px] text-[#6b7280] mt-0.5">List your gaming space</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">FULL NAME</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe" required
                    className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors" />
                </div>

                <div>
                  <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">EMAIL</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com" required
                    className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors" />
                </div>

                <div>
                  <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">PASSWORD</label>
                  <div className="relative">
                    <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 chars, A-Z, a-z, 0-9, !@#" required
                      className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 pr-10 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white transition-colors">
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">CONFIRM PASSWORD</label>
                  <div className="relative">
                    <input type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password" required
                      className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 pr-10 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white transition-colors">
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* STEP 2: Government ID Upload */}
            {step === "documents" && (
              <>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 mb-2">
                  <div className="flex items-start gap-3">
                    <Shield size={16} className="text-purple-400 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-[#a0aec0] leading-relaxed">
                      Upload a government-issued ID. Your document is encrypted and stored securely.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-1.5">DOCUMENT TYPE</label>
                  <ThemedSelect
                    options={[
                      { value: "passport", label: "Passport" },
                      { value: "drivers_license", label: "Driver's License" },
                      { value: "national_id", label: "National ID Card" },
                      { value: "aadhaar", label: "Aadhaar Card" },
                    ]}
                    value={idType}
                    onChange={setIdType}
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-1.5">UPLOAD GOVERNMENT ID</label>
                  {idPreview ? (
                    <div className="relative rounded-lg overflow-hidden border border-[#2a2d45]">
                      <img src={idPreview} alt="ID Preview" className="w-full h-40 object-contain bg-[#1a1d2e]" />
                      <button type="button" onClick={() => { setIdFile(null); setIdPreview(null); setIdFileName(""); }}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors">
                        <XCircle size={14} className="text-white" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-[#0d0f1a]/80 backdrop-blur-sm px-3 py-1.5">
                        <span className="text-[10px] text-white">{idFileName}</span>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-28 bg-[#1a1d2e] border-2 border-dashed border-[#2a2d45] rounded-lg cursor-pointer hover:border-purple-500/50 transition-colors">
                      <Upload size={20} className="text-[#6b7280] mb-1.5" />
                      <span className="text-[10px] text-[#6b7280]">Click to upload your government ID</span>
                      <span className="text-[9px] text-[#4a4d65] mt-0.5">JPG, PNG, or PDF — Max 5MB</span>
                      <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={handleIdFileChange} required />
                    </label>
                  )}
                </div>
              </>
            )}

            {/* STEP 3: Live Photo Verification */}
            {step === "verify" && (
              <>
                <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-2">
                  <div className="flex items-start gap-3">
                    <Camera size={16} className="text-cyan-400 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-[#a0aec0] leading-relaxed">
                      Take a live selfie to verify your identity against your government ID.
                      Look directly at the camera with good lighting.
                    </p>
                  </div>
                </div>

                {/* Camera / Selfie preview */}
                <div className="relative rounded-xl overflow-hidden bg-[#1a1d2e] border border-[#2a2d45]">
                  {cameraActive && !selfiePreview && (
                    <>
                      <video ref={videoRef} autoPlay playsInline muted
                        className="w-full h-56 object-cover" style={{ transform: "scaleX(-1)" }} />
                      {/* Overlay guide */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-32 h-32 rounded-full border-2 border-dashed border-white/40" />
                      </div>
                      <button type="button" onClick={captureSelfie}
                        className="absolute bottom-3 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-white/90 hover:bg-white transition-all flex items-center justify-center shadow-lg active:scale-95">
                        <div className="w-11 h-11 rounded-full border-2 border-[#0f131e]" />
                      </button>
                    </>
                  )}

                  {selfiePreview && (
                    <>
                      <img src={selfiePreview} alt="Selfie" className="w-full h-56 object-cover" style={{ transform: "scaleX(-1)" }} />
                      <button type="button" onClick={retakeSelfie}
                        className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0f1a]/80 backdrop-blur-sm rounded-full text-xs text-white hover:bg-[#0d0f1a] transition-colors">
                        <RotateCcw size={12} /> Retake
                      </button>
                    </>
                  )}

                  {!cameraActive && !selfiePreview && (
                    <button type="button" onClick={startCamera}
                      className="w-full h-56 flex flex-col items-center justify-center gap-3 text-[#6b7280] hover:text-white transition-colors">
                      <Camera size={32} />
                      <span className="text-xs tracking-widest">TAP TO OPEN CAMERA</span>
                    </button>
                  )}
                </div>

                {/* Hidden canvas for capture */}
                <canvas ref={canvasRef} className="hidden" />
              </>
            )}

            {/* Navigation buttons */}
            {step === "details" && (
              <Button type="submit" variant="cyan" size="lg" className="w-full tracking-widest mt-2">
                CONTINUE
              </Button>
            )}

            {step === "documents" && (
              <div className="flex gap-3 mt-2">
                <Button type="button" variant="ghost" size="lg" className="flex-1 tracking-widest"
                  onClick={() => setStep("details")}>BACK</Button>
                <Button type="submit" variant="cyan" size="lg" className="flex-1 tracking-widest"
                  disabled={!idFile}>CONTINUE</Button>
              </div>
            )}

            {step === "verify" && (
              <div className="flex gap-3 mt-2">
                <Button type="button" variant="ghost" size="lg" className="flex-1 tracking-widest"
                  onClick={() => { stopCamera(); setStep("documents"); }}>BACK</Button>
                <Button type="submit" variant="cyan" size="lg" className="flex-1 tracking-widest"
                  disabled={!selfieBlob || loading}>
                  {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
                </Button>
              </div>
            )}
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
