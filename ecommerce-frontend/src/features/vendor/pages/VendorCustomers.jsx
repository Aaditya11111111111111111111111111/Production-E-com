import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { CUSTOMERS } from "@/mock/customers";

function VendorCustomers() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return CUSTOMERS;
    const q = query.toLowerCase();
    return CUSTOMERS.filter(
      (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
    );
  }, [query]);

  const totalSpent = CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0);

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {CUSTOMERS.length} customers · ${totalSpent.toLocaleString()} total revenue
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email..."
            className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50">
              <tr>
                {["Customer", "Email", "Orders", "Total Spent", "Joined"].map((h) => (
                  <th key={h} className="py-3 px-5 text-left font-semibold text-gray-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center text-gray-400">No customers found</td>
                </tr>
              ) : filtered.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {c.avatar}
                      </div>
                      <span className="font-medium text-gray-800 whitespace-nowrap">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-gray-500">{c.email}</td>
                  <td className="py-3.5 px-5">
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {c.orders}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-gray-800">${c.totalSpent.toFixed(2)}</td>
                  <td className="py-3.5 px-5 text-gray-400 text-xs">{c.joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default VendorCustomers;
