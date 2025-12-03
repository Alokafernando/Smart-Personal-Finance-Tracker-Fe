import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PlusCircle, FileText, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

/* Sample Line Chart Data */
const sampleData = [
  { month: "Jan", balance: 800 },
  { month: "Feb", balance: 950 },
  { month: "Mar", balance: 700 },
  { month: "Apr", balance: 1250 },
  { month: "May", balance: 900 },
  { month: "Jun", balance: 1100 },
  { month: "Jul", balance: 1450 },
];

export default function HomePage() {
  /* Example financial data (replace with API data later) */
  const transactions = [
    { id: 1, title: "Salary - November", amount: 2500, type: "income" },
    { id: 2, title: "Electricity Bill", amount: -85.3, type: "expense" },
    { id: 3, title: "Freelance Payment", amount: 600, type: "income" },
    { id: 4, title: "Grocery Shopping", amount: -125.8, type: "expense" },
  ];

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    const balance = income - expense;
    return { income, expense, balance };
  }, [transactions]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full overflow-y-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Welcome Back 👋</h1>
        <p className="text-gray-500 text-sm">Here’s an overview of your finances</p>
      </header>

      {/* Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Total Income</p>
              <h2 className="text-2xl font-semibold text-green-600 mt-1">
                Rs {totals.income.toFixed(2)}
              </h2>
            </div>
            <ArrowUpCircle className="text-green-600" size={28} />
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Total Expense</p>
              <h2 className="text-2xl font-semibold text-red-600 mt-1">
                Rs {totals.expense.toFixed(2)}
              </h2>
            </div>
            <ArrowDownCircle className="text-red-600" size={28} />
          </div>
        </div>

        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">Balance</p>
              <h2 className="text-2xl font-semibold text-blue-600 mt-1">
                Rs {totals.balance.toFixed(2)}
              </h2>
            </div>
            <FileText className="text-blue-600" size={28} />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="flex flex-wrap gap-3 mb-10">
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
          <PlusCircle size={18} /> Add Income
        </button>
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow">
          <PlusCircle size={18} /> Add Expense
        </button>
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg shadow">
          <FileText size={18} /> View Reports
        </button>
      </section>

      {/* Chart + Recent Transactions */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white border rounded-xl shadow-sm p-5">
          <h3 className="font-medium mb-3 text-gray-800">Balance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={sampleData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563EB"
                  strokeWidth={3}
                  animationDuration={800}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border rounded-xl shadow-sm p-5">
          <h3 className="font-medium mb-3 text-gray-800">Recent Transactions</h3>
          <div className="space-y-3">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="flex justify-between items-center py-2 border-b last:border-none"
              >
                <div>
                  <p className="font-medium text-gray-700">{t.title}</p>
                  <p className="text-xs text-gray-400">2025-11-25</p>
                </div>
                <p
                  className={`font-semibold ${
                    t.amount > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {t.amount > 0
                    ? `+ Rs ${t.amount.toFixed(2)}`
                    : `- Rs ${Math.abs(t.amount).toFixed(2)}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
