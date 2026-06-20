import { Star } from "lucide-react";

const RATINGS = [4, 3, 2, 1];

const RatingFilter = ({ selected, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-gray-700 mb-1">Min Rating</p>
      {RATINGS.map((r) => (
        <label key={r} className="flex items-center gap-2 cursor-pointer group">
          <input
            type="radio"
            name="rating"
            checked={selected === r}
            onChange={() => onChange(selected === r ? 0 : r)}
            className="accent-blue-600 w-4 h-4"
          />
          <span className="flex items-center gap-1">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={13}
                className={i < r ? "text-yellow-400" : "text-gray-200"}
                fill={i < r ? "currentColor" : "none"}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">& up</span>
          </span>
        </label>
      ))}
    </div>
  );
};

export default RatingFilter;
