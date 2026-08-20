"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Wifi, Users, Monitor, Utensils, Star, Calendar, Clock, CheckCircle2, CreditCard } from "lucide-react";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { useAuth } from "@/lib/auth-context";
import { getSupabase } from "@/lib/supabase";
import { RazorpayCheckout } from "@/components/payment/RazorpayCheckout";
import type { Listing, Review } from "@/lib/types";

export default function ListingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn, user } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [listingReviews, setListingReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  // Booking form state
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [hours, setHours] = useState(1);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingCreated, setBookingCreated] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string>("");
  const [bookingError, setBookingError] = useState("");

  // Payment state
  const [paymentComplete, setPaymentComplete] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      fetch(`/api/listings/${id}`).then((r) => r.json()),
      fetch(`/api/reviews?listing_id=${id}`).then((r) => r.json()),
    ])
      .then(([listingData, reviewsData]) => {
        setListing(listingData.listing || null);
        setListingReviews(reviewsData.reviews || []);
      })
      .catch(() => {
        setListing(null);
        setListingReviews([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Generate time options from open_time to close_time
  const timeOptions = (() => {
    if (!listing) return [];
    const open = parseInt((listing.open_time || "10:00").split(":")[0], 10);
    const close = parseInt((listing.close_time || "22:00").split(":")[0], 10);
    const times: string[] = [];
    for (let h = open; h < close; h++) {
      times.push(`${String(h).padStart(2, "0")}:00`);
    }
    return times;
  })();

  const minHours = listing?.min_booking_hours || 1;
  const maxHours = Math.min(listing?.max_booking_hours || 8, (() => {
    if (!listing) return 8;
    const close = parseInt((listing.close_time || "22:00").split(":")[0], 10);
    const start = parseInt(startTime.split(":")[0], 10);
    return Math.max(1, close - start);
  })());
  const hourOptions = Array.from({ length: maxHours - minHours + 1 }, (_, i) => minHours + i);

  const totalPrice = listing ? listing.price_per_hour * hours : 0;

  const endTime = (() => {
    const startH = parseInt(startTime.split(":")[0], 10);
    return `${String(startH + hours).padStart(2, "0")}:00`;
  })();

  const today = new Date().toISOString().split("T")[0];

  const handleBooking = async () => {
    setBookingError("");
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    if (!bookingDate) {
      setBookingError("Please select a date.");
      return;
    }
    if (bookingDate < today) {
      setBookingError("Cannot book a date in the past.");
      return;
    }

    setBookingLoading(true);
    try {
      const { data: { session } } = await getSupabase().auth.getSession();
      const token = session?.access_token;
      if (!token) {
        setBookingError("Session expired. Please log in again.");
        setBookingLoading(false);
        return;
      }

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          listing_id: id,
          booking_date: bookingDate,
          start_time: startTime,
          end_time: endTime,
          hours,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setBookingError(data.error || "Failed to create booking.");
        setBookingLoading(false);
        return;
      }

      setCreatedBookingId(data.booking.id);
      setBookingCreated(true);
      setBookingLoading(false);
    } catch {
      setBookingError("Something went wrong. Please try again.");
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <HomeLayout>
        <div className="pt-24 px-4 md:px-8 pb-24 md:pb-8">
          <div className="h-56 md:h-72 bg-[#161929] animate-pulse rounded-xl mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-[#161929] animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </HomeLayout>
    );
  }

  if (!listing) {
    return (
      <HomeLayout>
        <div className="pt-24 px-4 md:px-8 pb-24 md:pb-8 text-center py-20">
          <p className="text-[#6b7280] text-lg">Listing not found.</p>
        </div>
      </HomeLayout>
    );
  }

  // Payment success screen
  if (paymentComplete) {
    return (
      <HomeLayout>
        <div className="pt-24 px-4 md:px-8 pb-24 md:pb-8 flex items-center justify-center min-h-[60vh]">
          <div className="bg-[#161929] border border-[#1e2235] rounded-2xl p-8 max-w-md w-full text-center">
            <CheckCircle2 size={48} className="text-emerald-400 mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-extrabold text-white tracking-wide mb-2">BOOKING CONFIRMED</h2>
            <p className="text-[#a0aec0] text-sm mb-1">{listing.title}</p>
            <p className="text-[#6b7280] text-xs mb-6">
              {bookingDate} · {startTime} - {endTime} · {hours}hr · ${totalPrice.toFixed(2)}
            </p>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-3 mb-6">
              <p className="text-emerald-400 text-xs font-bold tracking-wide">PAYMENT CONFIRMED</p>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" size="lg" className="flex-1 tracking-widest" onClick={() => router.push("/bookings")}>
                VIEW BOOKINGS
              </Button>
              <Button variant="cyan" size="lg" className="flex-1 tracking-widest" onClick={() => router.push("/marketplace")}>
                EXPLORE MORE
              </Button>
            </div>
          </div>
        </div>
      </HomeLayout>
    );
  }

  // Payment step screen
  if (bookingCreated && createdBookingId) {
    return (
      <HomeLayout>
        <div className="pt-24 px-4 md:px-8 pb-24 md:pb-8 flex items-center justify-center min-h-[60vh]">
          <div className="bg-[#161929] border border-[#1e2235] rounded-2xl p-8 max-w-md w-full text-center">
            <CreditCard size={40} className="text-cyan-400 mx-auto mb-4" />
            <h2 className="font-heading text-xl font-extrabold text-white tracking-wide mb-2">COMPLETE PAYMENT</h2>
            <p className="text-[#a0aec0] text-sm mb-1">{listing.title}</p>
            <p className="text-[#6b7280] text-xs mb-6">
              {bookingDate} · {startTime} - {endTime} · {hours}hr
            </p>

            <div className="bg-[#0d0f1a] rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6b7280]">Session Total</span>
                <span className="text-white font-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between">
                <span className="text-white font-bold">PAY NOW</span>
                <span className="text-cyan-400 font-bold text-lg">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <RazorpayCheckout
              bookingId={createdBookingId}
              amount={totalPrice}
              listingTitle={listing.title}
              onSuccess={() => setPaymentComplete(true)}
            />

            <button
              onClick={() => {
                setBookingCreated(false);
                setCreatedBookingId("");
              }}
              className="text-[#6b7280] text-xs mt-4 hover:text-white transition-colors"
            >
              Cancel and go back
            </button>
          </div>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      {/* Hero image */}
      <div className="relative h-56 md:h-72 w-full overflow-hidden pt-20">
        <Image
          src={listing.image || "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1400&q=80"}
          alt={listing.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-[#0d0f1a]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 md:p-8">
          <Badge variant="purple" className="mb-3 text-[10px] tracking-widest">ELITE STATION</Badge>
          <div className="flex items-center gap-3 mb-2">
            <StarRating rating={listing.rating} size={14} />
          </div>
          <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-wide">
            {listing.title.toUpperCase()}
          </h1>
          <p className="text-[#a0aec0] text-sm mt-2 max-w-lg">{listing.location}</p>
        </div>
      </div>

      {/* Content + booking sidebar */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8 px-4 md:px-8 py-8 pb-24 md:pb-8">
        <div className="flex-1 min-w-0">
          {/* Specs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { icon: Monitor, label: "HARDWARE", value: listing.hardware || listing.category.toUpperCase() },
              { icon: Users, label: "CAPACITY", value: `${listing.max_booking_hours || 8} Players` },
              { icon: Utensils, label: "SNACKS", value: "Available" },
              { icon: Wifi, label: "NETWORK", value: listing.internet_speed || "500 Mbps" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-[#161929] border border-[#1e2235] rounded-xl p-3 md:p-4 text-center">
                <Icon size={20} className="text-cyan-400 mx-auto mb-2" />
                <p className="text-[10px] text-[#6b7280] tracking-widest mb-1">{label}</p>
                <p className="text-xs md:text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Featured games */}
          {listing.featured_games && listing.featured_games.length > 0 && (
            <div className="mb-8">
              <h2 className="font-heading text-xl font-bold text-white mb-4 tracking-wide">LIBRARY HIGHLIGHTS</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {listing.featured_games.slice(0, 4).map((game) => (
                  <div key={game} className="flex items-center gap-3 bg-[#161929] border border-[#1e2235] rounded-lg p-3">
                    <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-900 to-blue-700 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-white">{game}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div>
            <h2 className="font-heading text-xl font-bold text-white mb-4 tracking-wide border-l-4 border-purple-500 pl-3">
              PLAYER FEEDBACK
            </h2>
            <div className="space-y-4">
              {listingReviews.length > 0 ? (
                listingReviews.map((review) => (
                  <div key={review.id} className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold text-white">
                          {review.author_name?.charAt(0) || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{review.author_name}</p>
                          <p className="text-[10px] text-[#6b7280] tracking-widest">
                            {review.created_at ? new Date(review.created_at).toLocaleDateString() : ""}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#a0aec0] text-sm italic">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-[#6b7280] text-sm">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Booking sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5 lg:sticky lg:top-20">
            <div className="flex items-baseline gap-2 mb-5">
              <span className="text-3xl font-heading font-bold text-white">${listing.price_per_hour}</span>
              <span className="text-[#6b7280] text-sm">/ HOUR</span>
            </div>

            {/* Date */}
            <div className="mb-4">
              <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-1.5">
                <Calendar size={12} className="inline mr-1" /> DATE
              </label>
              <input
                type="date"
                min={today}
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50 transition-colors [color-scheme:dark]"
              />
            </div>

            {/* Start Time */}
            <div className="mb-4">
              <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-1.5">
                <Clock size={12} className="inline mr-1" /> START TIME
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white outline-none appearance-none cursor-pointer"
              >
                {timeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Hours */}
            <div className="mb-4">
              <label className="text-[10px] text-[#6b7280] tracking-widest font-semibold block mb-1.5">HOURS</label>
              <select
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white outline-none appearance-none cursor-pointer"
              >
                {hourOptions.map((h) => (
                  <option key={h} value={h}>{h} {h === 1 ? "hour" : "hours"}</option>
                ))}
              </select>
            </div>

            {/* Price breakdown */}
            <div className="bg-[#0d0f1a] rounded-lg p-3 mb-4 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-[#6b7280]">${listing.price_per_hour} x {hours} {hours === 1 ? "hour" : "hours"}</span>
                <span className="text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/5 pt-2 flex justify-between text-sm font-bold">
                <span className="text-white">TOTAL</span>
                <span className="text-cyan-400">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {bookingError && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
                <p className="text-red-400 text-xs">{bookingError}</p>
              </div>
            )}

            <Button
              variant="cyan"
              size="lg"
              className="w-full tracking-widest mb-2"
              onClick={handleBooking}
              disabled={bookingLoading}
            >
              {bookingLoading ? "BOOKING..." : isLoggedIn ? "CONFIRM & PAY" : "SIGN UP TO BOOK"}
            </Button>
            <p className="text-center text-[10px] text-[#6b7280]">
              {isLoggedIn ? "Secure payment via Razorpay" : "Create an account to continue"}
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
