import { useEffect } from "react";
import { X, CheckCircle, Clock } from "lucide-react";
import { ORDER_STATUSES, STATUS_COLORS } from "@/mock/orders";

const TIMELINE_COLORS = {
  pending:    "bg-yellow-400",
  confirmed:  "bg-blue-500",
  processing: "bg-purple-500",
  shipped:    "bg-indigo-500",
  delivered:  "bg-green-500",
  cancelled:  "bg-red-500",
};

const OrderDetailsModal = ({ order, onClose, onStatusChange }) => {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!order) return null;

  const orderTotal = order.products.reduce((s, p) => s + p.price * p.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white rounded-t-2xl">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Order {order.id}</h2>
            <p className="text-xs text-gray-400 mt-0.5">{order.date}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          {/* Status + change */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <span className={`text-sm font-semibold px-3 py-1 rounded-full capitalize ${STATUS_COLORS[order.orderStatus]}`}>
              {order.orderStatus}
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs text-gray-500 font-medium">Update Status:</label>
              <select
                value={order.orderStatus}
                onChange={(e) => onStatusChange(order.id, e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-green-400 bg-white"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Customer + Shipping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Customer</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {order.customer.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{order.customer.name}</p>
                  <p className="text-xs text-gray-400">{order.customer.email}</p>
                  <p className="text-xs text-gray-400">{order.customer.phone}</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Shipping Address</p>
              <p className="text-sm text-gray-700">{order.shippingAddress.line1}</p>
              <p className="text-sm text-gray-700">
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
              </p>
              <p className="text-sm text-gray-500">{order.shippingAddress.country}</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Ordered Products</p>
            <div className="flex flex-col gap-3">
              {order.products.map((p) => (
                <div key={p.id} className="flex items-center gap-3 bg-gray-50 rounded-xl p-3">
                  <img src={p.image} alt={p.name} className="w-12 h-12 rounded-lg object-cover bg-white border shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400">Qty: {p.qty} × ${p.price.toFixed(2)}</p>
                  </div>
                  <p className="text-sm font-bold text-gray-800 shrink-0">${(p.qty * p.price).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Order summary */}
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{order.shipping === 0 ? <span className="text-green-600">Free</span> : `$${order.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-gray-600"><span>Tax</span><span>${order.tax.toFixed(2)}</span></div>
            <div className="flex justify-between font-bold text-gray-900 border-t pt-2 mt-1">
              <span>Total</span><span>${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-xs mt-1">
              <span>Payment</span>
              <span className="capitalize font-medium">{order.paymentMethod === "cod" ? "Cash on Delivery" : order.paymentMethod.toUpperCase()}</span>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Order Timeline</p>
            <div className="flex flex-col gap-3">
              {order.timeline.map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ${TIMELINE_COLORS[step.status] ?? "bg-gray-300"}`} />
                  <div>
                    <p className="text-sm font-medium text-gray-800 capitalize">{step.label}</p>
                    <p className="text-xs text-gray-400">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
