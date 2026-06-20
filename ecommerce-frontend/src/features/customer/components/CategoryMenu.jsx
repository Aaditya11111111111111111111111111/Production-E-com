import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const CATEGORIES = [
  { label: "Electronics",  slug: "electronics" },
  { label: "Fashion",      slug: "fashion" },
  { label: "Home & Living",slug: "home-living" },
  { label: "Sports",       slug: "sports" },
  { label: "Books",        slug: "books" },
  { label: "Groceries",    slug: "groceries" },
];

const CategoryMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition whitespace-nowrap"
        aria-haspopup="true"
        aria-expanded={open}
      >
        Categories
        <ChevronDown size={16} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 py-1">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/customer/products?category=${cat.slug}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryMenu;
