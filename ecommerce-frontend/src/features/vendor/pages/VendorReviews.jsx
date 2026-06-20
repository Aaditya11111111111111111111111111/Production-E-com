import { useState, useMemo } from "react";
import { Star } from "lucide-react";
import { REVIEWS } from "@/mock/reviews";
import ReviewCard from "../components/ReviewCard";

const RATING_OPTIONS = [0, 5, 4, 3, 2, 1];

function VendorReviews() {
  const [filter, setFilter] = useState(0); // 0 = All

  const filtered = useMemo(
    () => (filter === 0 ? REVIEWS : REVIEWS.filter((r) => r.rating === filter)),
    [filter]
  );

  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  const countByRating = (r) => REVIEWS.filter((rv) => rv.rating === r).length;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reviews</h1>
          <p className="text-sm text-gray-500 mt-0.5">{REVIEWS.length} total reviews · avg {avgRating} ⭐</p>
        </div>

        {/* Rating distribution mini-bar */}
        <div className="flex flex-col gap-1 text-xs text-gray-500 min-w-[160px]">
          {[5,4,3,2,1].map((r) => {
            const pct = Math.round((countByRating(r) / REVIEWS.length) * 100);
            return (
              <div key={r} className="flex items-center gap-2">
                <span className="w-4 text-right">{r}★</span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6">{countByRating(r)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {RATING_OPTIONS.map((r) => (
          <button
            key={r}
            onClick={() => setFilter(r)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              filter === r
                ? "bg-yellow-400 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {r === 0 ? (
              "All"
            ) : (
              <>
                {r}
                <Star size={11} fill="currentColor" />
                <span className="opacity-70">({countByRating(r)})</span>
              </>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">⭐</p>
          <p className="font-semibold">No reviews found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VendorReviews;
