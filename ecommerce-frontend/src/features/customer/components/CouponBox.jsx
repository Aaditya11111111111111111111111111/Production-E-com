import { useState } from "react";
import { Tag } from "lucide-react";
import toast from "react-hot-toast";

// Mock valid coupons
const VALID_COUPONS = {
  SAVE10: 10,
  WELCOME20: 20,
  FLAT50: 50,
};

/**
 * Props: onApply(discountAmount) — called when a valid coupon is applied
 */
const CouponBox = ({ onApply }) => {
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState("");

  const handleApply = () => {
    const upper = code.trim().toUpperCase();
    if (!upper) return;

    if (VALID_COUPONS[upper] !== undefined) {
      const discount = VALID_COUPONS[upper];
      setApplied(upper);
      onApply(discount);
      toast.success(`Coupon "${upper}" applied — $${discount} off!`);
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const handleRemove = () => {
    setApplied("");
    setCode("");
    onApply(0);
    toast("Coupon removed", { icon: "🏷️" });
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-gray-700 flex items-center gap-1">
        <Tag size={15} /> Coupon Code
      </p>

      {applied ? (
        <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-2">
          <span className="text-sm font-semibold text-green-700">
            "{applied}" applied — ${VALID_COUPONS[applied]} off
          </span>
          <button onClick={handleRemove} className="text-xs text-red-500 hover:underline ml-2">
            Remove
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleApply()}
            placeholder="Enter code (e.g. SAVE10)"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400 uppercase tracking-wider"
          />
          <button
            onClick={handleApply}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition"
          >
            Apply
          </button>
        </div>
      )}

      <p className="text-xs text-gray-400">Try: SAVE10, WELCOME20, FLAT50</p>
    </div>
  );
};

export default CouponBox;
