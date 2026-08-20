import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getAuthClient(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const listingId = searchParams.get("listing_id");
  const bookingId = searchParams.get("booking_id");

  if (bookingId) {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("booking_id", bookingId)
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ reviews: data || [] });
  }

  if (!listingId) {
    return NextResponse.json({ error: "listing_id or booking_id required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("listing_id", listingId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reviews: data });
}

export async function POST(request: NextRequest) {
  const auth = getAuthClient(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: { user }, error: authError } = await auth.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();

  // Check for existing review on this booking
  if (body.booking_id) {
    const { data: existing } = await supabase
      .from("reviews")
      .select("id")
      .eq("booking_id", body.booking_id)
      .eq("author_id", user.id)
      .limit(1);
    if (existing && existing.length > 0) {
      return NextResponse.json({ error: "Already reviewed" }, { status: 400 });
    }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data, error } = await auth
    .from("reviews")
    .insert({
      listing_id: body.listing_id || null,
      booking_id: body.booking_id || null,
      host_id: body.host_id || null,
      author_id: user.id,
      author_name: profile?.full_name || user.email || "Anonymous",
      rating: body.rating,
      comment: body.comment,
      target_role: body.target_role || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ review: data }, { status: 201 });
}
