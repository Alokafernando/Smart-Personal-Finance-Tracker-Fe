"use client"

import { useMemo } from "react"
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
} from "recharts"
import {
  PlusCircle,
  FileText,
  ArrowUpCircle,
  ArrowDownCircle,
  Wallet,
  TrendingUp,
  CreditCard,
  PiggyBank,
  Target,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { Link } from "react-router-dom"

const chartData = [
  { month: "Jan", balance: 800 },
  { month: "Feb", balance: 950 },
  { month: "Mar", balance: 700 },
  { month: "Apr", balance: 1250 },
  { month: "May", balance: 900 },
  { month: "Jun", balance: 1100 },
  { month: "Jul", balance: 1450 },
]

const categories = [
  { category: "Food", amount: 14000, target: 15000 },
  { category: "Bills", amount: 16500, target: 18000 },
  { category: "Shopping", amount: 8000, target: 10000 },
  { category: "Fuel", amount: 7000, target: 9000 },
]

const COLORS = ["#F59E0B", "#22C55E", "#F97316", "#EF4444"]

export default function HomePage() {
  const transactions = [
    { id: 1, title: "Salary - Nov", amount: 2500, type: "income", date: "2025-11-28" },
    { id: 2, title: "Electricity Bill", amount: -85.3, type: "expense", date: "2025-11-26" },
    { id: 3, title: "Freelance Payment", amount: 600, type: "income", date: "2025-11-23" },
    { id: 4, title: "Grocery Shopping", amount: -125.8, type: "expense", date: "2025-11-22" },
    { id: 5, title: "Internet Bill", amount: -75.5, type: "expense", date: "2025-11-21" },
    { id: 6, title: "Bonus", amount: 1000, type: "income", date: "2025-11-20" },
  ]

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.amount > 0).reduce((a, b) => a + b.amount, 0)
    const expense = transactions.filter((t) => t.amount < 0).reduce((a, b) => a + Math.abs(b.amount), 0)
    return { income, expense, balance: income - expense }
  }, [transactions])

  const pieData = categories.map((c) => ({
    name: c.category,
    value: c.amount,
  }))

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-yellow-400/15 to-amber-500/15 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-72 h-72 bg-gradient-to-br from-orange-400/20 to-red-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 p-6 lg:p-8">
        {/* Header */}
        <header className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent">
                Smart Finance Dashboard
              </h1>
            </div>
            <p className="text-gray-600">Track your income, expenses & spending patterns.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-xl hover:bg-amber-50 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105">
              <Bell className="w-5 h-5 text-amber-600" />
            </button>
            <button className="p-2.5 bg-white/80 backdrop-blur-sm border border-amber-200/50 rounded-xl hover:bg-amber-50 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105">
              <Settings className="w-5 h-5 text-amber-600" />
            </button>
            <button className="p-2.5 bg-white/80 backdrop-blur-sm border border-red-200/50 rounded-xl hover:bg-red-50 transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105">
              <LogOut className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </header>

        {/* Totals Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {/* Income Card */}
          <div className="group relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Income</p>
                <h2 className="text-3xl font-bold text-green-600">Rs {totals.income.toFixed(2)}</h2>
                <p className="text-xs text-green-500 mt-2 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12% from last month
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl shadow-lg">
                <ArrowUpCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Expense Card */}
          <div className="group relative bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Expense</p>
                <h2 className="text-3xl font-bold text-red-500">Rs {totals.expense.toFixed(2)}</h2>
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <ArrowDownCircle className="w-3 h-3" /> -8% from last month
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-red-400 to-rose-500 rounded-xl shadow-lg">
                <ArrowDownCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <div className="group relative bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-amber-100 mb-1">Current Balance</p>
                <h2 className="text-3xl font-bold text-white">Rs {totals.balance.toFixed(2)}</h2>
                <p className="text-xs text-amber-100 mt-2 flex items-center gap-1">
                  <PiggyBank className="w-3 h-3" /> Keep saving!
                </p>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="flex flex-wrap gap-3 mb-8">
          <button className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center gap-2 transition-all duration-200 font-medium">
            <PlusCircle size={18} /> Add Income
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center gap-2 transition-all duration-200 font-medium">
            <PlusCircle size={18} /> Add Expense
          </button>
          <button className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center gap-2 transition-all duration-200 font-medium">
            <FileText size={18} /> Reports
          </button>
          <button className="px-5 py-2.5 bg-white/80 backdrop-blur-sm border border-amber-200 text-amber-700 rounded-xl shadow-md hover:shadow-lg hover:bg-amber-50 flex items-center gap-2 transition-all duration-200 font-medium">
            <Target size={18} /> Set Budget
          </button>
        </section>

        {/* Charts & Recent Transactions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Balance Trend */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-500" />
                Balance Trend
              </h3>
              <select className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20">
                <option>Last 7 months</option>
                <option>Last 12 months</option>
                <option>This year</option>
              </select>
            </div>
            <div className="h-72">
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f3f4f6" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    formatter={(value: number) => [`Rs ${value}`, "Balance"]}
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                      border: "1px solid #fcd34d",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="url(#colorGradient)"
                    strokeWidth={3}
                    dot={{ fill: "#f59e0b", strokeWidth: 2, stroke: "#fff", r: 4 }}
                    activeDot={{ r: 6, fill: "#f59e0b", stroke: "#fff", strokeWidth: 2 }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-500" />
              Recent Transactions
            </h3>
            <div className="space-y-3">
              {transactions.slice(0, 5).map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-xl border border-amber-100/50 hover:border-amber-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${t.amount > 0 ? "bg-green-100" : "bg-red-100"}`}>
                      {t.amount > 0 ? (
                        <ArrowUpCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-700 text-sm">{t.title}</p>
                      <p className="text-xs text-gray-400">{t.date}</p>
                    </div>
                  </div>
                  <p className={`font-semibold text-sm ${t.amount > 0 ? "text-green-600" : "text-red-500"}`}>
                    {t.amount > 0 ? `+Rs ${t.amount.toFixed(2)}` : `-Rs ${Math.abs(t.amount).toFixed(2)}`}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <Link
                to="/transactions"
                className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm group"
              >
                View All Transactions
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart - Category Breakdown */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-amber-500" />
              Spending by Category
            </h3>
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`Rs ${value.toLocaleString()}`, ""]}
                    contentStyle={{
                      backgroundColor: "rgba(255,255,255,0.95)",
                      border: "1px solid #fcd34d",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    formatter={(value) => <span className="text-gray-600 text-sm">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Spending Progress */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h4 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-500" />
              Budget Progress
            </h4>
            <div className="space-y-4">
              {categories.map((c, index) => {
                const usedPercent = Math.min((c.amount / c.target) * 100, 100)
                const isOverBudget = c.amount > c.target
                return (
                  <div
                    key={c.category}
                    className="p-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-xl border border-amber-100/50 hover:border-amber-200 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <p className="font-medium text-gray-700">{c.category}</p>
                      </div>
                      <p
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          isOverBudget
                            ? "bg-red-100 text-red-600"
                            : usedPercent > 80
                              ? "bg-amber-100 text-amber-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        {usedPercent.toFixed(0)}%
                      </p>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          isOverBudget
                            ? "bg-gradient-to-r from-red-400 to-red-500"
                            : usedPercent > 80
                              ? "bg-gradient-to-r from-amber-400 to-orange-500"
                              : "bg-gradient-to-r from-green-400 to-emerald-500"
                        }`}
                        style={{ width: `${usedPercent}%` }}
                      />
                    </div>
                    <div className="mt-2 flex justify-between text-sm text-gray-500">
                      <span>Rs {c.amount.toLocaleString()}</span>
                      <span>Rs {c.target.toLocaleString()}</span>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="text-center mt-4">
              <Link
                to="/categories"
                className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm group"
              >
                Manage Budgets
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
