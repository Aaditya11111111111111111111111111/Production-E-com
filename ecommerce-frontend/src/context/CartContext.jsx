import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "cart_items";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // ── Add to cart (increments qty if already in cart) ──────
  const addToCart = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, 99) }
            : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          category: product.category,
          inStock: product.inStock,
          quantity,
        },
      ];
    });
    toast.success(`${product.name} added to cart`);
  }, []);

  // ── Remove one item ──────────────────────────────────────
  const removeFromCart = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
    toast("Item removed from cart", { icon: "🗑️" });
  }, []);

  // ── Update quantity (removes if qty <= 0) ─────────────────
  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === productId ? { ...i, quantity: Math.min(quantity, 99) } : i
      )
    );
  }, []);

  // ── Clear entire cart ─────────────────────────────────────
  const clearCart = useCallback(() => {
    setItems([]);
    toast("Cart cleared", { icon: "🗑️" });
  }, []);

  // ── Derived values ────────────────────────────────────────
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = {
    items,
    itemCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
