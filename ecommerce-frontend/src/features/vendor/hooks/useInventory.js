import { useMemo } from "react";
import { useProducts } from "@/context/ProductContext";

/**
 * Derived inventory stats from ProductContext.
 */
export function useInventory() {
  const { products, editProduct } = useProducts();

  const summary = useMemo(() => ({
    total:      products.length,
    inStock:    products.filter((p) => p.stock > 0).length,
    lowStock:   products.filter((p) => p.stock > 0 && p.stock < 10).length,
    outOfStock: products.filter((p) => p.stock === 0).length,
    totalUnits: products.reduce((s, p) => s + p.stock, 0),
  }), [products]);

  /** Update stock for a single product */
  const updateStock = (id, newStock) => {
    const qty = parseInt(newStock, 10);
    if (isNaN(qty) || qty < 0) return;
    editProduct(id, { stock: qty });
  };

  /** Bulk update stock for multiple products */
  const bulkUpdateStock = (updates) => {
    // updates: [{ id, stock }]
    updates.forEach(({ id, stock }) => updateStock(id, stock));
  };

  return { products, summary, updateStock, bulkUpdateStock };
}
