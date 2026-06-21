import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useProducts } from "@/context/ProductContext";
import { useNotifications } from "@/context/NotificationContext";
import ProductForm from "../components/ProductForm";
import EmptyState from "../components/EmptyState";
import { ROUTES } from "@/constants/routes";

function EditProduct() {
  const { id } = useParams();
  const { products, editProduct } = useProducts();
  const { push } = useNotifications();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <EmptyState
        icon="📦"
        title="Product not found"
        description="This product may have been deleted."
        actionLabel="Back to Products"
        actionTo={ROUTES.VENDOR_PRODUCTS}
      />
    );
  }

  const handleSubmit = (data) => {
    setLoading(true);
    setTimeout(() => {
      editProduct(product.id, data);
      push("success", `Product "${data.name}" was updated.`);
      setLoading(false);
      navigate(ROUTES.VENDOR_PRODUCTS);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-5 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link to={ROUTES.VENDOR_PRODUCTS} className="text-gray-400 hover:text-gray-600 transition">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-sm text-gray-500 mt-0.5 truncate">{product.name}</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl border shadow-sm p-6">
        <ProductForm
          defaultValues={product}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Save Changes"
        />
      </div>
    </div>
  );
}

export default EditProduct;
