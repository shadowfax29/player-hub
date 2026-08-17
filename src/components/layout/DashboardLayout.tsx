import { Topnav } from "./Topnav";

interface DashboardLayoutProps {
  children: React.ReactNode;
  showSearch?: boolean;
}

// Wraps dashboard/marketplace/listing pages with just the topnav — no sidebar
export function DashboardLayout({ children, showSearch }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Topnav showSearch={showSearch} />
      <main className="pt-14 min-h-screen">
        {children}
      </main>
    </div>
  );
}
