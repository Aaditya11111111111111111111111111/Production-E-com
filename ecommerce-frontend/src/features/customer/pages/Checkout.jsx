import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import ShippingAddressForm from "../components/ShippingAddressForm";
import PaymentMethod from "../components/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import EmptyState from "../components/EmptyState";
import { ROUTES } from "@/constants/routes";

function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Nothing to checkout"
        description="Your cart is empty. Add some products first."
        actionLabel="Browse Products"
        actionTo={ROUTES.CUSTOMER_PRODUCTS}
      />
    );
  }

  const handlePlaceOrder = (shippingData) => {
    setPlacing(true);
    // Simulate async order placement
    setTimeout(() => {
      const orderId = "ORD-" + Math.random().toString(36).slice(2, 10).toUpperCase();
      clearCart();
      navigate(`/customer/order-success?orderId=${orderId}`);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-1">
        <Link to="/customer" className="hover:text-blue-600 transition">Home</Link>
        <span>/</span>
        <Link to="/customer/cart" className="hover:text-blue-600 transition">Cart</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Checkout</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left column */}
        <div className="flex-1 min-w-0 flex flex-col gap-5">
          {/* Shipping */}
          <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900">📦 Shipping Address</h2>
            <ShippingAddressForm
              formId="checkout-form"
              onSubmit={handlePlaceOrder}
            />
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900">💳 Payment Method</h2>
            <PaymentMethod selected={paymentMethod} onChange={setPaymentMethod} />
          </div>

          {/* Place order button (submits the shipping form) */}
          <button
            type="submit"
            form="checkout-form"
            disabled={placing}
            className={`w-full py-4 rounded-xl font-bold text-base transition ${
              placing
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {placing ? "Placing Order…" : "Place Order"}
          </button>
        </div>

        {/* Right: order summary */}
        <div className="w-full lg:w-80 shrink-0">
          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  );
}

export default Checkout;
