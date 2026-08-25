import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "PlayConsole — Find. Book. Play.",
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
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
