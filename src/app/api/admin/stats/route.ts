import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const auth = await getAdminClient(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const supabase = auth.client;

  const [usersRes, listingsRes, bookingsRes, reviewsRes, disputesRes] = await Promise.all([
    supabase.from("profiles").select("id, role, verified, banned", { count: "exact" }),
    supabase.from("listings").select("id, status, approved", { count: "exact" }),
    supabase.from("bookings").select("id, status, total_price", { count: "exact" }),
    supabase.from("reviews").select("id, rating", { count: "exact" }),
    supabase.from("disputes").select("id, status", { count: "exact" }),
  ]);

  const users = usersRes.data || [];
  const listings = listingsRes.data || [];
  const bookings = bookingsRes.data || [];
  const reviews = reviewsRes.data || [];
  const disputes = disputesRes.data || [];

  const totalRevenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + (Number(b.total_price) || 0), 0);

  return NextResponse.json({
    users: {
      total: usersRes.count || 0,
      hosts: users.filter((u) => u.role === "host").length,
      guests: users.filter((u) => u.role === "guest").length,
      verified: users.filter((u) => u.verified).length,
      banned: users.filter((u) => u.banned).length,
    },
    listings: {
      total: listingsRes.count || 0,
      active: listings.filter((l) => l.status === "active").length,
      pending: listings.filter((l) => l.status === "pending").length,
      inactive: listings.filter((l) => l.status === "inactive").length,
      needsApproval: listings.filter((l) => !l.approved).length,
    },
    bookings: {
      total: bookingsRes.count || 0,
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
      totalRevenue,
    },
    reviews: {
      total: reviewsRes.count || 0,
      avgRating: reviews.length > 0 ? (reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length).toFixed(1) : "0",
    },
    disputes: {
      total: disputesRes.count || 0,
      open: disputes.filter((d) => d.status === "open").length,
      investigating: disputes.filter((d) => d.status === "investigating").length,
      resolved: disputes.filter((d) => d.status === "resolved").length,
    },
  });
}
