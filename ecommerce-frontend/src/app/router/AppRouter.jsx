import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout.jsx";
import LandingPage from "../../features/auth/pages/LandingPage.jsx";
import CustomerLogin from "../../features/auth/pages/CustomerLogin.jsx";
import CustomerRegister from "../../features/auth/pages/CustomerRegister.jsx";
import VendorLogin from "../../features/auth/pages/VendorLogin.jsx";
import VendorRegister from "../../features/auth/pages/VendorRegister.jsx";
import ForgotPassword from "../../features/auth/pages/ForgotPassword.jsx";
import AdminDashboard from "../../features/admin/pages/AdminDashboard.jsx";
import CustomerDashboard from "../../features/customer/pages/CustomerDashboard.jsx";
import VendorDashboard from "../../features/vendor/pages/VendorDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: "login/customer", element: <CustomerLogin /> },
      { path: "register/customer", element: <CustomerRegister /> },
      { path: "login/vendor", element: <VendorLogin /> },
      { path: "register/vendor", element: <VendorRegister /> },
      { path: "forgot-password", element: <ForgotPassword /> },
    ],
  },
  { path: "admin", element: <AdminDashboard /> },
  { path: "customer", element: <CustomerDashboard /> },
  { path: "vendor", element: <VendorDashboard /> },
]);

export default router;
