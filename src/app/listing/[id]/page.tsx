"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, Wifi, Users, Monitor, Utensils, Star, BadgeCheck, Clock } from "lucide-react";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { useAuth } from "@/lib/auth-context";
import type { Listing, Review } from "@/lib/types";

export default function ListingDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [listing, setListing] = useState<Listing | null>(null);
  const [listingReviews, setListingReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleConfirmBooking = () => {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
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
              { icon: Monitor, label: "HARDWARE", value: listing.category.toUpperCase() },
              { icon: Users, label: "CAPACITY", value: "4 Players" },
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
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5 lg:sticky lg:top-20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-heading font-bold text-white">${listing.price_per_hour}</span>
                <span className="text-[#6b7280] text-sm"> / HOUR</span>
              </div>
              <div className="text-right">
                <p className="text-cyan-400 text-[10px] font-bold tracking-widest">PEAK TIME</p>
                <p className="text-cyan-400 text-xs">Instant Book</p>
              </div>
            </div>

            <Button
              variant="cyan"
              size="lg"
              className="w-full tracking-widest mb-2"
              onClick={handleConfirmBooking}
            >
              {isLoggedIn ? "CONFIRM BOOKING" : "SIGN UP TO BOOK"}
            </Button>
            <p className="text-center text-[10px] text-[#6b7280]">
              {isLoggedIn ? "You won't be charged yet" : "Create an account to continue"}
            </p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
