import { DollarSign, ShoppingBag, Package, Users, Star } from "lucide-react";
import { SUMMARY } from "@/mock/analytics";
import AnalyticsCard from "../components/AnalyticsCard";
import SalesChart from "../components/SalesChart";
import { OrdersTrendChart, CategoryPieChart } from "../components/RevenueChart";

function VendorAnalytics() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-500 mt-0.5">Store performance overview (mock data).</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
        <AnalyticsCard title="Total Revenue"   value={`$${SUMMARY.totalRevenue.toLocaleString()}`} growth={SUMMARY.revenueGrowth} icon={<DollarSign size={20}/>} color="bg-green-50 text-green-600" />
        <AnalyticsCard title="Total Orders"    value={SUMMARY.totalOrders}    growth={SUMMARY.ordersGrowth} icon={<ShoppingBag size={20}/>} color="bg-purple-50 text-purple-600" />
        <AnalyticsCard title="Products Sold"   value={SUMMARY.productsSold}   icon={<Package size={20}/>}   color="bg-blue-50 text-blue-600" />
        <AnalyticsCard title="Customers"       value={SUMMARY.totalCustomers} icon={<Users size={20}/>}     color="bg-orange-50 text-orange-600" />
        <AnalyticsCard title="Avg Rating"      value={`${SUMMARY.avgRating} ⭐`} icon={<Star size={20}/>} color="bg-yellow-50 text-yellow-600" />
      </div>

      {/* Charts row 1 */}
      <SalesChart />

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OrdersTrendChart />
        <CategoryPieChart />
      </div>
    </div>
  );
}

export default VendorAnalytics;
