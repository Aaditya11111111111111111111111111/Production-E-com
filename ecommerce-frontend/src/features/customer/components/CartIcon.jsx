import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const CartIcon = ({ count = 0 }) => {
  return (
    <Link
      to={ROUTES.CUSTOMER_CART}
      className="relative text-gray-700 hover:text-blue-600 transition p-1"
      aria-label={`Cart, ${count} items`}
    >
      <ShoppingCart size={22} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
