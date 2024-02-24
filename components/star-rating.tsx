"use client";
import { Star } from "lucide-react";

export default function StarRating({
  starCount = 5,
  rating,
  onChange,
}: {
  starCount: number;
  rating: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex gap-2">
      {new Array(starCount).fill(null).map((val, inx) => (
        <Star
          key={"star-" + inx}
          size={72}
          cursor="pointer"
          stroke="#7E3AF2"
          strokeWidth={1.2}
          className={`opacity-60 hover:stroke-starStroke hover:opacity-100 hover:ease-in hover:scale-125
          ${
            rating && inx < rating
              ? "stroke-starStroke fill-starStroke animate-pulse opacity-100 scale-105"
              : "fill-none"
          }

          `}
          onClick={() => onChange(inx + 1)}
        />
      ))}
    </div>
  );
}
