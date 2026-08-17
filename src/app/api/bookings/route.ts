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
  const auth = getAuthClient(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: { user }, error: authError } = await auth.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role"); // "guest" or "host"

  let query = auth
    .from("bookings")
    .select("*, listings(title, image, location)")
    .order("created_at", { ascending: false });

  if (role === "host") {
    query = query.eq("host_id", user.id);
  } else {
    query = query.eq("guest_id", user.id);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ bookings: data });
}

export async function POST(request: NextRequest) {
  const auth = getAuthClient(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: { user }, error: authError } = await auth.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  // Fetch listing to get host_id and price
  const { data: listing, error: listingError } = await supabase
    .from("listings")
    .select("host_id, price_per_hour")
    .eq("id", body.listing_id)
    .single();

  if (listingError || !listing) {
    return NextResponse.json({ error: "Listing not found" }, { status: 404 });
  }

  if (listing.host_id === user.id) {
    return NextResponse.json({ error: "Cannot book your own listing" }, { status: 400 });
  }

  const { data, error } = await auth
    .from("bookings")
    .insert({
      listing_id: body.listing_id,
      guest_id: user.id,
      host_id: listing.host_id,
      booking_date: body.booking_date,
      start_time: body.start_time,
      end_time: body.end_time,
      hours: body.hours,
      total_price: listing.price_per_hour * body.hours,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ booking: data }, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const auth = getAuthClient(request);
  if (!auth) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: { user }, error: authError } = await auth.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json({ error: "Booking ID required" }, { status: 400 });
  }

  const { data, error } = await auth
    .from("bookings")
    .update(updates)
    .eq("id", id)
    .or(`guest_id.eq.${user.id},host_id.eq.${user.id}`)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ booking: data });
}
