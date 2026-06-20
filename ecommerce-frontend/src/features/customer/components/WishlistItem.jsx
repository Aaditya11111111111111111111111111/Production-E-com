import { Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const WishlistItem = ({ product }) => {
  const { removeFromWishlist } = useWishlist();
  const { addToCart, items: cartItems } = useCart();

  const inCart = cartItems.some((i) => i.id === product.id);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group">
      {/* Image */}
      <Link to={`/customer/product/${product.id}`} className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300 bg-gray-50"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <Link
          to={`/customer/product/${product.id}`}
          className="text-sm font-semibold text-gray-800 hover:text-blue-600 transition line-clamp-2"
        >
          {product.name}
        </Link>

        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => addToCart(product, 1)}
            className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold transition ${
              inCart
                ? "bg-green-100 text-green-700"
                : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white"
            }`}
          >
            <ShoppingCart size={13} />
            {inCart ? "In Cart" : "Add to Cart"}
          </button>

          <button
            onClick={() => removeFromWishlist(product.id)}
            aria-label="Remove from wishlist"
            className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-200 transition"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
