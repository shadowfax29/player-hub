import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "cyan" | "purple" | "outline";
  className?: string;
}

// Reusable badge chip — used for game tags, category filters, and status labels
export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium",
        {
          "bg-[#1e2235] text-[#a0aec0]": variant === "default",
          "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30": variant === "cyan",
          "bg-purple-600 text-white": variant === "purple",
          "border border-[#2a2d45] text-[#a0aec0]": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
