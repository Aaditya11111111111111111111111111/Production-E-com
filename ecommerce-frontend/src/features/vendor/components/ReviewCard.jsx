import { Star } from "lucide-react";

const StarRow = ({ rating }) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={14}
      className={i < rating ? "text-yellow-400" : "text-gray-200"}
      fill={i < rating ? "currentColor" : "none"}
    />
  ));

const ReviewCard = ({ review }) => {
  const { customer, product, rating, comment, date } = review;

  const ratingColors = {
    5: "bg-green-50  border-green-100",
    4: "bg-blue-50   border-blue-100",
    3: "bg-yellow-50 border-yellow-100",
    2: "bg-orange-50 border-orange-100",
    1: "bg-red-50    border-red-100",
  };

  return (
    <div className={`rounded-2xl border p-5 flex flex-col gap-3 ${ratingColors[rating] ?? "bg-white border-gray-100"}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {customer.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{customer.name}</p>
            <p className="text-xs text-gray-400">{product}</p>
          </div>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          <StarRow rating={rating} />
        </div>
      </div>

      {/* Comment */}
      <p className="text-sm text-gray-600 leading-relaxed">"{comment}"</p>

      {/* Footer */}
      <p className="text-xs text-gray-400">{date}</p>
    </div>
  );
};

export default ReviewCard;
