// Core data types used across the PlayHub application

export interface Listing {
  id: string;
  title: string;
  location: string;
  pricePerHour: number;
  rating: number;
  image: string;
  category: "ps5" | "pc" | "vr" | "console" | "arcade" | "streaming" | "racing";
  featuredGames: string[];
  badge?: string;
}

export interface ActiveArray {
  id: string;
  name: string;
  hardware: string;
  pricePerHour: number;
  occupancy?: number;
  bookings?: number;
  status: "online" | "offline" | "maintenance";
  image: string;
}

export interface Review {
  id: string;
  author: string;
  initials: string;
  timeAgo: string;
  rating: number;
  comment: string;
  avatarColor: string;
}

export type NavCategory = "ALL EXPERIENCES" | "PRO PC LOUNGES" | "VR ARENAS" | "CONSOLE PRIVATE ROOMS" | "RETRO ARCADE";
