"use client";

import { useState, useEffect } from "react";
import { MapPin, Calendar, Search, X } from "lucide-react";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { Listing } from "@/lib/types";

const categories = [
  { label: "ALL EXPERIENCES", value: "all" },
  { label: "PRO PC LOUNGES", value: "pc" },
  { label: "VR ARENAS", value: "vr" },
  { label: "CONSOLE PRIVATE ROOMS", value: "console" },
  { label: "RETRO ARCADE", value: "arcade" },
] as const;

type CategoryValue = typeof categories[number]["value"];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryValue>("all");
  const [locationQuery, setLocationQuery] = useState("");
  const [date, setDate] = useState("");
  const [searchApplied, setSearchApplied] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (activeCategory !== "all") params.set("category", activeCategory);
    if (searchApplied && locationQuery.trim()) params.set("location", locationQuery.trim());

    setLoading(true);
    fetch(`/api/listings?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setListings(data.listings || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, [activeCategory, locationQuery, searchApplied]);

  const handleSearch = () => {
    setSearchApplied(true);
  };

  const handleClearSearch = () => {
    setLocationQuery("");
    setDate("");
    setSearchApplied(false);
  };

  const hasActiveSearch = searchApplied && (locationQuery.trim() || date);

  return (
    <HomeLayout>
      <div className="px-4 md:px-8 py-8 pt-24 pb-24 md:pb-8">
        <h1 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-wide mb-2">
          EXPLORE MARKETPLACE
        </h1>
        <p className="text-[#a0aec0] text-sm mb-8 max-w-xl">
          Discover and book premium gaming setups, high-end PC lounges, and immersive console rooms across the global network.
        </p>

        {/* Search bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="flex items-center gap-3 bg-[#161929] border border-[#1e2235] rounded-lg px-4 py-3 flex-1 sm:max-w-xs focus-within:border-cyan-400/50 transition-colors">
            <MapPin size={16} className="text-cyan-400 shrink-0" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => {
                setLocationQuery(e.target.value);
                if (searchApplied) setSearchApplied(true);
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by location"
              className="bg-transparent text-sm text-white placeholder-[#6b7280] outline-none w-full"
            />
            {locationQuery && (
              <button onClick={() => { setLocationQuery(""); if (searchApplied) setSearchApplied(true); }} className="text-[#6b7280] hover:text-white transition-colors">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 bg-[#161929] border border-[#1e2235] rounded-lg px-4 py-3 flex-1 sm:max-w-xs focus-within:border-cyan-400/50 transition-colors">
            <Calendar size={16} className="text-cyan-400 shrink-0" />
            <input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                if (searchApplied) setSearchApplied(true);
              }}
              className="bg-transparent text-sm text-white outline-none w-full [color-scheme:dark]"
            />
          </div>

          <Button variant="primary" size="md" className="px-8 tracking-widest gap-2" onClick={handleSearch}>
            <Search size={14} />
            EXPLORE
          </Button>
        </div>

        {hasActiveSearch && (
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-[#6b7280] tracking-widest">
              {listings.length} RESULT{listings.length !== 1 ? "S" : ""} FOUND
            </span>
            <button onClick={handleClearSearch} className="text-xs text-cyan-400 hover:text-cyan-300 tracking-widest transition-colors">
              CLEAR SEARCH
            </button>
          </div>
        )}

        {/* Category pills */}
        <div className="flex items-center gap-2 mb-8 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all border",
                activeCategory === cat.value
                  ? "bg-purple-600 border-purple-500 text-white"
                  : "bg-transparent border-[#2a2d45] text-[#6b7280] hover:border-purple-500/50 hover:text-white"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Listings grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#161929] border border-[#1e2235] rounded-xl h-72 animate-pulse" />
            ))}
          </div>
        ) : listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[#6b7280] text-lg mb-2">No listings found.</p>
            <p className="text-[#4a4d65] text-sm">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}
