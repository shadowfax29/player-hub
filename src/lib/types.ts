// Core data types used across the PlayConsole application

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

export interface Profile {
  id: string;
  full_name?: string;
  email?: string;
  role?: string;
  razorpay_account_id?: string;
  bank_account_number?: string;
  bank_ifsc?: string;
  bank_holder_name?: string;
  pan_number?: string;
  kyc_status?: "pending" | "submitted" | "activated" | "needs_clarification";
  platform_fee_percent?: number;
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

export interface Booking {
  id: string;
  listing_id?: string;
  guest_id?: string;
  host_id?: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  hours: number;
  total_price: number;
  status: string;
  payment_id?: string;
  payment_order_id?: string;
  payment_status?: string;
  payment_method?: string;
  paid_at?: string;
  transfer_id?: string;
  transfer_status?: "not_started" | "pending" | "processed" | "failed";
  platform_fee?: number;
  host_payout?: number;
  session_started_at?: string | null;
  session_ends_at?: string | null;
  session_active?: boolean;
  host_confirmed_end?: boolean;
  guest_confirmed_end?: boolean;
  host_wants_continue?: boolean;
  guest_wants_continue?: boolean;
  continue_notes?: string | null;
  listings?: { title: string; image: string; location: string } | null;
}

export type NavCategory = "ALL EXPERIENCES" | "PRO PC LOUNGES" | "VR ARENAS" | "CONSOLE PRIVATE ROOMS" | "RETRO ARCADE";
