import { Link } from "react-router-dom";

const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 5.99;

/**
 * Props: items[], couponDiscount
 */
const OrderSummary = ({ items = [], couponDiscount = 0 }) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discounted = Math.max(subtotal - couponDiscount, 0);
  const tax = discounted * TAX_RATE;
  const total = discounted + shipping + tax;

  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4">
      <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>

      {/* Items */}
      <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-50 border shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-800 line-clamp-1">{item.name}</p>
              <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-800 shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <hr className="border-gray-100" />

      {/* Totals */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
        {couponDiscount > 0 && (
          <div className="flex justify-between text-green-600"><span>Coupon</span><span>− ${couponDiscount.toFixed(2)}</span></div>
        )}
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? <span className="text-green-600">Free</span> : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
      </div>

      <hr className="border-gray-100" />

      <div className="flex justify-between font-bold text-gray-900 text-base">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Link to="/customer/cart" className="text-xs text-blue-500 hover:underline text-center">
        Edit cart
      </Link>
    </div>
  );
};

export default OrderSummary;
