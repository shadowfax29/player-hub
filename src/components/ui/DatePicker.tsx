"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export function DatePicker({ value, onChange, placeholder = "Pick a date", className }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const today = new Date();
  const parsed = value ? new Date(value + "T00:00:00") : null;
  const [viewMonth, setViewMonth] = useState(parsed ? parsed.getMonth() : today.getMonth());
  const [viewYear, setViewYear] = useState(parsed ? parsed.getFullYear() : today.getFullYear());

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (open && parsed) {
      setViewMonth(parsed.getMonth());
      setViewYear(parsed.getFullYear());
    }
  }, [open, parsed]);

  const displayText = parsed
    ? `${MONTHS[parsed.getMonth()]} ${parsed.getDate()}, ${parsed.getFullYear()}`
    : null;

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const todayStr = formatDate(today.getFullYear(), today.getMonth(), today.getDate());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else { setViewMonth(viewMonth - 1); }
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else { setViewMonth(viewMonth + 1); }
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 bg-[#161929] border border-[#1e2235] rounded-lg px-4 py-3 text-sm text-left transition-colors hover:border-[#2a2d45] focus:border-cyan-400/50 focus:outline-none"
      >
        <Calendar size={16} className="text-cyan-400 shrink-0" />
        <span className={cn("flex-1 truncate", displayText ? "text-white" : "text-[#6b7280]")}>
          {displayText || placeholder}
        </span>
        {value && (
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onChange(""); setOpen(false); }}
            className="text-[#6b7280] hover:text-white transition-colors text-xs"
          >
            Clear
          </button>
        )}
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#161929] border border-[#1e2235] rounded-xl shadow-2xl shadow-black/50 z-50 p-3 w-72">
          {/* Month/Year navigation */}
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6b7280] hover:text-white hover:bg-white/5 transition-colors">
              <ChevronLeft size={14} />
            </button>
            <span className="text-xs font-bold text-white tracking-widest">
              {MONTHS[viewMonth].toUpperCase()} {viewYear}
            </span>
            <button type="button" onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg text-[#6b7280] hover:text-white hover:bg-white/5 transition-colors">
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-0.5 mb-1">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-[9px] text-[#6b7280] tracking-widest font-semibold py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = formatDate(viewYear, viewMonth, day);
              const isSelected = dateStr === value;
              const isToday = dateStr === todayStr;
              const isPast = new Date(dateStr + "T00:00:00") < new Date(todayStr + "T00:00:00");

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => { onChange(dateStr); setOpen(false); }}
                  disabled={isPast}
                  className={cn(
                    "w-full aspect-square flex items-center justify-center rounded-lg text-xs font-medium transition-all",
                    isPast && "text-[#3a3d55] cursor-not-allowed",
                    !isPast && !isSelected && "text-[#a0aec0] hover:bg-white/5 hover:text-white",
                    isSelected && "bg-purple-600 text-white font-bold",
                    isToday && !isSelected && "border border-cyan-500/50 text-cyan-400"
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick actions */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-[#1e2235]">
            <button
              type="button"
              onClick={() => { onChange(todayStr); setOpen(false); }}
              className="flex-1 text-[10px] tracking-widest text-cyan-400 hover:text-cyan-300 py-1.5 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/5 transition-colors font-semibold"
            >
              TODAY
            </button>
            <button
              type="button"
              onClick={() => {
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                onChange(formatDate(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()));
                setOpen(false);
              }}
              className="flex-1 text-[10px] tracking-widest text-purple-400 hover:text-purple-300 py-1.5 rounded-lg border border-purple-500/20 hover:bg-purple-500/5 transition-colors font-semibold"
            >
              TOMORROW
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
