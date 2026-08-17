import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "PlayHub — Find. Book. Play.",
  description: "Discover and book premium gaming setups, high-end PC lounges, and immersive console rooms across the global network.",
};

// Root layout — applies global styles and font imports via CSS
// No font wrappers needed since we load via @import in globals.css
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0d0f1a] text-white antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
