import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import { ORDERS_TREND, CATEGORY_DISTRIBUTION } from "@/mock/analytics";

export const OrdersTrendChart = () => (
  <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-3">
    <h3 className="text-sm font-semibold text-gray-700">Orders Trend (Weekly)</h3>
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={ORDERS_TREND} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="week" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
        <Tooltip
          formatter={(v) => [v, "Orders"]}
          contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
        />
        <Bar dataKey="orders" fill="#4f46e5" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export const CategoryPieChart = () => (
  <div className="bg-white rounded-2xl border shadow-sm p-5 flex flex-col gap-3">
    <h3 className="text-sm font-semibold text-gray-700">Sales by Category</h3>
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={CATEGORY_DISTRIBUTION}
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="value"
        >
          {CATEGORY_DISTRIBUTION.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span style={{ fontSize: 11 }}>{value}</span>}
        />
        <Tooltip
          formatter={(v) => [`${v}%`, "Share"]}
          contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
);
