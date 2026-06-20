import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { MONTHLY_REVENUE } from "@/mock/analytics";

const SalesChart = () => (
  <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-3">
    <h3 className="text-sm font-semibold text-gray-700">Monthly Revenue</h3>
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={MONTHLY_REVENUE} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#16a34a" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#16a34a" stopOpacity={0}   />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip
          formatter={(v) => [`$${v.toLocaleString()}`, "Revenue"]}
          contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
        />
        <Area type="monotone" dataKey="revenue" stroke="#16a34a" strokeWidth={2} fill="url(#revenueGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default SalesChart;
