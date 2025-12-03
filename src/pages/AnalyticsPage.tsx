import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { BarChart3, PieChart as PieChartIcon, TrendingUp } from "lucide-react";

/* -------------------- Sample Data -------------------- */
const monthlyData = [
  { month: "Jan", income: 2400, expense: 1200 },
  { month: "Feb", income: 2200, expense: 1500 },
  { month: "Mar", income: 2800, expense: 1700 },
  { month: "Apr", income: 3200, expense: 2100 },
  { month: "May", income: 3100, expense: 2000 },
  { month: "Jun", income: 3600, expense: 2500 },
];

const categoryData = [
  { name: "Food", value: 800 },
  { name: "Transport", value: 400 },
  { name: "Bills", value: 650 },
  { name: "Shopping", value: 550 },
  { name: "Entertainment", value: 300 },
];

const PIE_COLORS = ["#2563EB", "#60A5FA", "#93C5FD", "#1E3A8A", "#38BDF8"];

export default function AnalyticsPage() {
  const totals = useMemo(() => {
    const totalIncome = monthlyData.reduce((s, m) => s + m.income, 0);
    const totalExpense = monthlyData.reduce((s, m) => s + m.expense, 0);
    const balance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, balance };
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full overflow-y-auto">
      {/* Header */}
      <header className="mb-8 flex items-center gap-2">
        <BarChart3 className="text-blue-600" size={26} />
        <h1 className="text-3xl font-semibold text-gray-800">
          Revenue Analytics
        </h1>
      </header>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-gray-400">Total Income</p>
          <h2 className="text-2xl font-semibold text-green-600 mt-1">
            Rs {totals.totalIncome.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-gray-400">Total Expense</p>
          <h2 className="text-2xl font-semibold text-red-600 mt-1">
            Rs {totals.totalExpense.toLocaleString()}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <p className="text-xs text-gray-400">Net Balance</p>
          <h2 className="text-2xl font-semibold text-blue-600 mt-1">
            Rs {totals.balance.toLocaleString()}
          </h2>
        </div>
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart: Income vs Expense */}
        <div className="bg-white border rounded-xl shadow-sm p-5 lg:col-span-2">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-600" /> Income vs Expense
          </h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#22C55E"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#EF4444"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart: Category Breakdown */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h3 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
            <PieChartIcon size={18} className="text-blue-600" /> Category Breakdown
          </h3>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={3}
                  animationDuration={800}
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Bar Chart: Monthly Summary */}
      <section className="bg-white border rounded-xl shadow-sm p-5 mt-8">
        <h3 className="font-medium text-gray-800 mb-3">Monthly Summary</h3>
        <div className="h-72">
          <ResponsiveContainer>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#22C55E" name="Income" />
              <Bar dataKey="expense" fill="#EF4444" name="Expense" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
