import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider }     from "@/context/AuthContext";
import { CartProvider }     from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ProductProvider }  from "@/context/ProductContext";
import router from "./router/AppRouter.jsx";

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
            <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
