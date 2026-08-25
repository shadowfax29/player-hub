import { NextRequest, NextResponse } from "next/server";
import { getAdminClient } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const auth = await getAdminClient(request);
  if ("error" in auth) return NextResponse.json({ error: auth.error }, { status: auth.status });
  const supabase = auth.client;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status"); // pending, processed, failed, all

  let query = supabase
    .from("bookings")
    .select(`
      id, booking_date, total_price, hours, status, payment_status, payment_id,
      transfer_id, transfer_status, platform_fee, host_payout, paid_at,
      host_id, guest_id,
      listings!inner(title, location),
      profiles!bookings_host_id_fkey(full_name, email, razorpay_account_id, kyc_status)
    `)
    .eq("payment_status", "paid")
    .order("booking_date", { ascending: false });

  if (status && status !== "all") {
    query = query.eq("transfer_status", status);
  }

  const { data: bookings, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Compute stats
  const totalPlatformFees = bookings?.reduce((sum: number, b: Record<string, unknown>) => sum + ((b.platform_fee as number) || 0), 0) || 0;
  const totalHostPayouts = bookings?.reduce((sum: number, b: Record<string, unknown>) => sum + ((b.host_payout as number) || 0), 0) || 0;
  const pendingPayouts = bookings
    ?.filter((b: Record<string, unknown>) => b.transfer_status === "pending")
    .reduce((sum: number, b: Record<string, unknown>) => sum + ((b.host_payout as number) || 0), 0) || 0;
  const processedPayouts = bookings
    ?.filter((b: Record<string, unknown>) => b.transfer_status === "processed")
    .reduce((sum: number, b: Record<string, unknown>) => sum + ((b.host_payout as number) || 0), 0) || 0;
  const failedTransfers = bookings
    ?.filter((b: Record<string, unknown>) => b.transfer_status === "failed").length || 0;

  // Group by host
  const hostMap = new Map<string, { name: string; email: string; totalEarned: number; totalFees: number; bookings: number; kycStatus: string }>();
  for (const b of (bookings || []) as Record<string, unknown>[]) {
    const hostId = b.host_id as string;
    const profile = b.profiles as Record<string, unknown> | null;
    if (!hostMap.has(hostId)) {
      hostMap.set(hostId, {
        name: (profile?.full_name as string) || "Unknown",
        email: (profile?.email as string) || "",
        totalEarned: 0,
        totalFees: 0,
        bookings: 0,
        kycStatus: (profile?.kyc_status as string) || "pending",
      });
    }
    const host = hostMap.get(hostId)!;
    host.totalEarned += (b.host_payout as number) || 0;
    host.totalFees += (b.platform_fee as number) || 0;
    host.bookings += 1;
  }

  return NextResponse.json({
    stats: {
      totalRevenue: totalPlatformFees + totalHostPayouts,
      platformFees: totalPlatformFees,
      totalHostPayouts,
      pendingPayouts,
      processedPayouts,
      failedTransfers,
      totalBookings: bookings?.length || 0,
    },
    hosts: Array.from(hostMap.entries()).map(([id, h]) => ({ id, ...h })),
    bookings: bookings || [],
  });
}
