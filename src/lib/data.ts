import type { Listing, ActiveArray, Review } from "./types";

// Mock marketplace listings — mirrors the Figma card data
export const listings: Listing[] = [
  {
    id: "1",
    title: "PS5 Elite Gaming Room",
    location: "Shibuya, Tokyo",
    price_per_hour: 12,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80",
    category: "ps5",
    featured_games: ["Spider-Man 2", "FC 24", "+5 more"],
  },
  {
    id: "2",
    title: "Cyber Nexus Pro PC",
    location: "Gangnam, Seoul",
    price_per_hour: 15,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
    category: "pc",
    featured_games: ["Valorant", "League of Legends", "+12 more"],
  },
  {
    id: "3",
    title: "Neon VR Arena",
    location: "Berlin, Mitte",
    price_per_hour: 25,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=600&q=80",
    category: "vr",
    featured_games: ["Half-Life: Alyx", "Beat Saber", "Superhot VR"],
  },
  {
    id: "4",
    title: "The Vault Retro Lounge",
    location: "Brooklyn, NY",
    price_per_hour: 8,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
    category: "arcade",
    featured_games: ["Pac-Man", "Street Fighter II", "+20 more"],
  },
  {
    id: "5",
    title: "Velocity Sim Racing",
    location: "London, Soho",
    price_per_hour: 20,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "console",
    featured_games: ["iRacing", "F1 23", "Assetto Corsa"],
  },
  {
    id: "6",
    title: "Zenith Streamer Pod",
    location: "San Francisco, CA",
    price_per_hour: 18,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&q=80",
    category: "streaming",
    featured_games: ["Fortnite", "Warzone", "Twitch Tools"],
  },
];

// Host dashboard active arrays (right panel)
export const activeArrays: ActiveArray[] = [
  {
    id: "1",
    name: "NEO-TOKYO LOFT",
    hardware: "PlayStation 5 Pro • 4K OLED",
    pricePerHour: 35,
    occupancy: 85,
    status: "online",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=200&q=80",
  },
  {
    id: "2",
    name: "MINIMALIST ZEN",
    hardware: "Nintendo Switch • Projector",
    pricePerHour: 15,
    status: "maintenance",
    image: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?w=200&q=80",
  },
  {
    id: "3",
    name: "RETRO VAULT",
    hardware: "Custom PC • CRT Filter",
    pricePerHour: 22,
    bookings: 12,
    status: "online",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=200&q=80",
  },
];

// Listing detail page reviews
export const reviews: Review[] = [
  {
    id: "1",
    author: "Alex Johnson",
    initials: "AJ",
    timeAgo: "3 DAYS AGO",
    rating: 5,
    comment: '"Absolutely mental setup! The OLED screen response time is incredible. Perfect for our local FIFA tournament."',
    avatarColor: "bg-purple-600",
  },
  {
    id: "2",
    author: "Sarah Lee",
    initials: "SL",
    timeAgo: "1 WEEK AGO",
    rating: 5,
    comment: '"Great vibe and the snacks selection was top notch. Had some minor lag on one game but Marcus fixed it instantly. Will be back!"',
    avatarColor: "bg-teal-600",
  },
];
