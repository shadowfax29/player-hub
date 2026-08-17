import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility to merge Tailwind classes without conflicts — standard shadcn pattern
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
