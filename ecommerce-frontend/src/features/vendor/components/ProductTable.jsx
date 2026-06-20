import { Link } from "react-router-dom";
import { Pencil, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { ROUTES } from "@/constants/routes";

const StatusBadge = ({ status }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
      status === "active"
        ? "bg-green-100 text-green-700"
        : "bg-gray-100 text-gray-500"
    }`}
  >
    {status === "active" ? "Active" : "Inactive"}
  </span>
);

const StockBadge = ({ stock }) => (
  <span
    className={`text-xs font-semibold ${
      stock === 0 ? "text-red-500" : stock < 10 ? "text-yellow-600" : "text-gray-700"
    }`}
  >
    {stock === 0 ? "Out of Stock" : stock}
  </span>
);

const ProductTable = ({ products }) => {
  const { deleteProduct, toggleStatus } = useProducts();

  if (!products.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p className="text-4xl mb-3">📦</p>
        <p className="font-semibold">No products yet</p>
        <p className="text-sm mt-1">
          <Link to={ROUTES.VENDOR_ADD_PRODUCT} className="text-green-600 hover:underline">
            Add your first product
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left">
            <th className="pb-3 pr-4 font-semibold text-gray-500 w-12">#</th>
            <th className="pb-3 pr-4 font-semibold text-gray-500">Product</th>
            <th className="pb-3 pr-4 font-semibold text-gray-500 hidden sm:table-cell">Category</th>
            <th className="pb-3 pr-4 font-semibold text-gray-500">Price</th>
            <th className="pb-3 pr-4 font-semibold text-gray-500 hidden md:table-cell">Stock</th>
            <th className="pb-3 pr-4 font-semibold text-gray-500">Status</th>
            <th className="pb-3 font-semibold text-gray-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td className="py-3 pr-4 text-gray-400">{i + 1}</td>

              {/* Product info */}
              <td className="py-3 pr-4">
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-800 truncate max-w-[160px]">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.sku}</p>
                  </div>
                </div>
              </td>

              <td className="py-3 pr-4 hidden sm:table-cell capitalize text-gray-600">
                {p.category.replace("-", " ")}
              </td>

              <td className="py-3 pr-4 font-semibold text-gray-800">${p.price.toFixed(2)}</td>

              <td className="py-3 pr-4 hidden md:table-cell">
                <StockBadge stock={p.stock} />
              </td>

              <td className="py-3 pr-4">
                <StatusBadge status={p.status} />
              </td>

              {/* Actions */}
              <td className="py-3 text-right">
                <div className="flex items-center justify-end gap-1">
                  {/* Toggle active */}
                  <button
                    onClick={() => toggleStatus(p.id)}
                    title={p.status === "active" ? "Deactivate" : "Activate"}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition"
                  >
                    {p.status === "active"
                      ? <ToggleRight size={17} className="text-green-600" />
                      : <ToggleLeft size={17} />
                    }
                  </button>

                  {/* Edit */}
                  <Link
                    to={ROUTES.VENDOR_EDIT_PRODUCT(p.id)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition"
                    title="Edit"
                  >
                    <Pencil size={15} />
                  </Link>

                  {/* Delete */}
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete "${p.name}"?`)) deleteProduct(p.id);
                    }}
                    title="Delete"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
