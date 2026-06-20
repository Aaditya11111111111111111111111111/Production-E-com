import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import CouponBox from "../components/CouponBox";

function Cart() {
  const { items, clearCart } = useCart();
  const [couponDiscount, setCouponDiscount] = useState(0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
        <ShoppingCart size={64} className="text-gray-200" />
        <h1 className="text-2xl font-bold text-gray-700">Your cart is empty</h1>
        <p className="text-gray-400 text-sm">Looks like you haven't added anything yet.</p>
        <Link
          to="/customer/products"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-1">
        <Link to="/customer" className="hover:text-blue-600 transition">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Cart</span>
      </nav>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">
          Shopping Cart{" "}
          <span className="text-base font-normal text-gray-400">
            ({items.length} item{items.length !== 1 ? "s" : ""})
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600 transition"
        >
          <Trash2 size={15} /> Clear Cart
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Items */}
        <div className="flex-1 min-w-0 bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-2">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}

          {/* Coupon */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <CouponBox onApply={setCouponDiscount} />
          </div>
        </div>

        {/* Summary */}
        <div className="w-full lg:w-80 shrink-0">
          <CartSummary subtotal={subtotal} couponDiscount={couponDiscount} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
