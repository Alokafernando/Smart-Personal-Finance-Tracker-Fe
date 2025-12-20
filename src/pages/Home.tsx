"use client"

import { useEffect, useMemo, useState } from "react"
import axios from "axios"
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
import { getAllTransactions } from "../services/transaction"
import { getAllCategories } from "../services/category"

const COLORS = ["#F59E0B", "#22C55E", "#F97316", "#EF4444"]

export default function HomePage() {
  const [transactions, setTransactions] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [chartData, setChartData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const [txRes, catRes, chartRes] = await Promise.all([
          getAllTransactions(),
          getAllCategories(),
          axios.get("/api/chart-data"),
        ])

        // Normalize data
        const transactionsData = Array.isArray(txRes)
          ? txRes
          : Array.isArray(txRes?.data)
            ? txRes.data
            : []

        const categoriesData = Array.isArray(catRes)
          ? catRes
          : Array.isArray(catRes?.data)
            ? catRes.data
            : []

        const chartDataRes = Array.isArray(chartRes?.data) ? chartRes.data : []

        setTransactions(transactionsData)
        setCategories(categoriesData)
        setChartData(chartDataRes)
      } catch (err) {
        console.error("Failed to load dashboard data", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])


  const totals = useMemo(() => {
    if (!Array.isArray(transactions)) return { income: 0, expense: 0, balance: 0 }

    const income = transactions.filter(t => t.amount > 0).reduce((a, b) => a + b.amount, 0)
    const expense = transactions.filter(t => t.amount < 0).reduce((a, b) => a + Math.abs(b.amount), 0)

    return { income, expense, balance: income - expense }
  }, [transactions])


  const pieData = categories?.map(c => ({ name: c.category, value: c.amount })) || []

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-600 font-bold text-xl">
        Loading dashboard...
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Decorative Background */}
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
          {/* Income */}
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

          {/* Expense */}
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

          {/* Balance */}
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

        {/* Charts & Transactions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Line Chart */}
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
                <LineChart data={chartData || []}>
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
              {transactions?.slice(0, 5)?.map((t, index) => {
                const isIncome = t.type === "INCOME"
                const amountValue = Number(t.amount) || 0

                return (
                  <div
                    key={t.id ? t.id : `tx-${index}`}
                    className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-xl border border-amber-100/50 hover:border-amber-200 hover:shadow-md transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 flex items-center justify-center rounded-full ${isIncome ? "p-2 rounded-lg bg-green-100" : "p-2 rounded-lg bg-red-100"
                          }`}
                      >
                        {isIncome ? (
                          <ArrowUpCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>

                      <div>
                        <p className="font-medium text-gray-800 text-sm">{t.note || t.title}</p>
                        <p className="text-xs text-gray-400">
                          {`${new Date(t.date).getFullYear()}-${String(
                            new Date(t.date).getMonth() + 1
                          ).padStart(2, "0")}-${String(new Date(t.date).getDate()).padStart(2, "0")}`}
                        </p>

                      </div>
                    </div>

                    <p
                      className={`font-semibold text-sm ${isIncome ? "text-green-600" : "text-red-500"
                        }`}
                    >
                      {isIncome
                        ? `+Rs ${amountValue.toFixed(2)}`
                        : `-Rs ${amountValue.toFixed(2)}`}
                    </p>
                  </div>
                )
              })}
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

        {/* Category Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h3 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
              <PiggyBank className="w-5 h-5 text-amber-500" />
              Spending by Category
            </h3>
            <div className="h-72">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData || []} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                    {pieData?.map((entry, index) => (
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

          {/* Budget Progress */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <h4 className="font-semibold text-gray-800 text-lg mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-500" />
              Budget Progress
            </h4>
            <div className="space-y-4">
              {categories?.map((c, index) => {
                const usedPercent = Math.min((c.amount / c.target) * 100, 100)
                const isOverBudget = c.amount > c.target
                return (
                  <div key={c.category} className="p-4 bg-gradient-to-r from-amber-50/50 to-orange-50/50 rounded-xl border border-amber-100/50 hover:border-amber-200 hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <p className="font-medium text-gray-700">{c.category}</p>
                      </div>
                      <p className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isOverBudget ? "bg-red-100 text-red-600" : usedPercent > 80 ? "bg-amber-100 text-amber-600" : "bg-green-100 text-green-600"
                        }`}>
                        {usedPercent.toFixed(0)}%
                      </p>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${isOverBudget
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
              <Link to="/categories" className="inline-flex items-center gap-1 text-amber-600 hover:text-amber-700 font-medium text-sm group">
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
