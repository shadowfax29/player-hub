"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";

interface User {
  id: string;
  full_name: string;
  email: string;
  role: string;
  verified: boolean;
  banned: boolean;
  banned_reason: string | null;
  selfie_url: string | null;
  id_document_url: string | null;
  created_at: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [token, setToken] = useState("");

  const fetchUsers = async (q?: string, role?: string) => {
    setLoading(true);
    const params = new URLSearchParams();
    if (q) params.set("search", q);
    if (role) params.set("role", role);
    const res = await fetch(`/api/admin/users?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) setUsers(await res.json());
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
    if (token) fetchUsers(search, roleFilter);
  }, [token, roleFilter]);

  const handleSearch = () => fetchUsers(search, roleFilter);

  const toggleBan = async (user: User) => {
    const newBanned = !user.banned;
    const reason = newBanned ? prompt("Reason for ban:") : null;
    if (newBanned && !reason) return;
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: user.id, banned: newBanned, banned_reason: reason, banned_at: newBanned ? new Date().toISOString() : null }),
    });
    if (res.ok) fetchUsers(search, roleFilter);
  };

  const toggleVerify = async (user: User) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: user.id, verified: !user.verified }),
    });
    if (res.ok) fetchUsers(search, roleFilter);
  };

  const promoteAdmin = async (user: User) => {
    if (!confirm(`Promote ${user.full_name || user.email} to admin?`)) return;
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: user.id, role: "admin" }),
    });
    if (res.ok) fetchUsers(search, roleFilter);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-wide">Users</h1>
        <p className="text-[#6b7280] text-sm mt-1">Manage platform users</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search name or email..."
          className="flex-1 px-4 py-2.5 bg-[#171b27] border border-white/10 rounded-lg text-sm text-white placeholder:text-[#4a4d65] focus:outline-none focus:border-purple-500"
        />
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="px-4 py-2.5 bg-[#171b27] border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-purple-500"
        >
          <option value="">All Roles</option>
          <option value="guest">Guests</option>
          <option value="host">Hosts</option>
          <option value="admin">Admins</option>
        </select>
        <button onClick={handleSearch} className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg font-bold tracking-wide transition-colors">
          SEARCH
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left py-3 px-4 text-[10px] text-[#6b7280] tracking-widest uppercase">User</th>
                <th className="text-left py-3 px-4 text-[10px] text-[#6b7280] tracking-widest uppercase hidden md:table-cell">Role</th>
                <th className="text-left py-3 px-4 text-[10px] text-[#6b7280] tracking-widest uppercase hidden md:table-cell">Status</th>
                <th className="text-left py-3 px-4 text-[10px] text-[#6b7280] tracking-widest uppercase hidden lg:table-cell">Joined</th>
                <th className="text-right py-3 px-4 text-[10px] text-[#6b7280] tracking-widest uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        {u.full_name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white truncate">{u.full_name || "Unnamed"}</p>
                        <p className="text-[#6b7280] text-xs truncate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className={`text-xs font-bold uppercase tracking-wider ${u.role === "admin" ? "text-purple-400" : u.role === "host" ? "text-cyan-400" : "text-[#6b7280]"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="flex gap-2">
                      {u.verified && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">VERIFIED</span>}
                      {u.banned && <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">BANNED</span>}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-[#6b7280] text-xs hidden lg:table-cell">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => toggleVerify(u)} className={`text-[10px] px-2 py-1 rounded border transition-colors ${u.verified ? "border-amber-500/30 text-amber-400 hover:bg-amber-500/10" : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"}`}>
                        {u.verified ? "UNVERIFY" : "VERIFY"}
                      </button>
                      <button onClick={() => toggleBan(u)} className={`text-[10px] px-2 py-1 rounded border transition-colors ${u.banned ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10" : "border-red-500/30 text-red-400 hover:bg-red-500/10"}`}>
                        {u.banned ? "UNBAN" : "BAN"}
                      </button>
                      {u.role !== "admin" && (
                        <button onClick={() => promoteAdmin(u)} className="text-[10px] px-2 py-1 rounded border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition-colors">
                          PROMOTE
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && <p className="text-center text-[#6b7280] py-12 text-sm">No users found.</p>}
        </div>
      )}
    </div>
  );
}
