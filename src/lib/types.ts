// Core data types used across the PlayHub application

export interface Listing {
  id: string;
  host_id?: string;
  title: string;
  description?: string;
  location: string;
  address?: string;
  price_per_hour: number;
  rating: number;
  image: string;
  photos?: string[];
  category: "ps5" | "pc" | "vr" | "console" | "arcade" | "streaming" | "racing";
  featuredGames?: string[];
  featured_games?: string[];
  badge?: string;
  hardware?: string;
  console_model?: string;
  tv_size?: string;
  internet_speed?: string;
  available_days?: string[];
  open_time?: string;
  close_time?: string;
  min_booking_hours?: number;
  max_booking_hours?: number;
  status?: string;
  created_at?: string;
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
  listing_id?: string;
  author_id?: string;
  author: string;
  author_name?: string;
  initials?: string;
  timeAgo?: string;
  rating: number;
  comment: string;
  avatarColor?: string;
  created_at?: string;
}

export type NavCategory = "ALL EXPERIENCES" | "PRO PC LOUNGES" | "VR ARENAS" | "CONSOLE PRIVATE ROOMS" | "RETRO ARCADE";
