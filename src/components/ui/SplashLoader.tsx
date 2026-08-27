"use client";

import { useState, useEffect } from "react";

export function SplashLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = prev < 70 ? Math.random() * 12 + 4 : Math.random() * 5 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setFadeOut(true), 200);
      setTimeout(() => onComplete(), 600);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0a0c18] flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div className="mb-10 animate-pulse">
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-widest">
          <span className="text-purple-400">PLAY</span>
          <span className="text-white ml-2">CONSOLE</span>
        </h1>
      </div>

      {/* Progress bar */}
      <div className="w-64 md:w-80">
        <div className="h-1 bg-[#1a1d2e] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #a855f7, #06b6d4)",
            }}
          />
        </div>
        <div className="flex justify-between mt-3">
          <span className="text-[10px] text-[#6b7280] tracking-[0.3em] font-semibold">
            {progress < 100 ? "LOADING" : "READY"}
          </span>
          <span className="text-[10px] text-purple-400 tracking-widest font-bold">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
}
