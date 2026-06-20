import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "wishlist_items";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToWishlist = useCallback((product) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === product.id)) return prev;
      return [...prev, product];
    });
    toast.success(`${product.name} added to wishlist`);
  }, []);

  const removeFromWishlist = useCallback((productId) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
    toast("Removed from wishlist", { icon: "💔" });
  }, []);

  const toggleWishlist = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) {
        toast("Removed from wishlist", { icon: "💔" });
        return prev.filter((i) => i.id !== product.id);
      }
      toast.success(`${product.name} added to wishlist`);
      return [...prev, product];
    });
  }, []);

  const isWishlisted = useCallback(
    (productId) => items.some((i) => i.id === productId),
    [items]
  );

  const value = {
    items,
    itemCount: items.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted,
  };

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}
