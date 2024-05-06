'use client';

import { Star } from 'lucide-react';

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
          key={'star-' + inx}
          size={72}
          cursor="pointer"
          stroke="#7E3AF2"
          strokeWidth={1.2}
          className={`opacity-60 hover:scale-125 hover:stroke-custom-12 hover:opacity-100 hover:ease-in
          ${
            rating && inx < rating
              ? 'scale-105 animate-pulse fill-custom-12 stroke-custom-12 opacity-100'
              : 'fill-none'
          }

          `}
          onClick={() => onChange(inx + 1)}
        />
      ))}
    </div>
  );
}
