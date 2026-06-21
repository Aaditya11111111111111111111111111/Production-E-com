import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

const STORAGE_KEY = "vendor_products";

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
    stock: 7,
    status: "active",
    image: "https://placehold.co/300x300/fefce8/ca8a04?text=Dumbbells",
    createdAt: "2024-02-10",
  },
  {
    id: 6,
    name: "Vitamin C Serum",
    description: "Brightening serum with 15% Vitamin C.",
    category: "beauty",
    brand: "GlowLab",
    sku: "GL-SRM-006",
    price: 24.99,
    discount: 10,
    stock: 3,
    status: "active",
    image: "https://placehold.co/300x300/fdf4ff/a855f7?text=Serum",
    createdAt: "2024-02-15",
  },
  {
    id: 7,
    name: "Yoga Mat Premium",
    description: "6mm eco-friendly TPE yoga mat.",
    category: "sports",
    brand: "ZenFit",
    sku: "ZF-YMT-007",
    price: 29.99,
    discount: 0,
    stock: 0,
    status: "inactive",
    image: "https://placehold.co/300x300/f0fdf4/16a34a?text=Yoga+Mat",
    createdAt: "2024-02-20",
  },
  {
    id: 8,
    name: "Minimalist Desk Lamp",
    description: "12W LED lamp with 3 color temps.",
    category: "home-living",
    brand: "LuxLight",
    sku: "LL-LMP-008",
    price: 34.99,
    discount: 15,
    stock: 55,
    status: "active",
    image: "https://placehold.co/300x300/fefce8/ca8a04?text=Lamp",
    createdAt: "2024-03-01",
  },
  {
    id: 9,
    name: "Running Shorts",
    description: "Lightweight quick-dry running shorts.",
    category: "sports",
    brand: "SpeedRun",
    sku: "SR-SHT-009",
    price: 22.99,
    discount: 0,
    stock: 80,
    status: "active",
    image: "https://placehold.co/300x300/eff6ff/3b82f6?text=Shorts",
    createdAt: "2024-03-05",
  },
  {
    id: 10,
    name: "Leather Wallet",
    description: "Slim genuine leather bifold wallet.",
    category: "fashion",
    brand: "LuxLeather",
    sku: "LL-WLT-010",
    price: 39.99,
    discount: 20,
    stock: 6,
    status: "active",
    image: "https://placehold.co/300x300/faf5ff/7c3aed?text=Wallet",
    createdAt: "2024-03-10",
  },
  {
    id: 11,
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker, 12h battery.",
    category: "electronics",
    brand: "SoundWave",
    sku: "SW-SPK-011",
    price: 49.99,
    discount: 10,
    stock: 22,
    status: "active",
    image: "https://placehold.co/300x300/e0f2fe/0284c7?text=Speaker",
    createdAt: "2024-03-15",
  },
  {
    id: 12,
    name: "Face Moisturizer SPF 50",
    description: "Lightweight daily moisturizer with UV protection.",
    category: "beauty",
    brand: "DermaCare",
    sku: "DC-MST-012",
    price: 18.99,
    discount: 0,
    stock: 40,
    status: "active",
    image: "https://placehold.co/300x300/fdf4ff/a855f7?text=Moisturizer",
    createdAt: "2024-03-20",
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
    toast.success(`"${data.name}" added`);
    return newProduct;
  }, []);

  // ── Edit ──────────────────────────────────────────────────
  const editProduct = useCallback((id, data) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...data } : p))
    );
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

  // ── Bulk: delete ──────────────────────────────────────────
  const bulkDelete = useCallback((ids) => {
    setProducts((prev) => prev.filter((p) => !ids.includes(p.id)));
    toast(`${ids.length} product${ids.length > 1 ? "s" : ""} deleted`, { icon: "🗑️" });
  }, []);

  // ── Bulk: set status ──────────────────────────────────────
  const bulkSetStatus = useCallback((ids, status) => {
    setProducts((prev) =>
      prev.map((p) => ids.includes(p.id) ? { ...p, status } : p)
    );
    toast.success(`${ids.length} product${ids.length > 1 ? "s" : ""} ${status}`);
  }, []);

  // ── Stats ─────────────────────────────────────────────────
  const stats = {
    total:        products.length,
    active:       products.filter((p) => p.status === "active").length,
    outOfStock:   products.filter((p) => p.stock === 0).length,
    lowStock:     products.filter((p) => p.stock > 0 && p.stock < 10).length,
    totalRevenue: products.reduce((s, p) => s + p.price * (100 - p.discount) / 100, 0),
  };

  return (
    <ProductContext.Provider value={{ products, stats, addProduct, editProduct, deleteProduct, toggleStatus, bulkDelete, bulkSetStatus }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be inside <ProductProvider>");
  return ctx;
}
