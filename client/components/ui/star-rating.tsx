import { Star } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasPartial = rating % 1 !== 0;
  const partialPercent = (rating % 1) * 100;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="relative">
            {/* Empty star background */}
            <Star size={20} className="text-gray-300" />

            {/* Filled star overlay */}
            {i <= fullStars ? (
              <div className="absolute inset-0">
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
              </div>
            ) : i === fullStars + 1 && hasPartial ? (
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${partialPercent}%` }}
              >
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
              </div>
            ) : null}
          </div>
        ))}
      </div>
      
    </div>
  );
}
