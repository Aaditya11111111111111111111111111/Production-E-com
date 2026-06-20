import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

/**
 * Props: subtotal, couponDiscount
 */
const CartSummary = ({ subtotal, couponDiscount = 0 }) => {
  const navigate = useNavigate();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discountedSubtotal = Math.max(subtotal - couponDiscount, 0);
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + shipping + tax;

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4 sticky top-24">
      <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {couponDiscount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Coupon Discount</span>
            <span>− ${couponDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-600 font-medium">Free</span>
          ) : (
            <span>${shipping.toFixed(2)}</span>
          )}
        </div>

        {shipping > 0 && (
          <p className="text-xs text-blue-500">
            Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping
          </p>
        )}

        <div className="flex justify-between text-gray-600">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <hr className="border-gray-100" />

      <div className="flex justify-between font-bold text-gray-900 text-base">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <button
        onClick={() => navigate(ROUTES.CUSTOMER_CHECKOUT)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
      >
        Proceed to Checkout
      </button>

      <button
        onClick={() => navigate(ROUTES.CUSTOMER_PRODUCTS)}
        className="w-full border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-2.5 rounded-xl transition text-sm"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default CartSummary;
