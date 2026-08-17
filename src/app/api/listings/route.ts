import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function getAuthUser(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.split(" ")[1];
  return token;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const location = searchParams.get("location");
  const hostId = searchParams.get("host_id");
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");

  let query = supabase
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  // If fetching host's own listings, include all statuses
  if (hostId) {
    query = query.eq("host_id", hostId);
  } else {
    query = query.eq("status", "active");
  }

  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  if (location) {
    query = query.ilike("location", `%${location}%`);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ listings: data });
}

export async function POST(request: NextRequest) {
  const token = getAuthUser(request);
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const auth = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error: authError } = await auth.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { data, error } = await auth
    .from("listings")
    .insert({
      host_id: user.id,
      title: body.title,
      description: body.description,
      category: body.category,
      location: body.location,
      address: body.address,
      price_per_hour: body.price_per_hour,
      image: body.image,
      photos: body.photos || [],
      featured_games: body.featured_games || [],
      badge: body.badge,
      hardware: body.hardware,
      console_model: body.console_model,
      tv_size: body.tv_size,
      internet_speed: body.internet_speed,
      available_days: body.available_days || ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
      open_time: body.open_time || "10:00",
      close_time: body.close_time || "22:00",
      min_booking_hours: body.min_booking_hours || 1,
      max_booking_hours: body.max_booking_hours || 8,
      status: "pending",
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ listing: data }, { status: 201 });
}
