import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import ProductForm from "../components/ProductForm";
import { ROUTES } from "@/constants/routes";

function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      addProduct(data);
      setLoading(false);
      navigate(ROUTES.VENDOR_PRODUCTS);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link
          to={ROUTES.VENDOR_PRODUCTS}
          className="text-gray-400 hover:text-gray-600 transition"
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Product</h1>
          <p className="text-sm text-gray-500 mt-0.5">Fill in the details to list a new product.</p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Add Product"
        />
      </div>
    </div>
  );
}

export default AddProduct;
