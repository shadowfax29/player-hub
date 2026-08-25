"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

interface Dispute {
  id: string;
  reason: string;
  description: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
  reported_by: string;
  against_user: string | null;
  bookings: { total_price: number; booking_date: string } | null;
  reporter: { full_name: string; email: string } | null;
  against: { full_name: string; email: string } | null;
}

const statusColors: Record<string, string> = {
  open: "bg-red-500/10 text-red-400 border-red-500/20",
  investigating: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  resolved: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  dismissed: "bg-slate-500/10 text-slate-400 border-slate-500/20",
};

export default function AdminDisputesPage() {
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [token, setToken] = useState("");
  const [notesId, setNotesId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const fetchDisputes = async (status?: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    const res = await fetch(`/api/admin/disputes?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setDisputes(await res.json());
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
    if (token) fetchDisputes(statusFilter);
  }, [token, statusFilter]);

  const updateDispute = async (id: string, updates: Record<string, unknown>) => {
    const res = await fetch("/api/admin/disputes", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, ...updates }),
    });
    if (res.ok) fetchDisputes(statusFilter);
  };

  const saveNotes = async (id: string) => {
    await updateDispute(id, { admin_notes: notes });
    setNotesId(null);
    setNotes("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-wide">Disputes</h1>
        <p className="text-[#6b7280] text-sm mt-1">Handle user complaints and booking disputes</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["", "open", "investigating", "resolved", "dismissed"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`text-[10px] px-3 py-1.5 rounded-lg font-bold tracking-wide transition-colors ${statusFilter === s ? "bg-purple-600 text-white" : "bg-[#171b27] border border-white/10 text-[#6b7280] hover:text-white"}`}
          >
            {s ? s.toUpperCase() : "ALL"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : disputes.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-12 h-12 mx-auto text-[#2a2d3e] mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-[#6b7280] text-sm">No disputes found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {disputes.map((d) => (
            <div key={d.id} className="bg-[#171b27] border border-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-bold text-sm">{d.reason}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border ${statusColors[d.status] || ""}`}>
                      {d.status.toUpperCase()}
                    </span>
                  </div>
                  {d.description && <p className="text-[#a0aec0] text-xs mt-1">{d.description}</p>}
                  <p className="text-[#6b7280] text-xs mt-1">
                    Reported by: <span className="text-white">{d.reporter?.full_name || d.reporter?.email || "Unknown"}</span>
                    {d.against && <> · Against: <span className="text-white">{d.against.full_name || d.against.email}</span></>}
                  </p>
                    {d.bookings && <p className="text-[#6b7280] text-xs">Booking: {d.bookings.booking_date} · ₹{d.bookings.total_price}</p>}
                  {d.admin_notes && <p className="text-purple-400 text-xs mt-1">Admin notes: {d.admin_notes}</p>}
                </div>
                <span className="text-[#4a4d65] text-xs shrink-0">{new Date(d.created_at).toLocaleDateString()}</span>
              </div>

              {notesId === d.id ? (
                <div className="flex gap-2">
                  <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Admin notes..." className="flex-1 px-3 py-1.5 bg-[#0d0f1a] border border-white/10 rounded text-sm text-white placeholder:text-[#4a4d65] focus:outline-none focus:border-purple-500" />
                  <button onClick={() => saveNotes(d.id)} className="text-[10px] px-3 py-1.5 rounded bg-purple-600 hover:bg-purple-700 text-white font-bold transition-colors">SAVE</button>
                  <button onClick={() => { setNotesId(null); setNotes(""); }} className="text-[10px] px-3 py-1.5 rounded border border-white/10 text-[#6b7280] hover:text-white transition-colors">CANCEL</button>
                </div>
              ) : (
                <div className="flex gap-2 flex-wrap">
                  {d.status === "open" && (
                    <button onClick={() => updateDispute(d.id, { status: "investigating" })} className="text-[10px] px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-700 text-white font-bold tracking-wide transition-colors">INVESTIGATE</button>
                  )}
                  {(d.status === "open" || d.status === "investigating") && (
                    <>
                      <button onClick={() => updateDispute(d.id, { status: "resolved" })} className="text-[10px] px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide transition-colors">RESOLVE</button>
                      <button onClick={() => updateDispute(d.id, { status: "dismissed" })} className="text-[10px] px-3 py-1.5 rounded bg-slate-600 hover:bg-slate-700 text-white font-bold tracking-wide transition-colors">DISMISS</button>
                    </>
                  )}
                  <button onClick={() => { setNotesId(d.id); setNotes(d.admin_notes || ""); }} className="text-[10px] px-3 py-1.5 rounded border border-white/10 text-[#a0aec0] hover:text-white transition-colors">NOTES</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
