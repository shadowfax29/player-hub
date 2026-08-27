"use client";

import { useState, useEffect } from "react";
import { SplashLoader } from "@/components/ui/SplashLoader";

export function SplashWrapper({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const seen = sessionStorage.getItem("playconsole-splash-seen");
    if (seen) {
      setShowSplash(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("playconsole-splash-seen", "1");
    setShowSplash(false);
  };

  if (!mounted) return null;

  return (
    <>
      {showSplash && <SplashLoader onComplete={handleComplete} />}
      <div className={showSplash ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        {children}
      </div>
    </>
  );
}
