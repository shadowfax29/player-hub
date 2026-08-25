"use client";

import { useState } from "react";
import { Check, ChevronRight, ChevronLeft, Plus, X, Upload, MapPin, Gamepad2, Camera, Clock, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { getSupabase } from "@/lib/supabase";

const STEPS = [
  { label: "SETUP INFO", icon: Gamepad2 },
  { label: "HARDWARE & GAMES", icon: Gamepad2 },
  { label: "PHOTOS", icon: Camera },
  { label: "AVAILABILITY", icon: Clock },
  { label: "GOVT DOCUMENTS", icon: Shield },
  { label: "REVIEW", icon: Check },
];

interface FormData {
  setupName: string;
  description: string;
  category: string;
  location: string;
  address: string;
  hourlyRate: string;
  hardware: string;
  consoleModel: string;
  tvSize: string;
  internetSpeed: string;
  games: string[];
  newGame: string;
  photos: string[];
  availableDays: string[];
  openTime: string;
  closeTime: string;
  minBooking: string;
  maxBooking: string;
  idType: string;
  idFile: string;
  addressProof: string;
  addressProofFile: string;
  taxId: string;
  bankAccount: string;
  agreeTerms: boolean;
}

const defaultForm: FormData = {
  setupName: "",
  description: "",
  category: "ps5",
  location: "",
  address: "",
  hourlyRate: "25",
  hardware: "PlayStation 5 Pro",
  consoleModel: "",
  tvSize: '55"',
  internetSpeed: "500 Mbps",
  games: [],
  newGame: "",
  photos: [],
  availableDays: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  openTime: "10:00",
  closeTime: "22:00",
  minBooking: "1",
  maxBooking: "8",
  idType: "passport",
  idFile: "",
  addressProof: "",
  addressProofFile: "",
  taxId: "",
  bankAccount: "",
  agreeTerms: false,
};

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const CATEGORIES = [
  { value: "ps5", label: "PlayStation 5" },
  { value: "pc", label: "Pro PC Lounge" },
  { value: "vr", label: "VR Arena" },
  { value: "console", label: "Console Private Room" },
  { value: "arcade", label: "Retro Arcade" },
];

const HARDWARE_OPTIONS = [
  "PlayStation 5 Pro",
  "PlayStation 5",
  "PlayStation 4 Pro",
  "Xbox Series X",
  "Xbox Series S",
  "Custom Gaming PC",
  "Nintendo Switch",
  "VR Headset (Meta Quest 3)",
  "VR Headset (PSVR2)",
];

const ID_TYPES = [
  { value: "passport", label: "Passport" },
  { value: "drivers_license", label: "Driver's License" },
  { value: "national_id", label: "National ID Card" },
  { value: "aadhaar", label: "Aadhaar Card" },
];

export function ListingStepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();

  const updateField = (field: keyof FormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleDay = (day: string) => {
    setForm((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  const addGame = () => {
    if (form.newGame.trim() && !form.games.includes(form.newGame.trim())) {
      updateField("games", [...form.games, form.newGame.trim()]);
      updateField("newGame", "");
    }
  };

  const removeGame = (game: string) => {
    updateField("games", form.games.filter((g) => g !== game));
  };

  const addPhoto = () => {
    const placeholders = [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&q=80",
      "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&q=80",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&q=80",
      "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&q=80",
    ];
    const url = placeholders[form.photos.length % placeholders.length];
    updateField("photos", [...form.photos, url]);
  };

  const removePhoto = (index: number) => {
    updateField("photos", form.photos.filter((_, i) => i !== index));
  };

  const submitListing = async () => {
    if (!form.agreeTerms || !user) return;
    setSubmitting(true);

    try {
      const supabase = getSupabase();
      const { error } = await supabase.from("listings").insert({
        host_id: user.id,
        title: form.setupName,
        description: form.description,
        category: form.category,
        location: form.location,
        address: form.address,
        price_per_hour: Number(form.hourlyRate),
        image: form.photos[0] || "",
        photos: form.photos,
        featured_games: form.games,
        hardware: form.hardware,
        console_model: form.consoleModel,
        tv_size: form.tvSize,
        internet_speed: form.internetSpeed,
        available_days: form.availableDays,
        open_time: form.openTime,
        close_time: form.closeTime,
        min_booking_hours: Number(form.minBooking),
        max_booking_hours: Number(form.maxBooking),
        id_type: form.idType,
        tax_id: form.taxId,
        bank_account: form.bankAccount,
        status: "pending",
      });

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error("Submit failed:", err);
      alert("Failed to submit listing. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const next = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderSetupInfo();
      case 1:
        return renderHardwareGames();
      case 2:
        return renderPhotos();
      case 3:
        return renderAvailability();
      case 4:
        return renderGovtDocs();
      case 5:
        return renderReview();
      default:
        return null;
    }
  };

  const renderSetupInfo = () => (
    <div className="space-y-5">
      <div>
        <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">SETUP NAME</label>
        <input
          type="text"
          value={form.setupName}
          onChange={(e) => updateField("setupName", e.target.value)}
          placeholder="e.g. CyberGaming Lounge Tokyo"
          className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
        />
      </div>
      <div>
        <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">DESCRIPTION</label>
        <textarea
          value={form.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Describe your gaming setup, ambiance, and what makes it special..."
          rows={3}
          className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors resize-none"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">CATEGORY</label>
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">HOURLY RATE (INR)</label>
          <div className="flex items-center bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 gap-2">
            <span className="text-[#6b7280] text-sm">$</span>
            <input
              type="number"
              value={form.hourlyRate}
              onChange={(e) => updateField("hourlyRate", e.target.value)}
              className="bg-transparent text-sm text-white outline-none flex-1"
            />
            <span className="text-[#6b7280] text-xs">/ HOUR</span>
          </div>
        </div>
      </div>
      <div>
        <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">
          <MapPin size={12} className="inline mr-1" /> LOCATION / AREA
        </label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => updateField("location", e.target.value)}
          placeholder="e.g. Shibuya, Tokyo"
          className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
        />
      </div>
      <div>
        <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">FULL ADDRESS</label>
        <input
          type="text"
          value={form.address}
          onChange={(e) => updateField("address", e.target.value)}
          placeholder="Street address, building, unit number"
          className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
        />
      </div>
    </div>
  );

  const renderHardwareGames = () => (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">HARDWARE</label>
          <select
            value={form.hardware}
            onChange={(e) => updateField("hardware", e.target.value)}
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
          >
            {HARDWARE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">TV / MONITOR SIZE</label>
          <select
            value={form.tvSize}
            onChange={(e) => updateField("tvSize", e.target.value)}
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
          >
            {['32"', '43"', '50"', '55"', '65"', '75"', '24" Monitor', '27" Monitor', '32" Ultrawide'].map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">INTERNET SPEED</label>
          <select
            value={form.internetSpeed}
            onChange={(e) => updateField("internetSpeed", e.target.value)}
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
          >
            {["100 Mbps", "200 Mbps", "300 Mbps", "500 Mbps", "1 Gbps", "2 Gbps"].map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">CONSOLE MODEL / SERIAL</label>
          <input
            type="text"
            value={form.consoleModel}
            onChange={(e) => updateField("consoleModel", e.target.value)}
            placeholder="Optional — serial or model number"
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-3">INSTALLED GAME LIBRARY</label>
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {form.games.map((game) => (
            <div key={game} className="flex items-center gap-1.5 bg-purple-600/80 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              {game}
              <button onClick={() => removeGame(game)} className="hover:text-purple-200 transition-colors">
                <X size={11} />
              </button>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={form.newGame}
            onChange={(e) => updateField("newGame", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addGame())}
            placeholder="Type a game name and press Enter or Add"
            className="flex-1 bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-2.5 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
          />
          <Button variant="secondary" size="sm" onClick={addGame} className="shrink-0">
            <Plus size={12} className="mr-1" /> ADD
          </Button>
        </div>
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="space-y-5">
      <p className="text-[#a0aec0] text-sm">
        Upload high-quality photos of your gaming setup. The first photo will be used as the cover image.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {form.photos.map((src, i) => (
          <div key={i} className="relative aspect-video rounded-lg overflow-hidden group border border-[#2a2d45]">
            <img src={src} alt={`Setup photo ${i + 1}`} className="w-full h-full object-cover" />
            <button
              onClick={() => removePhoto(i)}
              className="absolute top-2 right-2 w-6 h-6 bg-[#0d0f1a]/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
            >
              <X size={12} className="text-white" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 bg-[#0d0f1a]/60 backdrop-blur-sm px-2 py-1">
              <span className="text-[9px] text-white tracking-widest">{i === 0 ? "COVER" : `PHOTO ${i + 1}`}</span>
            </div>
          </div>
        ))}
        {form.photos.length < 10 && (
          <button
            onClick={addPhoto}
            className="aspect-video bg-[#1a1d2e] border-2 border-dashed border-[#2a2d45] rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-purple-500/50 transition-colors"
          >
            <Upload size={24} className="text-[#6b7280]" />
            <span className="text-[9px] text-[#6b7280] tracking-widest">UPLOAD PHOTO</span>
          </button>
        )}
      </div>
      <p className="text-[10px] text-[#4a4d65] tracking-wide">Minimum 3 photos required. Max 10. JPG, PNG, or WebP. Max 5MB each.</p>
    </div>
  );

  const renderAvailability = () => (
    <div className="space-y-5">
      <div>
        <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-3">AVAILABLE DAYS</label>
        <div className="flex items-center gap-2 flex-wrap">
          {DAYS.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              className={cn(
                "w-10 h-10 md:w-12 md:h-10 rounded-lg text-[10px] font-bold tracking-widest border transition-all",
                form.availableDays.includes(day)
                  ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-400"
                  : "bg-[#1a1d2e] border-[#2a2d45] text-[#6b7280] hover:border-[#4a4d65]"
              )}
            >
              {day}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">OPENING TIME</label>
          <input
            type="time"
            value={form.openTime}
            onChange={(e) => updateField("openTime", e.target.value)}
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white outline-none"
          />
        </div>
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">CLOSING TIME</label>
          <input
            type="time"
            value={form.closeTime}
            onChange={(e) => updateField("closeTime", e.target.value)}
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">MIN BOOKING (HOURS)</label>
          <select
            value={form.minBooking}
            onChange={(e) => updateField("minBooking", e.target.value)}
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
          >
            {[1, 2, 3, 4].map((v) => (
              <option key={v} value={v}>{v} Hour{v > 1 ? "s" : ""}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">MAX BOOKING (HOURS)</label>
          <select
            value={form.maxBooking}
            onChange={(e) => updateField("maxBooking", e.target.value)}
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
          >
            {[4, 6, 8, 12, 24].map((v) => (
              <option key={v} value={v}>{v} Hours</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderGovtDocs = () => (
    <div className="space-y-5">
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-5">
        <div className="flex items-start gap-3">
          <Shield size={18} className="text-purple-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-white">Identity Verification Required</p>
            <p className="text-xs text-[#a0aec0] mt-1">
              To ensure platform safety, all hosts must verify their identity with a government-issued document.
              Your documents are encrypted and stored securely.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">GOVERNMENT ID TYPE</label>
        <select
          value={form.idType}
          onChange={(e) => updateField("idType", e.target.value)}
          className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white outline-none appearance-none cursor-pointer"
        >
          {ID_TYPES.map((t) => (
            <option key={t.value} value={t.value}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">UPLOAD GOVERNMENT ID</label>
        <label className="flex flex-col items-center justify-center w-full h-28 bg-[#1a1d2e] border-2 border-dashed border-[#2a2d45] rounded-lg cursor-pointer hover:border-purple-500/50 transition-colors">
          <Upload size={20} className="text-[#6b7280] mb-2" />
          <span className="text-xs text-[#6b7280]">
            {form.idFile ? form.idFile : "Click to upload — front side"}
          </span>
          <span className="text-[9px] text-[#4a4d65] mt-1">JPG, PNG, PDF — Max 5MB</span>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={(e) => updateField("idFile", e.target.files?.[0]?.name || "")}
          />
        </label>
      </div>

      <div>
        <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">PROOF OF ADDRESS</label>
        <p className="text-[10px] text-[#4a4d65] tracking-wide mb-2">Utility bill, bank statement, or rental agreement (within last 3 months)</p>
        <label className="flex flex-col items-center justify-center w-full h-28 bg-[#1a1d2e] border-2 border-dashed border-[#2a2d45] rounded-lg cursor-pointer hover:border-purple-500/50 transition-colors">
          <Upload size={20} className="text-[#6b7280] mb-2" />
          <span className="text-xs text-[#6b7280]">
            {form.addressProofFile ? form.addressProofFile : "Click to upload address proof"}
          </span>
          <span className="text-[9px] text-[#4a4d65] mt-1">JPG, PNG, PDF — Max 5MB</span>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.pdf"
            className="hidden"
            onChange={(e) => updateField("addressProofFile", e.target.files?.[0]?.name || "")}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">TAX ID / PAN NUMBER</label>
          <input
            type="text"
            value={form.taxId}
            onChange={(e) => updateField("taxId", e.target.value)}
            placeholder="For payment processing"
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-2">BANK ACCOUNT NUMBER</label>
          <input
            type="text"
            value={form.bankAccount}
            onChange={(e) => updateField("bankAccount", e.target.value)}
            placeholder="For payouts"
            className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-4 py-3 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-cyan-400/50 transition-colors"
          />
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-5">
      <p className="text-[#a0aec0] text-sm">Review your listing details before submitting.</p>

      <div className="space-y-3">
        <ReviewRow label="Setup Name" value={form.setupName || "—"} />
        <ReviewRow label="Category" value={CATEGORIES.find((c) => c.value === form.category)?.label || "—"} />
        <ReviewRow label="Location" value={form.location || "—"} />
        <ReviewRow label="Address" value={form.address || "—"} />
        <ReviewRow label="Hourly Rate" value={`₹${form.hourlyRate}/hr`} />
        <ReviewRow label="Hardware" value={form.hardware} />
        <ReviewRow label="TV / Monitor" value={form.tvSize} />
        <ReviewRow label="Internet" value={form.internetSpeed} />
        <ReviewRow label="Games" value={form.games.length > 0 ? form.games.join(", ") : "None added"} />
        <ReviewRow label="Photos" value={`${form.photos.length} uploaded`} />
        <ReviewRow label="Available Days" value={form.availableDays.join(", ")} />
        <ReviewRow label="Hours" value={`${form.openTime} — ${form.closeTime}`} />
        <ReviewRow label="Booking" value={`${form.minBooking}h min — ${form.maxBooking}h max`} />
        <ReviewRow label="ID Type" value={ID_TYPES.find((t) => t.value === form.idType)?.label || "—"} />
        <ReviewRow label="ID Document" value={form.idFile || "Not uploaded"} />
        <ReviewRow label="Address Proof" value={form.addressProofFile || "Not uploaded"} />
        <ReviewRow label="Tax ID" value={form.taxId || "—"} />
        <ReviewRow label="Bank Account" value={form.bankAccount ? "****" + form.bankAccount.slice(-4) : "—"} />
      </div>

      <label className="flex items-start gap-3 cursor-pointer mt-6">
        <input
          type="checkbox"
          checked={form.agreeTerms}
          onChange={(e) => updateField("agreeTerms", e.target.checked)}
          className="mt-1 w-4 h-4 accent-cyan-400"
        />
        <span className="text-xs text-[#a0aec0] leading-relaxed">
          I confirm that all information provided is accurate. I agree to PlayConsole&apos;s Host Terms of Service,
          Cancellation Policy, and understand that listings are subject to review before going live.
        </span>
      </label>
    </div>
  );

  if (submitted) {
    return (
      <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-12 text-center">
        <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-cyan-400" />
        </div>
        <h2 className="font-heading text-2xl font-bold text-white tracking-widest mb-3">LISTING SUBMITTED!</h2>
        <p className="text-[#a0aec0] text-sm max-w-md mx-auto mb-2">
          Your setup <span className="text-white font-semibold">{form.setupName || "Untitled"}</span> has been submitted for review.
        </p>
        <p className="text-[#6b7280] text-xs mb-8">
          Our team will review your listing within 24-48 hours. You will receive a notification once it goes live.
        </p>
        <Button variant="primary" size="md" onClick={() => { setSubmitted(false); setForm(defaultForm); setCurrentStep(0); }} className="tracking-widest">
          CREATE ANOTHER LISTING
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#161929] border border-[#1e2235] rounded-xl overflow-hidden">
      {/* Step progress bar */}
      <div className="px-6 pt-6 pb-4">
        <h2 className="font-heading text-xl font-bold text-white tracking-widest mb-5">LIST YOUR SETUP</h2>
        <div className="flex items-center gap-1 mb-2">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all shrink-0",
                    i < currentStep
                      ? "bg-cyan-500 border-cyan-500 text-[#002661]"
                      : i === currentStep
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-400"
                      : "bg-[#1a1d2e] border-[#2a2d45] text-[#6b7280]"
                  )}
                >
                  {i < currentStep ? <Check size={12} /> : i + 1}
                </div>
                <span
                  className={cn(
                    "text-[9px] tracking-widest font-semibold hidden lg:inline",
                    i <= currentStep ? "text-white" : "text-[#6b7280]"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={cn("flex-1 h-px mx-2", i < currentStep ? "bg-cyan-500" : "bg-[#2a2d45]")} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="px-6 py-5 border-t border-[#1e2235] min-h-[320px]">
        {renderStepContent()}
      </div>

      {/* Navigation buttons */}
      <div className="px-6 py-4 border-t border-[#1e2235] flex items-center justify-between">
        <Button
          variant="ghost"
          size="md"
          onClick={prev}
          disabled={currentStep === 0}
          className={cn("tracking-widest text-xs gap-1", currentStep === 0 && "opacity-30 cursor-not-allowed")}
        >
          <ChevronLeft size={14} /> BACK
        </Button>
        <span className="text-[10px] text-[#6b7280] tracking-widest">
          STEP {currentStep + 1} OF {STEPS.length}
        </span>
        {currentStep < STEPS.length - 1 ? (
          <Button variant="cyan" size="md" onClick={next} className="tracking-widest text-xs gap-1">
            NEXT <ChevronRight size={14} />
          </Button>
        ) : (
          <Button
            variant="primary"
            size="md"
            disabled={!form.agreeTerms || submitting}
            onClick={submitListing}
            className={cn("tracking-widest text-xs gap-2", (!form.agreeTerms || submitting) && "opacity-50 cursor-not-allowed")}
          >
            {submitting ? (
              <>
                <Loader2 size={14} className="animate-spin" /> SUBMITTING...
              </>
            ) : (
              "SUBMIT LISTING"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#1e2235]">
      <span className="text-[10px] text-[#6b7280] tracking-widest font-semibold">{label}</span>
      <span className="text-xs text-white text-right max-w-[60%] truncate">{value}</span>
    </div>
  );
}
