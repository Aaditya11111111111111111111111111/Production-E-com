import { useAuth } from "@/context/AuthContext";

function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your account.</p>
      </div>

      {/* Placeholder stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Orders",   value: "0",  color: "bg-blue-50 text-blue-600"  },
          { label: "Wishlist", value: "0",  color: "bg-pink-50 text-pink-600"  },
          { label: "Reviews",  value: "0",  color: "bg-green-50 text-green-600" },
        ].map((card) => (
          <div key={card.label} className="bg-white rounded-xl border shadow-sm p-6">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className={`text-3xl font-bold mt-1 ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      {/* Placeholder content */}
      <div className="bg-white rounded-xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Recent Orders</h2>
        <p className="text-sm text-gray-400">No orders yet. Start shopping!</p>
      </div>
    </div>
  );
}

export default CustomerDashboard;
