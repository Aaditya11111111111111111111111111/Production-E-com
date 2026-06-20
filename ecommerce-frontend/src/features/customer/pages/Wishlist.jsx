import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import WishlistItem from "../components/WishlistItem";

function Wishlist() {
  const { items, itemCount } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
        <Heart size={64} className="text-gray-200" />
        <h1 className="text-2xl font-bold text-gray-700">Your wishlist is empty</h1>
        <p className="text-gray-400 text-sm">Save items you love and come back to them later.</p>
        <Link
          to="/customer/products"
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 flex items-center gap-1">
        <Link to="/customer" className="hover:text-blue-600 transition">Home</Link>
        <span>/</span>
        <span className="text-gray-800 font-medium">Wishlist</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900">
        My Wishlist{" "}
        <span className="text-base font-normal text-gray-400">
          ({itemCount} item{itemCount !== 1 ? "s" : ""})
        </span>
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((product) => (
          <WishlistItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
