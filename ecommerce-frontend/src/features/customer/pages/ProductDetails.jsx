import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Zap, Star, CheckCircle, XCircle } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductImageGallery from "../components/ProductImageGallery";
import QuantitySelector from "../components/QuantitySelector";
import RelatedProducts from "../components/RelatedProducts";
import EmptyState from "../components/EmptyState";
import { ROUTES } from "@/constants/routes";

const StarRating = ({ rating }) =>
  Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      size={16}
      className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-200"}
      fill={i < Math.floor(rating) ? "currentColor" : "none"}
    />
  ));

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <EmptyState
        icon="🔍"
        title="Product not found"
        description="This product doesn't exist or may have been removed."
        actionLabel="Browse Products"
        actionTo="/customer/products"
      />
    );
  }

  const {
    name, price, originalPrice, discount, rating, reviewCount,
    inStock, images, description, specifications, badge, category,
  } = product;

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate(ROUTES.CUSTOMER_CART);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
        <Link to="/customer" className="hover:text-blue-600 transition">Home</Link>
        <span>/</span>
        <Link to="/customer/products" className="hover:text-blue-600 transition">Products</Link>
        <span>/</span>
        <Link to={`/customer/products?category=${category}`} className="hover:text-blue-600 transition capitalize">
          {category.replace("-", " ")}
        </Link>
        <span>/</span>
        <span className="text-gray-800 font-medium line-clamp-1">{name}</span>
      </nav>

      {/* Main */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ProductImageGallery images={images} name={name} />

        <div className="flex flex-col gap-5">
          {/* Badge + stock */}
          <div className="flex items-center gap-2 flex-wrap">
            {badge && (
              <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-0.5 rounded-full">
                {badge}
              </span>
            )}
            {inStock ? (
              <span className="flex items-center gap-1 text-xs text-green-600 font-medium">
                <CheckCircle size={14} /> In Stock
              </span>
            ) : (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <XCircle size={14} /> Out of Stock
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 leading-snug">{name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5"><StarRating rating={rating} /></div>
            <span className="text-sm font-semibold text-gray-700">{rating}</span>
            <span className="text-sm text-gray-400">({reviewCount.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-lg text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
            )}
            {discount > 0 && (
              <span className="bg-green-100 text-green-700 text-sm font-semibold px-2 py-0.5 rounded-full">
                {discount}% off
              </span>
            )}
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>

          <hr className="border-gray-100" />

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <QuantitySelector value={quantity} onChange={setQuantity} max={inStock ? 99 : 0} />
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition ${
                !inStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              <ShoppingCart size={17} />
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={!inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition ${
                !inStock
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
              }`}
            >
              <Zap size={17} />
              Buy Now
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-xl hover:border-red-300 transition"
            >
              <Heart
                size={18}
                className={wishlisted ? "text-red-500" : "text-gray-400"}
                fill={wishlisted ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      {specifications && Object.keys(specifications).length > 0 && (
        <div className="bg-white rounded-2xl border shadow-sm p-6 flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">Specifications</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(specifications).map(([key, val]) => (
              <div key={key} className="flex gap-3">
                <span className="text-sm text-gray-500 w-36 shrink-0">{key}</span>
                <span className="text-sm font-medium text-gray-800">{val}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <RelatedProducts currentProduct={product} />
    </div>
  );
}

export default ProductDetails;
