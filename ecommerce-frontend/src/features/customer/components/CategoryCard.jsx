import { Link } from "react-router-dom";

const CategoryCard = ({ category }) => {
  const { name, slug, icon, color, productCount } = category;

  return (
    <Link
      to={`/customer/products?category=${slug}`}
      className="flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
    >
      <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${color} group-hover:scale-110 transition-transform duration-200`}>
        {icon}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-gray-800">{name}</p>
        <p className="text-xs text-gray-400 mt-0.5">{productCount.toLocaleString()} items</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
