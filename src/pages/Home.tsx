import React, { useMemo, useState } from "react";
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
} from "recharts";

/* -------------------- Sample Data -------------------- */
const sampleLine = [
  { month: "Jan", value: 1200 },
  { month: "Feb", value: 900 },
  { month: "Mar", value: 1400 },
  { month: "Apr", value: 1100 },
  { month: "May", value: 1600 },
  { month: "Jun", value: 1250 },
  { month: "Jul", value: 1500 },
];

const PIE_COLORS = ["#2563EB", "#60A5FA", "#93C5FD", "#1E3A8A"];

type Theme = "light" | "dark";

type Tx = {
  id: number;
  title: string;
  category?: string;
  date: string;
  amount: number;
};

/* Simple suggestion logic */
function suggestCategory(title: string) {
  const s = title.toLowerCase();
  if (s.includes("salary") || s.includes("payment")) return "Income";
  if (s.includes("uber") || s.includes("taxi") || s.includes("bus")) return "Transport";
  if (s.includes("grocery") || s.includes("shop")) return "Food";
  if (s.includes("electric") || s.includes("bill")) return "Bills";
  return "Other";
}

export default function UserDashboardPage(): JSX.Element {
  const [theme] = useState<Theme>("light");
  const [search, setSearch] = useState("");

  const [transactions, setTransactions] = useState<Tx[]>([
    { id: 1, title: "Salary Nov", date: "2025-11-25", amount: 2500 },
    { id: 2, title: "Grocery - Fresh Mart", date: "2025-11-24", amount: -123.5 },
    { id: 3, title: "Uber Ride", date: "2025-11-23", amount: -14.9 },
    { id: 4, title: "Electricity Bill", date: "2025-11-21", amount: -78.25 },
    { id: 5, title: "Freelance Payment", date: "2025-11-18", amount: 593.0 },
  ]);

  const totals = useMemo(() => {
    const income = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
    const expense = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);
    const balance = income - expense;
    return { income, expense, balance };
  }, [transactions]);

  const pieData = useMemo(() => {
    const map = new Map<string, number>();
    transactions.forEach((t) => {
      const cat = suggestCategory(t.title);
      const v = map.get(cat) ?? 0;
      map.set(cat, v + Math.abs(t.amount));
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [transactions]);

  const displayedTx = transactions.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 text-slate-900 p-8 w-full overflow-y-auto">

      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Smart Personal Finance Tracker</h1>
          <p className="text-sm text-slate-500 mt-1">Overview of your finances</p>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions..."
          className="px-3 py-2 rounded-lg border w-64 focus:ring-2 focus:ring-blue-200"
        />
      </header>

      {/* Summary cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <article className="bg-white p-5 rounded-lg shadow-sm border">
          <p className="text-xs text-slate-400">Total Income</p>
          <h2 className="text-2xl font-semibold mt-1">Rs {totals.income.toFixed(2)}</h2>
        </article>

        <article className="bg-white p-5 rounded-lg shadow-sm border">
          <p className="text-xs text-slate-400">Total Expense</p>
          <h2 className="text-2xl font-semibold mt-1">Rs {totals.expense.toFixed(2)}</h2>
        </article>

        <article className="bg-white p-5 rounded-lg shadow-sm border">
          <p className="text-xs text-slate-400">Balance</p>
          <h2 className="text-2xl font-semibold mt-1">Rs {totals.balance.toFixed(2)}</h2>
        </article>
      </section>

      {/* Charts + Transactions */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Line Chart + transactions */}
        <div className="lg:col-span-2 space-y-6">

          {/* Line chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-medium mb-2">Monthly Trend</h3>

            <div className="h-56">
              <ResponsiveContainer>
                <LineChart data={sampleLine}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563EB"
                    strokeWidth={3}
                    animationDuration={800}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent transactions */}
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-medium mb-3">Recent Transactions</h3>

            <div className="space-y-2 max-h-56 overflow-auto">
              {displayedTx.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between p-2 rounded hover:bg-gray-50"
                >
                  <div>
                    <div className="font-medium">{t.title}</div>
                    <div className="text-xs text-slate-400">
                      {t.date} • {suggestCategory(t.title)}
                    </div>
                  </div>

                  <div
                    className={`font-semibold ${
                      t.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.amount > 0
                      ? `+ Rs ${t.amount.toFixed(2)}`
                      : `- Rs ${Math.abs(t.amount).toFixed(2)}`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pie chart */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <h3 className="font-medium mb-3">Category Breakdown</h3>

            <div className="h-48">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={40}
                    outerRadius={70}
                    animationDuration={800}
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
