import { NextRequest } from "next/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export async function getAdminClient(request: NextRequest): Promise<{ client: SupabaseClient; userId: string } | { error: string; status: number }> {
  const auth = request.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return { error: "Unauthorized", status: 401 };
  const token = auth.slice(7);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) return { error: "Unauthorized", status: 401 };
  if (user.user_metadata?.role !== "admin") return { error: "Forbidden", status: 403 };

  return { client: supabase, userId: user.id };
}
