import { createBrowserRouter } from "react-router-dom";

// Layouts
import PublicLayout    from "../layouts/PublicLayout.jsx";
import CustomerLayout  from "../../layouts/CustomerLayout.jsx";
import VendorLayout    from "../../layouts/VendorLayout.jsx";

// Auth pages
import LandingPage      from "../../features/auth/pages/LandingPage.jsx";
import CustomerLogin    from "../../features/auth/pages/CustomerLogin.jsx";
import CustomerRegister from "../../features/auth/pages/CustomerRegister.jsx";
import VendorLogin      from "../../features/auth/pages/VendorLogin.jsx";
import VendorRegister   from "../../features/auth/pages/VendorRegister.jsx";
import ForgotPassword   from "../../features/auth/pages/ForgotPassword.jsx";

// Customer pages
import Home              from "../../features/customer/pages/Home.jsx";
import CustomerDashboard from "../../features/customer/pages/CustomerDashboard.jsx";
import ProductListing    from "../../features/customer/pages/ProductListing.jsx";
import ProductDetails    from "../../features/customer/pages/ProductDetails.jsx";
import Cart              from "../../features/customer/pages/Cart.jsx";
import Wishlist          from "../../features/customer/pages/Wishlist.jsx";
import Checkout          from "../../features/customer/pages/Checkout.jsx";
import OrderSuccess      from "../../features/customer/pages/OrderSuccess.jsx";
import Profile           from "../../features/customer/pages/Profile.jsx";

// Vendor pages
import VendorDashboard  from "../../features/vendor/pages/VendorDashboard.jsx";
import VendorProducts   from "../../features/vendor/pages/VendorProducts.jsx";
import AddProduct       from "../../features/vendor/pages/AddProduct.jsx";
import EditProduct      from "../../features/vendor/pages/EditProduct.jsx";
import VendorOrders     from "../../features/vendor/pages/VendorOrders.jsx";
import VendorAnalytics  from "../../features/vendor/pages/VendorAnalytics.jsx";
import VendorReviews    from "../../features/vendor/pages/VendorReviews.jsx";
import VendorCustomers  from "../../features/vendor/pages/VendorCustomers.jsx";
import VendorProfile    from "../../features/vendor/pages/VendorProfile.jsx";
import VendorSettings   from "../../features/vendor/pages/VendorSettings.jsx";

// Admin
import AdminDashboard from "../../features/admin/pages/AdminDashboard.jsx";

// Guards
import ProtectedRoute from "../../components/common/ProtectedRoute.jsx";

const router = createBrowserRouter([
  // ── Public ────────────────────────────────────────────────
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true,               element: <LandingPage /> },
      { path: "login/customer",    element: <CustomerLogin /> },
      { path: "register/customer", element: <CustomerRegister /> },
      { path: "login/vendor",      element: <VendorLogin /> },
      { path: "register/vendor",   element: <VendorRegister /> },
      { path: "forgot-password",   element: <ForgotPassword /> },
    ],
  },

  // ── Customer (protected) ──────────────────────────────────
  {
    path: "customer",
    element: (
      <ProtectedRoute allowedRole="customer">
        <CustomerLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true,             element: <Home /> },
      { path: "dashboard",       element: <CustomerDashboard /> },
      { path: "products",        element: <ProductListing /> },
      { path: "product/:id",     element: <ProductDetails /> },
      { path: "cart",            element: <Cart /> },
      { path: "wishlist",        element: <Wishlist /> },
      { path: "checkout",        element: <Checkout /> },
      { path: "order-success",   element: <OrderSuccess /> },
      { path: "profile",         element: <Profile /> },
    ],
  },

  // ── Vendor (protected) ────────────────────────────────────
  {
    path: "vendor",
    element: (
      <ProtectedRoute allowedRole="vendor">
        <VendorLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true,                element: <VendorDashboard /> },
      { path: "products",           element: <VendorProducts /> },
      { path: "products/add",       element: <AddProduct /> },
      { path: "products/edit/:id",  element: <EditProduct /> },
      { path: "orders",             element: <VendorOrders /> },
      { path: "analytics",          element: <VendorAnalytics /> },
      { path: "reviews",            element: <VendorReviews /> },
      { path: "customers",          element: <VendorCustomers /> },
      { path: "profile",            element: <VendorProfile /> },
      { path: "settings",           element: <VendorSettings /> },
    ],
  },

  // ── Admin ─────────────────────────────────────────────────
  { path: "admin", element: <AdminDashboard /> },
]);

export default router;
