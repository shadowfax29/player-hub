"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MapPin, Wifi, Users, Monitor, Utensils, Star, BadgeCheck, Clock } from "lucide-react";
import { HomeLayout } from "@/components/layout/HomeLayout";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { listings, reviews } from "@/lib/data";
import { useAuth } from "@/lib/auth-context";

export default function ListingDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const listing = listings.find((l) => l.id === params.id) ?? listings[0];

  const handleConfirmBooking = () => {
    if (!isLoggedIn) {
      router.push("/signup");
      return;
    }
    // Handle actual booking logic here
  };

  return (
    <HomeLayout>
      {/* Full-width hero image */}
      <div className="relative h-72 w-full overflow-hidden pt-20">
        <Image
          src="https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=1400&q=80"
          alt={listing.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f1a] via-[#0d0f1a]/30 to-transparent" />

        {/* Overlay text */}
        <div className="absolute bottom-0 left-0 p-8">
          <Badge variant="purple" className="mb-3 text-[10px] tracking-widest">ELITE STATION</Badge>
          <div className="flex items-center gap-3 mb-2">
            <StarRating rating={4.9} size={14} />
            <span className="text-[#a0aec0] text-xs">(124 reviews)</span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-white tracking-wide">
            NEXUS ALPHA: PRO LEAGUE SUITE
          </h1>
          <p className="text-[#a0aec0] text-sm mt-2 max-w-lg">
            Premium high-performance gaming environment located in the heart of the digital district. Low latency, 4K HDR hardware, and ergonomic comfort.
          </p>
        </div>
      </div>

      {/* Main content + booking sidebar */}
      <div className="flex gap-8 px-8 py-8">
        {/* Left column — specs, games, host, reviews */}
        <div className="flex-1 min-w-0">
          {/* Spec tiles row */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[
              { icon: Monitor, label: "HARDWARE", value: "PS5 Digital" },
              { icon: Users, label: "CAPACITY", value: "4 Players" },
              { icon: Utensils, label: "SNACKS", value: "Unlimited" },
              { icon: Wifi, label: "NETWORK", value: "1 Gbps" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-[#161929] border border-[#1e2235] rounded-xl p-4 text-center">
                <Icon size={20} className="text-cyan-400 mx-auto mb-2" />
                <p className="text-[10px] text-[#6b7280] tracking-widest mb-1">{label}</p>
                <p className="text-sm font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Library highlights */}
          <div className="mb-8">
            <h2 className="font-heading text-xl font-bold text-white mb-4 tracking-wide">
              LIBRARY HIGHLIGHTS
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { title: "God of War Ragnarök", genre: "Action-Adventure", color: "from-blue-900 to-blue-700" },
                { title: "Call of Duty: MW III", genre: "First-Person Shooter", color: "from-gray-900 to-gray-700" },
                { title: "Fortnite: Battle Royale", genre: "Battle Royale", color: "from-purple-900 to-purple-700" },
                { title: "FIFA 24 / FC 24", genre: "Sports Simulator", color: "from-green-900 to-green-700" },
              ].map((game) => (
                <div key={game.title} className="flex items-center gap-3 bg-[#161929] border border-[#1e2235] rounded-lg p-3">
                  <div className={`w-10 h-10 rounded bg-gradient-to-br ${game.color} shrink-0`} />
                  <div>
                    <p className="text-sm font-semibold text-white">{game.title}</p>
                    <p className="text-xs text-cyan-400">{game.genre}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Host section */}
          <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 shrink-0 overflow-hidden relative">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                  alt="Host"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-white text-sm">HOSTED BY MARCUS &apos;VIPER&apos; CHEN</p>
                  <Badge variant="cyan" className="text-[9px] tracking-widest">SUPERHOST</Badge>
                </div>
                <p className="text-[#a0aec0] text-xs leading-relaxed mb-3">
                  Level 50 Gamer and professional stream tech. I built this room to be the ultimate competitive sanctuary. I&apos;m always available to help set up your custom accounts or stream settings.
                </p>
                <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                  <span className="flex items-center gap-1">
                    <BadgeCheck size={12} className="text-cyan-400" /> Identity Verified
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-cyan-400" /> Response time: 5 mins
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-[10px] tracking-widest shrink-0">
                CONTACT HOST
              </Button>
            </div>
          </div>

          {/* Player feedback */}
          <div>
            <h2 className="font-heading text-xl font-bold text-white mb-4 tracking-wide border-l-4 border-purple-500 pl-3">
              PLAYER FEEDBACK
            </h2>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#161929] border border-[#1e2235] rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full ${review.avatarColor} flex items-center justify-center text-xs font-bold text-white`}>
                        {review.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{review.author}</p>
                        <p className="text-[10px] text-[#6b7280] tracking-widest">{review.timeAgo}</p>
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
              ))}
            </div>
          </div>
        </div>

        {/* Right column — booking widget */}
        <div className="w-72 shrink-0">
          <div className="bg-[#161929] border border-[#1e2235] rounded-xl p-5 sticky top-20">
            {/* Price + peak time */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-3xl font-heading font-bold text-white">$45</span>
                <span className="text-[#6b7280] text-sm"> / HOUR</span>
              </div>
              <div className="text-right">
                <p className="text-cyan-400 text-[10px] font-bold tracking-widest">PEAK TIME</p>
                <p className="text-cyan-400 text-xs">⚡ Instant Book</p>
              </div>
            </div>

            {/* Date picker */}
            <div className="mb-3">
              <label className="text-[10px] text-[#6b7280] tracking-widest block mb-1.5">SELECT DATE</label>
              <div className="flex items-center gap-2 bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5">
                <input
                  type="text"
                  defaultValue="05/24/2024"
                  className="bg-transparent text-sm text-white outline-none flex-1"
                />
                <MapPin size={14} className="text-[#6b7280]" />
              </div>
            </div>

            {/* Check-in + duration row */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <label className="text-[10px] text-[#6b7280] tracking-widest block mb-1.5">CHECK-IN</label>
                <select className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white outline-none">
                  <option>18:00</option>
                  <option>19:00</option>
                  <option>20:00</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] text-[#6b7280] tracking-widest block mb-1.5">DURATION</label>
                <select className="w-full bg-[#1a1d2e] border border-[#2a2d45] rounded-lg px-3 py-2.5 text-sm text-white outline-none">
                  <option>2 Hours</option>
                  <option>3 Hours</option>
                  <option>4 Hours</option>
                </select>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 mb-4 border-t border-[#1e2235] pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#a0aec0]">$45 × 3 hours</span>
                <span className="text-white">$135.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0aec0]">Snack Bundle (Premium)</span>
                <span className="text-emerald-400">Free</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#a0aec0]">Service Fee</span>
                <span className="text-white">$12.50</span>
              </div>
              <div className="flex justify-between font-bold border-t border-[#1e2235] pt-2">
                <span className="text-white">TOTAL</span>
                <span className="text-cyan-400 text-lg">$147.50</span>
              </div>
            </div>

            {/* Confirm booking CTA */}
            <Button
              variant="cyan"
              size="lg"
              className="w-full tracking-widest mb-2"
              onClick={handleConfirmBooking}
            >
              {isLoggedIn ? "CONFIRM BOOKING" : "SIGN UP TO BOOK"}
            </Button>
            <p className="text-center text-[10px] text-[#6b7280]">
              {isLoggedIn ? "YOU WON&apos;T BE CHARGED YET" : "Create an account to continue"}
            </p>

            {/* Level up add-ons */}
            <div className="mt-5 border-t border-[#1e2235] pt-4">
              <p className="text-[10px] text-[#6b7280] tracking-widest mb-3">LEVEL UP YOUR SESSION</p>
              {[
                { name: "Pre Streaming Kit", desc: "4K Cam + Ring Light" },
                { name: "Pro Controller (Edge)", desc: "Paddles & Custom Tension" },
              ].map((addon) => (
                <div key={addon.name} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-[#1a1d2e] rounded flex items-center justify-center">
                      <Monitor size={12} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-xs text-white">{addon.name}</p>
                      <p className="text-[10px] text-[#6b7280]">{addon.desc}</p>
                    </div>
                  </div>
                  <input type="checkbox" className="accent-purple-500 w-4 h-4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
