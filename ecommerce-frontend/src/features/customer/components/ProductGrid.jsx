import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

/**
 * Props:
 *   title      – section heading
 *   products   – array of product objects
 *   viewAllTo  – href for "View all" link (optional)
 */
const ProductGrid = ({ title, products = [], viewAllTo }) => {
  if (!products.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        {viewAllTo && (
          <Link to={viewAllTo} className="text-sm text-blue-600 hover:underline font-medium">
            View all →
          </Link>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
