import { products } from "@/data/products";
import ProductCard from "./ProductCard";

/**
 * Props: currentProduct – the product being viewed
 * Shows up to 4 products from the same category, excluding current.
 */
const RelatedProducts = ({ currentProduct }) => {
  const related = products
    .filter(
      (p) => p.category === currentProduct.category && p.id !== currentProduct.id
    )
    .slice(0, 4);

  if (!related.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-900">Related Products</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
