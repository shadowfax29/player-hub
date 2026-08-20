import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const auth = await getAdminClient(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const supabase = auth.client;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const approved = searchParams.get("approved");
  const search = searchParams.get("search");

  let query = supabase.from("listings").select("*, profiles!listings_host_id_fkey(full_name, email)").order("created_at", { ascending: false });

  if (status) query = query.eq("status", status);
  if (approved === "true") query = query.eq("approved", true);
  if (approved === "false") query = query.eq("approved", false);
  if (search) query = query.or(`title.ilike.%${search}%,location.ilike.%${search}%`);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest) {
  const auth = await getAdminClient(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const supabase = auth.client;

  const body = await request.json();
  const { id, ...updates } = body;
  if (!id) return NextResponse.json({ error: "Listing id required" }, { status: 400 });

  const allowed = ["status", "approved", "approved_by", "approved_at", "rejection_reason"];
  const safeUpdates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in updates) safeUpdates[key] = updates[key];
  }

  const { data, error } = await supabase.from("listings").update(safeUpdates).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
