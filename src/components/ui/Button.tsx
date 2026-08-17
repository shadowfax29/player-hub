import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cyan";
  size?: "sm" | "md" | "lg";
}

// Core button component with PlayConsole's purple gradient and outline variants
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold rounded transition-all duration-200 cursor-pointer",
          // Size variants
          {
            "px-3 py-1.5 text-xs": size === "sm",
            "px-4 py-2 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
          },
          // Color variants
          {
            // Purple gradient — primary CTA
            "bg-gradient-to-r from-purple-700 to-purple-500 text-white hover:from-purple-600 hover:to-purple-400 shadow-lg shadow-purple-900/30":
              variant === "primary",
            // Dark filled — secondary actions
            "bg-[#1e2235] text-white hover:bg-[#252840] border border-[#2a2d45]":
              variant === "secondary",
            // Transparent with border
            "border border-[#2a2d45] text-white hover:border-purple-500 bg-transparent":
              variant === "outline",
            // No background
            "text-[#a0aec0] hover:text-white bg-transparent":
              variant === "ghost",
            // Cyan accent — explore button
            "bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:opacity-90":
              variant === "cyan",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
