import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const BUFFER_MINUTES = 10;

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

// POST /api/bookings/session — start, confirm-end, continue, or end session
export async function POST(request: NextRequest) {
  const auth = getAuthClient(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: { user }, error: authError } = await auth.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const { action, booking_id, notes } = body;
  if (!action || !booking_id) return NextResponse.json({ error: "action and booking_id required" }, { status: 400 });

  // Fetch booking
  const { data: booking, error: bookingError } = await auth
    .from("bookings")
    .select("*")
    .eq("id", booking_id)
    .single();

  if (bookingError || !booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

  const isHost = booking.host_id === user.id;
  const isGuest = booking.guest_id === user.id;
  if (!isHost && !isGuest) return NextResponse.json({ error: "Not your booking" }, { status: 403 });

  const now = new Date().toISOString();

  switch (action) {
    case "start_session": {
      if (!isHost) return NextResponse.json({ error: "Only host can start session" }, { status: 403 });
      if (booking.status !== "confirmed") return NextResponse.json({ error: "Booking must be confirmed" }, { status: 400 });

      const endsAt = new Date(Date.now() + (booking.hours * 60 * 60 * 1000) + (BUFFER_MINUTES * 60 * 1000)).toISOString();

      const { data, error } = await auth
        .from("bookings")
        .update({
          status: "active",
          session_started_at: now,
          session_ends_at: endsAt,
          session_active: true,
          host_confirmed_end: false,
          guest_confirmed_end: false,
        })
        .eq("id", booking_id)
        .select()
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ booking: data });
    }

    case "confirm_end": {
      if (booking.status !== "active" && booking.status !== "awaiting_confirmation")
        return NextResponse.json({ error: "Session not in confirmable state" }, { status: 400 });

      const update: Record<string, unknown> = {};
      if (isHost) update.host_confirmed_end = true;
      if (isGuest) update.guest_confirmed_end = true;

      // Check if both will have confirmed after this update
      const bothConfirmed = (isHost && booking.guest_confirmed_end) || (isGuest && booking.host_confirmed_end);

      if (bothConfirmed) {
        update.status = "awaiting_continue";
        update.session_ended_at = now;
        update.session_active = false;
      } else {
        update.status = "awaiting_confirmation";
      }

      const { data, error } = await auth
        .from("bookings")
        .update(update)
        .eq("id", booking_id)
        .select()
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ booking: data });
    }

    case "continue_session": {
      if (booking.status !== "awaiting_continue")
        return NextResponse.json({ error: "Not in continue phase" }, { status: 400 });

      const update: Record<string, unknown> = {};
      if (isHost) update.host_wants_continue = true;
      if (isGuest) update.guest_wants_continue = true;
      if (notes) update.continue_notes = notes;

      // Both want to continue → restart session
      const bothContinue = (isHost && booking.guest_wants_continue) || (isGuest && booking.host_wants_continue);

      if (bothContinue) {
        const newHours = booking.hours + 1;
        const endsAt = new Date(Date.now() + (newHours * 60 * 60 * 1000) + (BUFFER_MINUTES * 60 * 1000)).toISOString();
        update.status = "active";
        update.hours = newHours;
        update.total_price = (booking.total_price / booking.hours) * newHours;
        update.session_started_at = now;
        update.session_ends_at = endsAt;
        update.session_active = true;
        update.host_confirmed_end = false;
        update.guest_confirmed_end = false;
        update.host_wants_continue = false;
        update.guest_wants_continue = false;
      } else {
        update.status = "awaiting_continue";
      }

      const { data, error } = await auth
        .from("bookings")
        .update(update)
        .eq("id", booking_id)
        .select()
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ booking: data });
    }

    case "decline_continue": {
      if (booking.status !== "awaiting_continue")
        return NextResponse.json({ error: "Not in continue phase" }, { status: 400 });

      const { data, error } = await auth
        .from("bookings")
        .update({
          status: "completed",
          session_active: false,
          session_ended_at: now,
          host_wants_continue: false,
          guest_wants_continue: false,
        })
        .eq("id", booking_id)
        .select()
        .single();

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      return NextResponse.json({ booking: data });
    }

    default:
      return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
}

// GET /api/bookings/session?booking_id=... — fetch booking with session state
export async function GET(request: NextRequest) {
  const auth = getAuthClient(request);
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: { user }, error: authError } = await auth.auth.getUser();
  if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get("booking_id");
  if (!bookingId) return NextResponse.json({ error: "booking_id required" }, { status: 400 });

  const { data, error } = await auth
    .from("bookings")
    .select("*, listings(title, image, location)")
    .eq("id", bookingId)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ booking: data });
}
