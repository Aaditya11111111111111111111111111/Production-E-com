import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";
import { categories } from "@/data/categories";

const CategoryGrid = () => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
        <Link
          to="/customer/products"
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} />
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
