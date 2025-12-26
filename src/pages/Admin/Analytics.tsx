"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { User, TrendingUp, TrendingDown, Tag } from "lucide-react"

// ================= MOCK DATA =================
const userStats = {
  totalUsers: 120,
  newUsers: 15,
  activeUsers: 105,
}

const transactionsStats = {
  totalIncome: 750000,
  totalExpense: 520000,
  topCategories: [
    { name: "Food", value: 150000 },
    { name: "Shopping", value: 120000 },
    { name: "Travel", value: 80000 },
  ],
  monthlyTrend: [
    { month: "Jan", income: 60000, expense: 45000 },
    { month: "Feb", income: 70000, expense: 50000 },
    { month: "Mar", income: 65000, expense: 48000 },
    { month: "Apr", income: 72000, expense: 52000 },
  ],
}

const COLORS = ["#FFBB28", "#FF8042", "#4D96FF"]

// ================= COMPONENT =================
export default function Analytics() {
  const [users] = useState(userStats)
  const [transactions] = useState(transactionsStats)

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <h1 className="text-3xl font-bold text-gray-800">Admin Analytics</h1>
      <p className="text-gray-500">Overview of users, transactions, and category trends</p>

      {/* ===== KPIs ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <User className="w-6 h-6" />
            <div>
              <p className="text-sm font-medium">Total Users</p>
              <p className="text-2xl font-bold">{users.totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <TrendingUp className="w-6 h-6" />
            <div>
              <p className="text-sm font-medium">New Users (This Month)</p>
              <p className="text-2xl font-bold">{users.newUsers}</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-6 rounded-2xl shadow hover:shadow-lg transition">
          <div className="flex items-center gap-4">
            <TrendingDown className="w-6 h-6" />
            <div>
              <p className="text-sm font-medium">Active Users</p>
              <p className="text-2xl font-bold">{users.activeUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Transactions Charts ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income vs Expense */}
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <p className="text-gray-500 font-medium mb-2">Monthly Income vs Expense</p>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transactions.monthlyTrend}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="income" stroke="#4D96FF" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#FF4D4F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Categories Pie */}
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
          <p className="text-gray-500 font-medium mb-2">Top Spending Categories</p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={transactions.topCategories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {transactions.topCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===== Income vs Expense Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-green-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
          <p className="text-gray-500 font-medium">Total Income</p>
          <p className="text-2xl font-bold text-green-600">{transactions.totalIncome.toLocaleString()} LKR</p>
        </div>
        <div className="bg-red-50 rounded-2xl p-6 shadow hover:shadow-lg transition">
          <p className="text-gray-500 font-medium">Total Expense</p>
          <p className="text-2xl font-bold text-red-600">{transactions.totalExpense.toLocaleString()} LKR</p>
        </div>
      </div>
    </div>
  )
}
