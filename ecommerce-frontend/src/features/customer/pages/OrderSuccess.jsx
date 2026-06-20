import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle, ShoppingBag, Home } from "lucide-react";
import { ROUTES } from "@/constants/routes";

function OrderSuccess() {
  const [params] = useSearchParams();
  const orderId = params.get("orderId") ?? "ORD-UNKNOWN";

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white rounded-2xl border shadow-sm p-10 max-w-md w-full text-center flex flex-col items-center gap-5">
        {/* Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle size={40} className="text-green-600" />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900">Order Placed!</h1>
          <p className="text-gray-500 text-sm">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
        </div>

        {/* Order ID */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 w-full">
          <p className="text-xs text-gray-400 mb-1">Order ID</p>
          <p className="text-lg font-bold text-blue-600 tracking-wider">{orderId}</p>
        </div>

        <p className="text-xs text-gray-400">
          A confirmation will be sent to your email once the backend is connected.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
          <Link
            to={ROUTES.CUSTOMER_PRODUCTS}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
          >
            <ShoppingBag size={16} /> Continue Shopping
          </Link>
          <Link
            to={ROUTES.CUSTOMER}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 font-medium py-3 rounded-xl transition"
          >
            <Home size={16} /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;
