"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

interface Listing {
  id: string;
  title: string;
  location: string;
  category: string;
  price_per_hour: number;
  status: string;
  approved: boolean;
  rejection_reason: string | null;
  image: string | null;
  created_at: string;
  profiles: { full_name: string; email: string } | null;
}

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [approvedFilter, setApprovedFilter] = useState("");
  const [token, setToken] = useState("");

  const fetchListings = async (q?: string, status?: string, approved?: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("search", q);
    if (status) params.set("status", status);
    if (approved) params.set("approved", approved);
    const res = await fetch(`/api/admin/listings?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setListings(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await getSupabase().auth.getSession();
      if (session) setToken(session.access_token);
    };
    init();
  }, []);

  useEffect(() => {
    if (token) fetchListings(search, statusFilter, approvedFilter);
  }, [token, statusFilter, approvedFilter]);

  const handleSearch = () => fetchListings(search, statusFilter, approvedFilter);

  const updateListing = async (id: string, updates: Record<string, unknown>) => {
    const res = await fetch("/api/admin/listings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, ...updates }),
    });
    if (res.ok) fetchListings(search, statusFilter, approvedFilter);
  };

  const approve = (id: string) => updateListing(id, { approved: true, approved_at: new Date().toISOString() });
  const reject = (id: string) => {
    const reason = prompt("Rejection reason:");
    if (reason) updateListing(id, { approved: false, status: "inactive", rejection_reason: reason });
  };
  const toggleActive = (listing: Listing) => updateListing(listing.id, { status: listing.status === "active" ? "inactive" : "active" });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-wide">Listings</h1>
        <p className="text-[#6b7280] text-sm mt-1">Review and manage gaming location listings</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search title or location..."
          className="flex-1 px-4 py-2.5 bg-[#171b27] border border-white/10 rounded-lg text-sm text-white placeholder:text-[#4a4d65] focus:outline-none focus:border-purple-500"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 bg-[#171b27] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="inactive">Inactive</option>
        </select>
        <select value={approvedFilter} onChange={(e) => setApprovedFilter(e.target.value)} className="px-4 py-2.5 bg-[#171b27] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500">
          <option value="">All</option>
          <option value="false">Needs Approval</option>
          <option value="true">Approved</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-3">
          {listings.map((l) => (
            <div key={l.id} className="bg-[#171b27] border border-white/5 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4">
              {l.image && <img src={l.image} alt="" className="w-full md:w-20 h-20 object-cover rounded-lg" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-white font-bold text-sm truncate">{l.title}</h3>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border ${l.status === "active" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : l.status === "pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-slate-500/10 text-slate-400 border-slate-500/20"}`}>
                    {l.status.toUpperCase()}
                  </span>
                  {!l.approved && <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">NEEDS APPROVAL</span>}
                </div>
                <p className="text-[#6b7280] text-xs mt-1">{l.location} · ${l.price_per_hour}/hr · {l.category} · by {l.profiles?.full_name || l.profiles?.email || "Unknown"}</p>
                {l.rejection_reason && <p className="text-red-400 text-xs mt-1">Rejected: {l.rejection_reason}</p>}
              </div>
              <div className="flex gap-2 shrink-0">
                {!l.approved && (
                  <>
                    <button onClick={() => approve(l.id)} className="text-[10px] px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide transition-colors">APPROVE</button>
                    <button onClick={() => reject(l.id)} className="text-[10px] px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide transition-colors">REJECT</button>
                  </>
                )}
                <button onClick={() => toggleActive(l)} className="text-[10px] px-3 py-1.5 rounded border border-white/10 text-[#a0aec0] hover:text-white hover:bg-white/5 transition-colors">
                  {l.status === "active" ? "DEACTIVATE" : "ACTIVATE"}
                </button>
              </div>
            </div>
          ))}
          {listings.length === 0 && <p className="text-center text-[#6b7280] py-12 text-sm">No listings found.</p>}
        </div>
      )}
    </div>
  );
}
