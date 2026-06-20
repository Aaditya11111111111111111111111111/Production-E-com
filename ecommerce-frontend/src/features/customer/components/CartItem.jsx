import { Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import QuantitySelector from "./QuantitySelector";
import { useCart } from "@/context/CartContext";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
      {/* Image */}
      <Link to={`/customer/product/${item.id}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-xl object-cover bg-gray-50 border"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <Link
          to={`/customer/product/${item.id}`}
          className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition line-clamp-2"
        >
          {item.name}
        </Link>
        <p className="text-xs text-gray-400 capitalize">{item.category?.replace("-", " ")}</p>

        <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
          <QuantitySelector
            value={item.quantity}
            onChange={(qty) => updateQuantity(item.id, qty)}
          />

          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              {item.quantity > 1 && (
                <p className="text-xs text-gray-400">${item.price.toFixed(2)} each</p>
              )}
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              aria-label="Remove item"
              className="text-gray-400 hover:text-red-500 transition"
            >
              <Trash2 size={17} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
