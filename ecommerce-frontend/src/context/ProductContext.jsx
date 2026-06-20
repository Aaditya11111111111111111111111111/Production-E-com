import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "vendor_products";

// ── Seed data ─────────────────────────────────────────────────
const SEED_PRODUCTS = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with 30-hour battery and active noise cancellation.",
    category: "electronics",
    brand: "AudioPro",
    sku: "AP-WNC-001",
    price: 79.99,
    discount: 38,
    stock: 45,
    status: "active",
    image: "https://placehold.co/300x300/e0f2fe/0284c7?text=Headphones",
    createdAt: "2024-01-10",
  },
  {
    id: 2,
    name: "Slim Fit Cotton T-Shirt",
    description: "100% organic cotton slim-fit T-shirt, available in multiple colors.",
    category: "fashion",
    brand: "StyleCo",
    sku: "SC-TSH-002",
    price: 19.99,
    discount: 43,
    stock: 120,
    status: "active",
    image: "https://placehold.co/300x300/fce7f3/db2777?text=T-Shirt",
    createdAt: "2024-01-15",
  },
  {
    id: 3,
    name: "Running Sneakers Pro",
    description: "Lightweight running sneakers with breathable mesh upper.",
    category: "shoes",
    brand: "SpeedRun",
    sku: "SR-SNK-003",
    price: 64.99,
    discount: 28,
    stock: 0,
    status: "inactive",
    image: "https://placehold.co/300x300/fff7ed/ea580c?text=Sneakers",
    createdAt: "2024-01-20",
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    description: "Fully adjustable ergonomic chair with lumbar support.",
    category: "home-living",
    brand: "ComfortPlus",
    sku: "CP-CHR-004",
    price: 199.99,
    discount: 33,
    stock: 18,
    status: "active",
    image: "https://placehold.co/300x300/f0fdf4/16a34a?text=Chair",
    createdAt: "2024-02-01",
  },
  {
    id: 5,
    name: "Adjustable Dumbbell Set",
    description: "Space-saving adjustable dumbbells from 2.5kg to 24kg.",
    category: "sports",
    brand: "FitGear",
    sku: "FG-DBS-005",
    price: 149.99,
    discount: 25,
    stock: 30,
    status: "active",
    image: "https://placehold.co/300x300/fefce8/ca8a04?text=Dumbbells",
    createdAt: "2024-02-10",
  },
];

const ProductContext = createContext(null);

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : SEED_PRODUCTS;
    } catch {
      return SEED_PRODUCTS;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  // ── Add ───────────────────────────────────────────────────
  const addProduct = useCallback((data) => {
    const newProduct = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString().slice(0, 10),
      image: data.image || "https://placehold.co/300x300/e2e8f0/64748b?text=Product",
    };
    setProducts((prev) => [newProduct, ...prev]);
    toast.success(`"${data.name}" added successfully`);
    return newProduct;
  }, []);

  // ── Edit ──────────────────────────────────────────────────
  const editProduct = useCallback((id, data) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
    toast.success("Product updated");
  }, []);

  // ── Delete ────────────────────────────────────────────────
  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast("Product deleted", { icon: "🗑️" });
  }, []);

  // ── Toggle active/inactive ────────────────────────────────
  const toggleStatus = useCallback((id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "active" ? "inactive" : "active" }
          : p
      )
    );
  }, []);

  // ── Stats ─────────────────────────────────────────────────
  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "active").length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    totalRevenue: products.reduce((s, p) => s + p.price * (100 - p.discount) / 100, 0),
  };

  const value = {
    products,
    stats,
    addProduct,
    editProduct,
    deleteProduct,
    toggleStatus,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside <ProductProvider>");
  return ctx;
}
