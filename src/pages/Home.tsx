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
  Legend,
} from "recharts";
import {
  PlusCircle,
  FileText,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

const chartData = [
  { month: "Jan", balance: 800 },
  { month: "Feb", balance: 950 },
  { month: "Mar", balance: 700 },
  { month: "Apr", balance: 1250 },
  { month: "May", balance: 900 },
  { month: "Jun", balance: 1100 },
  { month: "Jul", balance: 1450 },
];

const categories = [
  { category: "Food", amount: 14000, target: 15000 },
  { category: "Bills", amount: 16500, target: 18000 },
  { category: "Shopping", amount: 8000, target: 10000 },
  { category: "Fuel", amount: 7000, target: 9000 },
];

const COLORS = ["#4F46E5", "#22C55E", "#F97316", "#EF4444"];

export default function HomePage() {
  const transactions = [
    { id: 1, title: "Salary - Nov", amount: 2500, type: "income", date: "2025-11-28" },
    { id: 2, title: "Electricity Bill", amount: -85.3, type: "expense", date: "2025-11-26" },
    { id: 3, title: "Freelance Payment", amount: 600, type: "income", date: "2025-11-23" },
    { id: 4, title: "Grocery Shopping", amount: -125.8, type: "expense", date: "2025-11-22" },
    { id: 5, title: "Internet Bill", amount: -75.5, type: "expense", date: "2025-11-21" },
    { id: 6, title: "Bonus", amount: 1000, type: "income", date: "2025-11-20" },
  ];

  const totals = useMemo(() => {
    const income = transactions.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0);
    const expense = transactions.filter(t => t.amount < 0).reduce((a, b) => a + Math.abs(b.amount), 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 p-6">
      
      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          Smart Finance Dashboard
        </h1>
        <p className="text-gray-500 mt-1">
          Track your income, expenses & spending patterns.
        </p>
      </header>

      {/* Totals Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[
          { label: "Total Income", value: totals.income, color: "green", icon: <ArrowUpCircle size={34} /> },
          { label: "Total Expense", value: totals.expense, color: "red", icon: <ArrowDownCircle size={34} /> },
          { label: "Balance", value: totals.balance, color: "indigo", icon: <FileText size={34} /> },
        ].map((card, idx) => (
          <div
            key={idx}
            className="backdrop-blur-xl bg-white/70 shadow-md border border-white/30 rounded-2xl p-6 hover:shadow-lg transition duration-300"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500">{card.label}</p>
                <h2 className={`text-3xl font-semibold text-${card.color}-600 mt-1`}>
                  Rs {card.value.toFixed(2)}
                </h2>
              </div>
              <div className={`text-${card.color}-600`}>{card.icon}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section className="flex flex-wrap gap-4 mb-12">
        <button className="px-5 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 flex items-center gap-2 transition duration-200">
          <PlusCircle size={18} /> Add Income
        </button>
        <button className="px-5 py-2 bg-red-500 text-white rounded-xl shadow hover:bg-red-600 flex items-center gap-2 transition duration-200">
          <PlusCircle size={18} /> Add Expense
        </button>
        <button className="px-5 py-2 bg-gray-900 text-white rounded-xl shadow hover:bg-black flex items-center gap-2 transition duration-200">
          <FileText size={18} /> Reports
        </button>
      </section>

      {/* Charts & Recent Transactions */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Balance Trend */}
        <div className="lg:col-span-2 backdrop-blur-xl bg-white/70 rounded-2xl border border-white/30 shadow-md p-6 hover:shadow-lg transition duration-300">
          <h3 className="font-semibold mb-4 text-gray-800 text-lg">Balance Trend</h3>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value:number) => `Rs ${value}`} />
                <Line type="monotone" dataKey="balance" stroke="#4F46E5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions & Category Spending */}
        <div className="backdrop-blur-xl bg-white/70 rounded-2xl border border-white/30 shadow-md p-6 hover:shadow-lg transition duration-300 flex flex-col gap-6">
          
          {/* Recent Transactions */}
          <div>
            <h3 className="font-semibold text-gray-800 text-lg mb-3">Recent Transactions</h3>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="font-medium text-gray-700">{t.title}</p>
                    <p className="text-xs text-gray-400">{t.date}</p>
                  </div>
                  <p className={`font-semibold text-sm ${t.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                    {t.amount > 0 ? `+ Rs ${t.amount.toFixed(2)}` : `- Rs ${Math.abs(t.amount).toFixed(2)}`}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-3">
              <Link to="/transactions" className="text-blue-600 hover:underline font-medium">More &gt;</Link>
            </div>
          </div>

          {/* Category Spending */}
          <div>
            <h4 className="font-semibold text-gray-800 text-lg mb-3">Category Spending</h4>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((c, index) => {
                const usedPercent = Math.min((c.amount / c.target) * 100, 100);
                return (
                  <div key={c.category} className="bg-gray-50 p-3 rounded-xl shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between mb-1">
                      <p className="font-medium text-gray-700">{c.category}</p>
                      <p className="text-sm text-gray-500">{usedPercent.toFixed(0)}%</p>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full">
                      <div
                        className={`h-3 rounded-full ${usedPercent > 100 ? "bg-red-500" : "bg-blue-600"}`}
                        style={{ width: `${usedPercent}%` }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-500">
                      Rs {c.amount} / Rs {c.target}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-3">
              <Link to="/categories" className="text-blue-600 hover:underline font-medium">More &gt;</Link>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
}
