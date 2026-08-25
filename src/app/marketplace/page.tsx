"use client";

import { useState, useEffect } from "react";
import { MapPin, Search, X } from "lucide-react";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { ListingCard } from "@/components/marketplace/ListingCard";
import { Button } from "@/components/ui/Button";
import { ThemedSelect } from "@/components/ui/ThemedSelect";
import { DatePicker } from "@/components/ui/DatePicker";
import type { Listing } from "@/lib/types";

const cities = [
  { label: "All Cities", value: "" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Delhi", value: "Delhi" },
  { label: "Bangalore", value: "Bangalore" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Chennai", value: "Chennai" },
  { label: "Pune", value: "Pune" },
  { label: "Kolkata", value: "Kolkata" },
  { label: "Ahmedabad", value: "Ahmedabad" },
  { label: "Jaipur", value: "Jaipur" },
  { label: "Lucknow", value: "Lucknow" },
  { label: "Chandigarh", value: "Chandigarh" },
  { label: "Goa", value: "Goa" },
];

export default function MarketplacePage() {
  const [locationQuery, setLocationQuery] = useState("");
  const [date, setDate] = useState("");
  const [searchApplied, setSearchApplied] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchApplied && locationQuery.trim()) params.set("location", locationQuery.trim());

    setLoading(true);
    fetch(`/api/listings?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => setListings(data.listings || []))
      .catch(() => setListings([]))
      .finally(() => setLoading(false));
  }, [locationQuery, searchApplied]);

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
          <ThemedSelect
            options={cities}
            value={locationQuery}
            onChange={(val) => { setLocationQuery(val); if (searchApplied) setSearchApplied(true); }}
            placeholder="Select city"
            icon={<MapPin size={16} className="text-cyan-400" />}
            className="flex-1 sm:max-w-xs"
          />

          <DatePicker
            value={date}
            onChange={(val) => { setDate(val); if (searchApplied) setSearchApplied(true); }}
            className="flex-1 sm:max-w-xs"
          />

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
