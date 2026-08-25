import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { StarRating } from "@/components/ui/StarRating";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Listing } from "@/lib/types";

interface ListingCardProps {
  listing: Listing;
}

// Individual marketplace card — image hero, rating badge, price, games, and CTA
export function ListingCard({ listing }: ListingCardProps) {
  return (
    <div className="bg-[#161929] rounded-xl overflow-hidden border border-[#1e2235] hover:border-purple-500/40 transition-all duration-300 group hover:-translate-y-0.5">
      {/* Card image with rating overlay */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Dark gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161929]/60 to-transparent" />

        {/* Rating badge — top right */}
        <div className="absolute top-3 right-3 bg-[#0d0f1a]/80 backdrop-blur-sm rounded px-2 py-1">
          <StarRating rating={listing.rating} />
        </div>
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Title + price row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading text-lg font-bold text-white leading-tight">
            {listing.title}
          </h3>
          <div className="text-right shrink-0">
            <span className="text-cyan-400 font-bold text-base">₹{listing.price_per_hour}</span>
            <span className="text-[#6b7280] text-xs">/hr</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-[#6b7280] text-xs mb-3">
          <MapPin size={11} />
          <span>{listing.location}</span>
        </div>

        {/* Featured games label */}
        <p className="text-[10px] font-semibold tracking-widest text-[#6b7280] mb-2">FEATURED GAMES</p>

        {/* Game tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(listing.featured_games || listing.featuredGames || []).map((game) => (
            <Badge key={game}>{game}</Badge>
          ))}
        </div>

        {/* Book session CTA */}
        <Link href={`/listing/${listing.id}`}>
          <Button variant="secondary" size="sm" className="w-full text-[11px] tracking-widest">
            BOOK SESSION
          </Button>
        </Link>
      </div>
    </div>
  );
}
