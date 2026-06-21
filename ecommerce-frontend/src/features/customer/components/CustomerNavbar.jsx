import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Search, X } from "lucide-react";
import SearchBar from "./SearchBar";
import CategoryMenu from "./CategoryMenu";
import CartIcon from "./CartIcon";
import UserMenu from "./UserMenu";
import { ROUTES } from "@/constants/routes";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import logo from "@/assets/images/logo.png";

const CustomerNavbar = () => {
  const { itemCount: cartCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b shadow-sm">
      {/* ── Main bar ─────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">

        {/* Logo */}
        <Link
          to={ROUTES.CUSTOMER}
          className="flex items-center gap-2 shrink-0"
          aria-label="Home"
        >
          <img src={logo} alt="ECommerce Logo" className="h-15 w-auto object-contain" />
        </Link>

        {/* Categories — desktop only */}
        <div className="hidden md:flex shrink-0">
          <CategoryMenu />
        </div>

        {/* Search — takes remaining space, hidden on mobile */}
        <div className="flex-1 hidden sm:block">
          <SearchBar />
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0 shrink-0">

          {/* Search toggle — mobile only */}
          <button
            className="sm:hidden text-gray-700 hover:text-blue-600 transition p-1"
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Toggle search"
          >
            {searchOpen ? <X size={22} /> : <Search size={22} />}
          </button>

          {/* Wishlist */}
          <Link
            to={ROUTES.CUSTOMER_WISHLIST}
            className="relative text-gray-700 hover:text-blue-600 transition p-1"
            aria-label={`Wishlist, ${wishlistCount} items`}
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                {wishlistCount > 9 ? "9+" : wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <CartIcon count={cartCount} />

          {/* User */}
          <UserMenu />
        </div>

      </div>

      {/* ── Mobile search bar (expands below navbar) ─────────── */}
      {searchOpen && (
        <div className="sm:hidden px-4 pb-3 border-t border-gray-100 bg-white">
          <SearchBar />
        </div>
      )}
    </header>
  );
};

export default CustomerNavbar;
