import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const ProductCard = ({ product }) => {
  const { id, name, price, originalPrice, discount, rating, reviewCount, image, badge } = product;
  const { addToCart, items } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const inCart = items.some((i) => i.id === id);
  const wishlisted = isWishlisted(id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  const renderStars = (r) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={13}
        className={i < Math.floor(r) ? "text-yellow-400" : "text-gray-200"}
        fill={i < Math.floor(r) ? "currentColor" : "none"}
      />
    ));

  return (
    <Link
      to={`/customer/product/${id}`}
      className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* Badge */}
      {badge && (
        <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}

      {/* Wishlist */}
      <button
        onClick={handleWishlist}
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Heart
          size={15}
          className={wishlisted ? "text-red-500" : "text-gray-400"}
          fill={wishlisted ? "currentColor" : "none"}
        />
      </button>

      {/* Image */}
      <div className="w-full aspect-square overflow-hidden bg-gray-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug">{name}</p>

        <div className="flex items-center gap-1">
          <div className="flex items-center gap-0.5">{renderStars(rating)}</div>
          <span className="text-xs text-gray-500">({reviewCount.toLocaleString()})</span>
        </div>

        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-base font-bold text-gray-900">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="text-xs text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
          )}
          {discount > 0 && (
            <span className="text-xs font-semibold text-green-600">{discount}% off</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className={`mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            inCart
              ? "bg-green-500 text-white"
              : "bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white"
          }`}
        >
          <ShoppingCart size={15} />
          {inCart ? "In Cart" : "Add to Cart"}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
