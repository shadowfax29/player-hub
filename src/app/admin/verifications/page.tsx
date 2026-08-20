"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  verified: boolean;
  selfie_url: string | null;
  id_document_url: string | null;
  id_type: string | null;
  created_at: string;
}

export default function AdminVerificationsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchPending = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/users?role=host", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const all = await res.json();
      setUsers(all.filter((u: User) => !u.verified && (u.selfie_url || u.id_document_url)));
    }
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
    if (token) fetchPending();
  }, [token]);

  const verify = async (userId: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: userId, verified: true }),
    });
    if (res.ok) fetchPending();
  };

  const reject = async (userId: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: userId, banned: true, banned_reason: "Verification documents rejected", banned_at: new Date().toISOString() }),
    });
    if (res.ok) fetchPending();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-wide">Verifications</h1>
        <p className="text-[#6b7280] text-sm mt-1">Review government IDs and selfies for host verification</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="text-center py-16">
          <svg className="w-12 h-12 mx-auto text-[#2a2d3e] mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <p className="text-[#6b7280] text-sm">All caught up — no pending verifications.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {users.map((u) => (
            <div key={u.id} className="bg-[#171b27] border border-white/5 rounded-xl overflow-hidden">
              <div className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {u.full_name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">{u.full_name || "Unnamed"}</p>
                  <p className="text-[#6b7280] text-xs">{u.email} · {u.id_type || "ID type unknown"}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => verify(u.id)} className="text-[10px] px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold tracking-wide transition-colors">VERIFY</button>
                  <button onClick={() => reject(u.id)} className="text-[10px] px-3 py-1.5 rounded bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide transition-colors">REJECT</button>
                  <button onClick={() => setExpanded(expanded === u.id ? null : u.id)} className="text-[10px] px-3 py-1.5 rounded border border-white/10 text-[#a0aec0] hover:text-white transition-colors">
                    {expanded === u.id ? "HIDE" : "VIEW DOCS"}
                  </button>
                </div>
              </div>
              {expanded === u.id && (
                <div className="border-t border-white/5 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {u.id_document_url ? (
                    <div>
                      <p className="text-[10px] text-[#6b7280] tracking-widest uppercase mb-2">Government ID</p>
                      <img src={u.id_document_url} alt="Government ID" className="w-full rounded-lg border border-white/10 max-h-80 object-contain bg-black" />
                    </div>
                  ) : (
                    <div className="rounded-lg border border-white/10 bg-[#0d0f1a] p-8 text-center">
                      <p className="text-[#4a4d65] text-sm">No ID document uploaded</p>
                    </div>
                  )}
                  {u.selfie_url ? (
                    <div>
                      <p className="text-[10px] text-[#6b7280] tracking-widest uppercase mb-2">Selfie</p>
                      <img src={u.selfie_url} alt="Selfie" className="w-full rounded-lg border border-white/10 max-h-80 object-contain bg-black" />
                    </div>
                  ) : (
                    <div className="rounded-lg border border-white/10 bg-[#0d0f1a] p-8 text-center">
                      <p className="text-[#4a4d65] text-sm">No selfie uploaded</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
