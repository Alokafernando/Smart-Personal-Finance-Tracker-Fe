import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, } from "recharts"
import { User, TrendingUp, TrendingDown } from "lucide-react"

import {
  getAdminAnalyticsSummary,
  getAdminMonthlyAnalytics,
  getAdminTopCategories,
  getAdminUsersSummary,
} from "../../services/analytics"

const COLORS = ["#FFBB28", "#FF8042", "#4D96FF", "#00C49F", "#FF6384"]

/* ================= COMPONENT ================= */
export default function Analytics() {
  const [users, setUsers] = useState({
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
  })

  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netBalance: 0,
  })

  const [monthly, setMonthly] = useState<any[]>([])
  const [topCategories, setTopCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [
          usersRes,
          summaryRes,
          monthlyRes,
          categoriesRes,
        ] = await Promise.all([
          getAdminUsersSummary(),
          getAdminAnalyticsSummary(),
          getAdminMonthlyAnalytics(),
          getAdminTopCategories("EXPENSE", 5),
        ])

        setUsers(usersRes)
        setSummary(summaryRes)

        // Map monthly data for recharts
        setMonthly(
          monthlyRes.map((m: any) => ({
            month: `${m.month}/${m.year}`,
            income: m.totalIncome,
            expense: m.totalExpense,
          }))
        )

        setTopCategories(
          categoriesRes.map((c: any) => ({
            name: c.name,
            value: c.totalAmount,
          }))
        )
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading analytics...
      </div>
    )
  }

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <h1 className="text-3xl font-bold text-gray-800">Admin Analytics</h1>
      <p className="text-gray-500">
        Overview of users, transactions, and financial trends
      </p>

      {/* ===== USERS KPIs ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={users.totalUsers}
          icon={<User />}
          gradient="from-amber-400 to-orange-500"
        />
        <StatCard
          title="New Users (This Month)"
          value={users.newUsers}
          icon={<TrendingUp />}
          gradient="from-green-400 to-teal-500"
        />
        <StatCard
          title="Active Users"
          value={users.activeUsers}
          icon={<TrendingDown />}
          gradient="from-red-400 to-pink-500"
        />
      </div>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <ChartCard title="Monthly Income vs Expense">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={monthly}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="income" stroke="#4D96FF" strokeWidth={2} />
              <Line dataKey="expense" stroke="#FF4D4F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Top Categories */}
        <ChartCard title="Top Spending Categories">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={topCategories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
              >
                {topCategories.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* ===== Custom Legend ===== */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {topCategories.map((cat, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-gray-700 font-medium">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>

        </ChartCard>
      </div>

      {/* ===== TOTALS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <TotalCard
          title="Total Income"
          value={summary.totalIncome}
          color="text-green-600"
          bg="bg-green-50"
        />
        <TotalCard
          title="Total Expense"
          value={summary.totalExpense}
          color="text-red-600"
          bg="bg-red-50"
        />
      </div>
    </div>
  )
}

/* ================= REUSABLE COMPONENTS ================= */

function StatCard({ title, value, icon, gradient }: any) {
  return (
    <div
      className={`bg-gradient-to-r ${gradient} text-white p-6 rounded-2xl shadow hover:shadow-lg transition`}
    >
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  )
}

function ChartCard({ title, children }: any) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
      <p className="text-gray-500 font-medium mb-2">{title}</p>
      {children}
    </div>
  )
}

function TotalCard({ title, value, color, bg }: any) {
  return (
    <div className={`${bg} rounded-2xl p-6 shadow hover:shadow-lg transition`}>
      <p className="text-gray-500 font-medium">{title}</p>
      <p className={`text-2xl font-bold ${color}`}>
        {value.toLocaleString()} LKR
      </p>
    </div>
  )
}
