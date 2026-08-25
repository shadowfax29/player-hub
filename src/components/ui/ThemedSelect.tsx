"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemedSelectOption {
  label: string;
  value: string;
}

interface ThemedSelectProps {
  options: ThemedSelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function ThemedSelect({ options, value, onChange, placeholder = "Select...", icon, className }: ThemedSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 bg-[#161929] border border-[#1e2235] rounded-lg px-4 py-3 text-sm text-left transition-colors hover:border-[#2a2d45] focus:border-cyan-400/50 focus:outline-none"
      >
        {icon && <span className="shrink-0">{icon}</span>}
        <span className={cn("flex-1 truncate", selected ? "text-white" : "text-[#6b7280]")}>
          {selected?.label || placeholder}
        </span>
        <ChevronDown size={14} className={cn("text-[#6b7280] shrink-0 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#161929] border border-[#1e2235] rounded-xl shadow-2xl shadow-black/50 z-50 overflow-hidden max-h-64 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => { onChange(option.value); setOpen(false); }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors",
                option.value === value
                  ? "bg-purple-500/10 text-white"
                  : "text-[#a0aec0] hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="flex-1 truncate">{option.label}</span>
              {option.value === value && <Check size={14} className="text-purple-400 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
