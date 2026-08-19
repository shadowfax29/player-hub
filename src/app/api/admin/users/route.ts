import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function requireAdmin(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return { error: "Unauthorized", status: 401 };
  const token = auth.slice(7);
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return { error: "Unauthorized", status: 401 };
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return { error: "Forbidden", status: 403 };
  return { user };
}

// GET /api/admin/users
export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const search = searchParams.get("search");
  const banned = searchParams.get("banned");

  let query = supabase.from("profiles").select("*").order("created_at", { ascending: false });

  if (role) query = query.eq("role", role);
  if (banned === "true") query = query.eq("banned", true);
  if (banned === "false") query = query.eq("banned", false);
  if (search) query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// PATCH /api/admin/users
export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });

  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "User id required" }, { status: 400 });

  const allowed = ["role", "verified", "banned", "banned_reason", "banned_at"];
  const safeUpdates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in updates) safeUpdates[key] = updates[key];
  }

  const { data, error } = await supabase.from("profiles").update(safeUpdates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
