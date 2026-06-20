import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import SearchBar from "./SearchBar";
import CategoryMenu from "./CategoryMenu";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import { ROUTES } from "@/constants/routes";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const CustomerNavbar = () => {
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">

        {/* Logo */}
        <Link
          to={ROUTES.CUSTOMER}
          className="flex items-center gap-2 shrink-0 mr-2"
          aria-label="Home"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <span className="font-bold text-gray-900 text-lg hidden sm:block">ECommerce</span>
        </Link>

        {/* Categories */}
        <div className="hidden md:flex shrink-0">
          <CategoryMenu />
        </div>

        {/* Search — takes remaining space */}
        <div className="flex-1">
          <SearchBar />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Wishlist with badge */}
          <Link
            to={ROUTES.CUSTOMER_WISHLIST}
            className="relative text-gray-700 hover:text-blue-600 transition"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {wishlistCount > 99 ? "99+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart with live badge */}
          <CartIcon count={cartCount} />

          {/* User */}
          <UserMenu />
        </div>

      </div>
    </header>
  );
};

export default CustomerNavbar;
