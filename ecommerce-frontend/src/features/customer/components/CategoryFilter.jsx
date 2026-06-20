import { categories } from "@/data/categories";

const CategoryFilter = ({ selected, onChange }) => {
  const toggle = (slug) => {
    if (selected.includes(slug)) {
      onChange(selected.filter((s) => s !== slug));
    } else {
      onChange([...selected, slug]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold text-gray-700 mb-1">Category</p>
      {categories.map((cat) => (
        <label key={cat.slug} className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={selected.includes(cat.slug)}
            onChange={() => toggle(cat.slug)}
            className="accent-blue-600 w-4 h-4 rounded"
          />
          <span className="text-sm text-gray-600 group-hover:text-blue-600 transition">
            {cat.icon} {cat.name}
          </span>
        </label>
      ))}
    </div>
  );
};

export default CategoryFilter;
