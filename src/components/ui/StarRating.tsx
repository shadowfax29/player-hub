import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  className?: string;
  size?: number;
}

// Renders a star icon + numeric rating — used on cards and detail pages
export function StarRating({ rating, className, size = 12 }: StarRatingProps) {
  return (
    <span className={cn("flex items-center gap-1", className)}>
      <Star size={size} className="fill-amber-400 text-amber-400" />
      <span className="text-amber-400 font-semibold text-xs">{rating.toFixed(1)}</span>
    </span>
  );
}
