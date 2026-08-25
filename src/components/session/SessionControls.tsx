"use client";

import { useState, useEffect, useCallback } from "react";
import { Play, Clock, CheckCircle2, XCircle, ArrowRight, Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { getSupabase } from "@/lib/supabase";

interface Booking {
  id: string;
  status: string;
  hours: number;
  total_price: number;
  booking_date: string;
  start_time: string;
  end_time: string;
  session_started_at: string | null;
  session_ends_at: string | null;
  session_active: boolean;
  host_confirmed_end: boolean;
  guest_confirmed_end: boolean;
  host_wants_continue: boolean;
  guest_wants_continue: boolean;
  continue_notes: string | null;
  host_id: string;
  guest_id: string;
  listings?: { title: string; image: string; location: string } | null;
}

interface SessionControlsProps {
  booking: Booking;
  userId: string;
  onBookingUpdate: (booking: Partial<Booking> & { id: string }) => void;
}

export function SessionControls({ booking, userId, onBookingUpdate }: SessionControlsProps) {
  const [loading, setLoading] = useState(false);
  const [continueNotes, setContinueNotes] = useState("");
  const [showContinueForm, setShowContinueForm] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [ratingTarget, setRatingTarget] = useState<"host" | "guest">("host");
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [hasExistingReview, setHasExistingReview] = useState(false);

  const isHost = booking.host_id === userId;
  const isGuest = booking.guest_id === userId;
  const role = isHost ? "host" : "guest";

  // Countdown timer
  useEffect(() => {
    if (!booking.session_ends_at || !booking.session_active) {
      setTimeLeft("");
      return;
    }
    const updateTimer = () => {
      const now = Date.now();
      const ends = new Date(booking.session_ends_at!).getTime();
      const diff = ends - now;
      if (diff <= 0) {
        setTimeLeft("00:00");
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [booking.session_ends_at, booking.session_active]);

  // Check for existing reviews
  useEffect(() => {
    if (booking.status !== "completed") return;
    getSupabase()
      .from("reviews")
      .select("id")
      .eq("booking_id", booking.id)
      .eq("author_id", userId)
      .limit(1)
      .then(({ data }) => setHasExistingReview(!!data && data.length > 0));
  }, [booking.status, booking.id, userId]);

  const callSession = useCallback(async (action: string, notes?: string) => {
    setLoading(true);
    setError("");
    try {
      const { data: { session } } = await getSupabase().auth.getSession();
      const token = session?.access_token;
      if (!token) { setError("Session expired"); setLoading(false); return; }

      const res = await fetch("/api/bookings/session", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ action, booking_id: booking.id, notes }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      onBookingUpdate(data.booking);
      setLoading(false);
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  }, [booking.id, onBookingUpdate]);

  const submitReview = async () => {
    setLoading(true);
    setError("");
    try {
      const { data: { session } } = await getSupabase().auth.getSession();
      const token = session?.access_token;
      if (!token) { setError("Session expired"); setLoading(false); return; }

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          listing_id: booking.listings ? undefined : undefined,
          booking_id: booking.id,
          host_id: booking.host_id,
          author_name: "User",
          rating,
          comment: reviewText,
          target_role: ratingTarget,
        }),
      });
      if (res.ok) {
        setRatingSubmitted(true);
        setShowRating(false);
      }
      setLoading(false);
    } catch {
      setError("Failed to submit review");
      setLoading(false);
    }
  };

  // ── ACTIVE SESSION ──
  if (booking.session_active && (booking.status === "active")) {
    return (
      <div className="space-y-3">
        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <p className="text-[10px] text-cyan-400 tracking-widest font-bold">SESSION IN PROGRESS</p>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <Clock size={20} className="text-cyan-400" />
            <span className="font-mono text-2xl font-bold text-white">{timeLeft}</span>
          </div>
          <p className="text-[10px] text-[#6b7280]">
            {isHost ? "Guest is playing. Timer ends automatically + 10min buffer." : "Host started the session. Timer is running."}
          </p>
        </div>

        {isHost && (
          <Button variant="cyan" size="lg" className="w-full tracking-widest" onClick={() => callSession("confirm_end")} disabled={loading}>
            {loading ? "ENDING..." : "END SESSION"}
          </Button>
        )}

        {isGuest && (
          <Button variant="cyan" size="lg" className="w-full tracking-widest" onClick={() => callSession("confirm_end")} disabled={loading}>
            {loading ? "CONFIRMING..." : "CONFIRM SESSION END"}
          </Button>
        )}

        {booking.host_confirmed_end && !booking.guest_confirmed_end && isGuest && (
          <p className="text-[10px] text-amber-400 text-center">Host has confirmed end. Waiting for you.</p>
        )}
        {booking.guest_confirmed_end && !booking.host_confirmed_end && isHost && (
          <p className="text-[10px] text-amber-400 text-center">Guest has confirmed end. Waiting for you.</p>
        )}
      </div>
    );
  }

  // ── AWAITING CONFIRMATION (one party confirmed end) ──
  if (booking.status === "awaiting_confirmation") {
    const iConfirmed = isHost ? booking.host_confirmed_end : booking.guest_confirmed_end;
    const otherConfirmed = isHost ? booking.guest_confirmed_end : booking.host_confirmed_end;
    return (
      <div className="space-y-3">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-amber-400" />
            <p className="text-[10px] text-amber-400 tracking-widest font-bold">AWAITING CONFIRMATION</p>
          </div>
          <p className="text-[#a0aec0] text-xs">
            {iConfirmed
              ? otherConfirmed ? "Both parties confirmed. Session will move to review phase." : "You confirmed end. Waiting for the other party."
              : "Waiting for you to confirm session end."}
          </p>
        </div>
        {!iConfirmed && (
          <Button variant="cyan" size="lg" className="w-full tracking-widest" onClick={() => callSession("confirm_end")} disabled={loading}>
            {loading ? "CONFIRMING..." : "CONFIRM SESSION END"}
          </Button>
        )}
      </div>
    );
  }

  // ── AWAITING CONTINUE (both confirmed end, now decide to continue or finish) ──
  if (booking.status === "awaiting_continue") {
    const otherWants = isHost ? booking.guest_wants_continue : booking.host_wants_continue;
    const iWant = isHost ? booking.host_wants_continue : booking.guest_wants_continue;

    return (
      <div className="space-y-3">
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRight size={16} className="text-purple-400" />
            <p className="text-[10px] text-purple-400 tracking-widest font-bold">SESSION ENDED</p>
          </div>
          <p className="text-[#a0aec0] text-xs mb-3">
            Do you want to continue playing? Both parties must agree.
          </p>
          <p className="text-[#6b7280] text-[10px]">
            {otherWants ? "Other party wants to continue." : "Other party hasn't decided yet."}
          </p>
        </div>

        {iWant ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3">
            <p className="text-emerald-400 text-xs text-center">You chose to continue. Waiting for the other party.</p>
          </div>
        ) : (
          <>
            {!showContinueForm ? (
              <div className="flex gap-3">
                <Button variant="cyan" size="lg" className="flex-1 tracking-widest" onClick={() => setShowContinueForm(true)}>
                  CONTINUE (+1 HR)
                </Button>
                <Button variant="ghost" size="lg" className="flex-1 tracking-widest" onClick={() => callSession("decline_continue")} disabled={loading}>
                  FINISH
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-1.5">
                    <MessageSquare size={12} className="inline mr-1" /> NOTES (optional)
                  </label>
                  <textarea
                    value={continueNotes}
                    onChange={(e) => setContinueNotes(e.target.value)}
                    placeholder="Reason for continuing..."
                    rows={2}
                    className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-purple-500/50 transition-colors resize-none"
                  />
                </div>
                <div className="flex gap-3">
                  <Button variant="cyan" size="lg" className="flex-1 tracking-widest" onClick={() => callSession("continue_session", continueNotes)} disabled={loading}>
                    {loading ? "SUBMITTING..." : "CONFIRM CONTINUE"}
                  </Button>
                  <Button variant="ghost" size="lg" className="flex-1 tracking-widest" onClick={() => setShowContinueForm(false)}>
                    CANCEL
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // ── COMPLETED ──
  if (booking.status === "completed") {
    const reviewTarget = isHost ? "guest" : "host";

    return (
      <div className="space-y-3">
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <p className="text-[10px] text-emerald-400 tracking-widest font-bold">SESSION COMPLETED</p>
          </div>
          <p className="text-[#a0aec0] text-xs">
            Total: ₹{booking.total_price.toFixed(2)} · {booking.hours}hr
          </p>
        </div>

        {!hasExistingReview && !ratingSubmitted && (
          <>
            {!showRating ? (
              <Button variant="cyan" size="lg" className="w-full tracking-widest" onClick={() => { setRatingTarget(reviewTarget); setShowRating(true); }}>
                RATE {reviewTarget.toUpperCase()}
              </Button>
            ) : (
              <div className="bg-[#1a1d2e] border border-[#2a2d45] rounded-xl p-4 space-y-3">
                <p className="text-[10px] text-[#6b7280] tracking-widest font-semibold">
                  RATE THE {ratingTarget.toUpperCase()}
                </p>
                <div className="flex gap-1 justify-center">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} onClick={() => setRating(s)}>
                      <Star size={24} className={s <= rating ? "fill-amber-400 text-amber-400" : "text-[#2a2d45]"} />
                    </button>
                  ))}
                </div>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience..."
                  rows={3}
                  className="w-full bg-[#0d0f1a] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#4a4d65] outline-none focus:border-purple-500/50 transition-colors resize-none"
                />
                <div className="flex gap-3">
                  <Button variant="cyan" size="lg" className="flex-1 tracking-widest" onClick={submitReview} disabled={loading || !reviewText}>
                    {loading ? "SUBMITTING..." : "SUBMIT"}
                  </Button>
                  <Button variant="ghost" size="lg" className="flex-1 tracking-widest" onClick={() => setShowRating(false)}>
                    CANCEL
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {hasExistingReview && (
          <p className="text-[10px] text-[#6b7280] text-center">You already reviewed this session.</p>
        )}
        {ratingSubmitted && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 text-center">
            <p className="text-emerald-400 text-xs">Review submitted!</p>
          </div>
        )}
      </div>
    );
  }

  // ── PENDING / CONFIRMED (pre-session) ──
  if (booking.status === "confirmed" && isHost) {
    return (
      <Button variant="cyan" size="lg" className="w-full tracking-widest" onClick={() => callSession("start_session")} disabled={loading}>
        {loading ? "STARTING..." : <><Play size={14} className="inline mr-2" />START SESSION</>}
      </Button>
    );
  }

  if (booking.status === "confirmed" && isGuest) {
    return (
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 text-center">
        <Clock size={20} className="text-cyan-400 mx-auto mb-2" />
        <p className="text-[10px] text-cyan-400 tracking-widest font-bold">WAITING FOR HOST</p>
        <p className="text-[#6b7280] text-[10px] mt-1">Host will start the session when you arrive.</p>
      </div>
    );
  }

  return null;
}
