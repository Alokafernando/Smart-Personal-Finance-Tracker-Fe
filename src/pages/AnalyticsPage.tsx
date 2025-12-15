import { useEffect, useState } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Area, AreaChart, } from "recharts"
import { BarChart3, PieChartIcon, TrendingUp, TrendingDown, DollarSign, Wallet, ArrowUpRight, ArrowDownRight, Download, Filter, } from "lucide-react"
import { getAnalytics } from "../services/analytics"
import type { AnalyticsSummary, MonthlyAnalytics, CategoryAnalytics, AnalyticsFilter, } from "../services/analytics"

const PIE_COLORS = ["#f59e0b", "#fb923c", "#fbbf24", "#d97706", "#fcd34d"]

export default function AnalyticsPage() {
    const [summary, setSummary] = useState<AnalyticsSummary | null>(null)
    const [monthlyData, setMonthlyData] = useState<MonthlyAnalytics[]>([])
    const [categoryData, setCategoryData] = useState<CategoryAnalytics[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear())

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const fetchAnalytics = async (filter?: AnalyticsFilter) => {
        try {
            setLoading(true)
            setError(null)

            const data = await getAnalytics(filter)

            setSummary({
                ...data.summary,
                savingsRate: Number(data.summary.savingsRate) || 0,
            })
            setMonthlyData(data.monthly)
            setCategoryData(data.categories)
        } catch (err) {
            console.error("Analytics fetch failed:", err)
            setError("Failed to load analytics data")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const sortedData = [...monthlyData].sort(
        (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
    )

    if (loading) {
        return (
            <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
                    <p className="mt-4 text-gray-600">Loading analytics...</p>
                </div>
            </div>
        )
    }

    if (error || !summary) {
        return (
            <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">{error || "Failed to load data"}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full overflow-y-auto bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative">
            {/* Background decorative elements */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-40 left-10 w-64 h-64 bg-gradient-to-br from-yellow-200/30 to-amber-200/30 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 p-6 md:p-8">
                {/* Header */}
                <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                            <BarChart3 className="text-white" size={26} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Revenue Analytics</h1>
                            <p className="text-gray-500 text-sm">Track your financial performance</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsFilterOpen(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            <Filter size={18} />
                            <span className="text-sm font-medium">Filter</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-white hover:shadow-lg transition-all shadow-md">
                            <Download size={18} />
                            <span className="text-sm font-medium">Export</span>
                        </button>
                    </div>
                </header>

                {/* Summary Cards */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                    {/* Total Income Card */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 bg-emerald-100 rounded-xl group-hover:scale-110 transition-transform">
                                <TrendingUp className="text-emerald-600" size={20} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                <ArrowUpRight size={12} />
                                12.5%
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Income</p>
                        <h2 className="text-2xl font-bold text-gray-800 mt-1">Rs {summary.income.toLocaleString()}</h2>
                    </div>

                    {/* Total Expense Card */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 bg-red-100 rounded-xl group-hover:scale-110 transition-transform">
                                <TrendingDown className="text-red-600" size={20} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-full">
                                <ArrowDownRight size={12} />
                                8.3%
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Expense</p>
                        <h2 className="text-2xl font-bold text-gray-800 mt-1">Rs {summary.expense.toLocaleString()}</h2>
                    </div>

                    {/* Net Balance Card - Gradient Style */}
                    <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 bg-white/20 rounded-xl group-hover:scale-110 transition-transform">
                                <Wallet className="text-white" size={20} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-white/90 bg-white/20 px-2 py-1 rounded-full">
                                <ArrowUpRight size={12} />
                                {summary.balance >= 0 ? "Positive" : "Negative"}
                            </span>
                        </div>
                        <p className="text-xs text-white/80 font-medium uppercase tracking-wide">Net Balance</p>
                        <h2 className="text-2xl font-bold text-white mt-1">Rs {summary.balance.toLocaleString()}</h2>
                    </div>

                    {/* Savings Rate Card */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 group">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-2.5 bg-amber-100 rounded-xl group-hover:scale-110 transition-transform">
                                <DollarSign className="text-amber-600" size={20} />
                            </div>
                            <span className="flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                                {summary.savingsRate >= 20 ? "Good" : summary.savingsRate >= 10 ? "Fair" : "Low"}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Savings Rate</p>
                        <h2 className="text-2xl font-bold text-gray-800 mt-1">{summary.savingsRate.toFixed(1)}%</h2>
                    </div>
                </section>

                {/* Charts Grid */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Area Chart: Income vs Expense */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm p-6 lg:col-span-2 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
                                    <TrendingUp size={18} className="text-amber-600" />
                                </div>
                                Income vs Expense Trend
                            </h3>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                                    Income
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-red-500"></span>
                                    Expense
                                </span>
                            </div>
                        </div>
                        <div className="h-72">
                            <ResponsiveContainer>
                                <AreaChart data={sortedData}>
                                    <defs>
                                        <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                    <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                                    <YAxis stroke="#9ca3af" fontSize={12} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "none",
                                            borderRadius: "12px",
                                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                        }}
                                    />
                                    <Area type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} fill="url(#incomeGradient)" />
                                    <Area type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={3} fill="url(#expenseGradient)" />
                                </AreaChart>

                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Pie Chart: Category Breakdown */}
                    <div className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                        <h3 className="font-semibold text-gray-800 mb-5 flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
                                <PieChartIcon size={18} className="text-amber-600" />
                            </div>
                            Expense by Category
                        </h3>
                        <div className="h-56">
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        dataKey="value"
                                        innerRadius={50}
                                        outerRadius={85}
                                        paddingAngle={4}
                                        animationDuration={800}
                                    >
                                        {categoryData.map((_, i) => (
                                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: "white",
                                            border: "none",
                                            borderRadius: "12px",
                                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        {/* Category Legend */}
                        <div className="mt-4 space-y-2">
                            {categoryData.map((cat, i) => (
                                <div key={cat.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                                        />
                                        <span className="text-gray-600">{cat.name}</span>
                                    </div>
                                    <span className="font-medium text-gray-800">Rs {cat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bar Chart: Monthly Summary */}
                <section className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-2xl shadow-sm p-6 mt-6 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                            <div className="p-2 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg">
                                <BarChart3 size={18} className="text-amber-600" />
                            </div>
                            Monthly Comparison
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"></span>
                                Income
                            </span>
                            <span className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-gray-300"></span>
                                Expense
                            </span>
                        </div>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer>
                            <BarChart data={sortedData} barGap={8}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                                <YAxis stroke="#9ca3af" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: "white",
                                        border: "none",
                                        borderRadius: "12px",
                                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                                    }}
                                />
                                <Bar dataKey="income" fill="url(#barGradient)" name="Income" radius={[6, 6, 0, 0]} />
                                <Bar dataKey="expense" fill="#e5e7eb" name="Expense" radius={[6, 6, 0, 0]} />
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#f59e0b" />
                                        <stop offset="100%" stopColor="#ea580c" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </section>
            </div>

            {isFilterOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 relative">
                        {/* Close */}
                        <button
                            onClick={() => setIsFilterOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>

                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Filter Analytics
                        </h2>

                        {/* Month */}
                        <div className="mb-4">
                            <label className="text-sm text-gray-600 font-medium">Month</label>
                            <select
                                value={selectedMonth ?? ""}
                                onChange={(e) =>
                                    setSelectedMonth(e.target.value ? Number(e.target.value) : null)
                                }
                                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="">All Months</option>
                                {monthOrder.map((m, i) => (
                                    <option key={m} value={i + 1}>
                                        {m}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Year */}
                        <div className="mb-6">
                            <label className="text-sm text-gray-600 font-medium">Year</label>
                            <input
                                type="number"
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(Number(e.target.value))}
                                className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setSelectedMonth(null)
                                    setSelectedYear(new Date().getFullYear())
                                    fetchAnalytics() 
                                    setIsFilterOpen(false)
                                }}
                                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
                            >
                                Reset
                            </button>

                            <button
                                onClick={() => {
                                    const filter: AnalyticsFilter = {}

                                    if (selectedMonth) filter.month = selectedMonth
                                    if (selectedYear) filter.year = selectedYear

                                    fetchAnalytics(filter)
                                    setIsFilterOpen(false)
                                }}
                                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}