import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-10 px-4">

      {/* Brand */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-2xl">E</span>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900">ECommerce</h1>
        <p className="text-gray-500 mt-2">Your one-stop marketplace</p>
      </div>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">

        {/* Customer card */}
        <div className="flex-1 bg-white rounded-xl shadow-md border p-8 flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-xl">🛍️</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Customer</h2>
          <p className="text-sm text-gray-500 text-center">
            Browse products, place orders, and track deliveries.
          </p>
          <div className="flex flex-col gap-2 w-full mt-2">
            <Link
              to={ROUTES.CUSTOMER_LOGIN}
              className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition"
            >
              Login
            </Link>
            <Link
              to={ROUTES.CUSTOMER_REGISTER}
              className="w-full text-center border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-2 rounded-md transition"
            >
              Register
            </Link>
          </div>
        </div>

        {/* Vendor card */}
        <div className="flex-1 bg-white rounded-xl shadow-md border p-8 flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-xl">🏪</span>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Vendor</h2>
          <p className="text-sm text-gray-500 text-center">
            List your products, manage inventory, and grow your store.
          </p>
          <div className="flex flex-col gap-2 w-full mt-2">
            <Link
              to={ROUTES.VENDOR_LOGIN}
              className="w-full text-center bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
            >
              Login
            </Link>
            <Link
              to={ROUTES.VENDOR_REGISTER}
              className="w-full text-center border border-green-600 text-green-600 hover:bg-green-50 font-medium py-2 rounded-md transition"
            >
              Register
            </Link>
          </div>
        </div>

      </div>

      {/* Footer hint */}
      <p className="text-xs text-gray-400">
        Are you an admin?{" "}
        <Link to={ROUTES.ADMIN} className="text-blue-500 hover:underline">
          Admin Dashboard
        </Link>
      </p>

    </div>
  );
}

export default LandingPage;
