import React, { useState, useMemo } from "react";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

/* ---------------------------------------------
   Types
--------------------------------------------- */
type Transaction = {
  id: number;
  title: string;
  category: string;
  date: string;
  amount: number;
};

/* ---------------------------------------------
   Component
--------------------------------------------- */
export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, title: "Salary - November", category: "Income", date: "2025-11-25", amount: 2500 },
    { id: 2, title: "Grocery Shopping", category: "Food", date: "2025-11-24", amount: -120.5 },
    { id: 3, title: "Uber Ride", category: "Transport", date: "2025-11-23", amount: -15.2 },
    { id: 4, title: "Electricity Bill", category: "Bills", date: "2025-11-21", amount: -80.0 },
    { id: 5, title: "Freelance Work", category: "Income", date: "2025-11-18", amount: 560 },
  ]);

  /* Filtered results */
  const filteredTx = useMemo(
    () =>
      transactions.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase())
      ),
    [transactions, search]
  );

  /* Delete Transaction */
  const handleDelete = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Transactions</h1>
          <p className="text-gray-500 text-sm">Manage and review your financial records</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-2 top-2.5 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm shadow">
            <Plus size={16} />
            Add Transaction
          </button>
        </div>
      </header>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-right">Amount (Rs)</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredTx.length > 0 ? (
              filteredTx.map((t) => (
                <tr
                  key={t.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {t.title}
                  </td>
                  <td className="py-3 px-4 text-gray-600">{t.category}</td>
                  <td className="py-3 px-4 text-gray-600">{t.date}</td>
                  <td
                    className={`py-3 px-4 text-right font-semibold ${
                      t.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {t.amount > 0
                      ? `+${t.amount.toFixed(2)}`
                      : `-${Math.abs(t.amount).toFixed(2)}`}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-6 italic"
                >
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg shadow-sm p-4">
          <p className="text-xs text-gray-400">Total Income</p>
          <h3 className="text-xl font-semibold text-green-600">
            Rs{" "}
            {transactions
              .filter((t) => t.amount > 0)
              .reduce((s, t) => s + t.amount, 0)
              .toFixed(2)}
          </h3>
        </div>
        <div className="bg-white border rounded-lg shadow-sm p-4">
          <p className="text-xs text-gray-400">Total Expense</p>
          <h3 className="text-xl font-semibold text-red-600">
            Rs{" "}
            {transactions
              .filter((t) => t.amount < 0)
              .reduce((s, t) => s + Math.abs(t.amount), 0)
              .toFixed(2)}
          </h3>
        </div>
        <div className="bg-white border rounded-lg shadow-sm p-4">
          <p className="text-xs text-gray-400">Net Balance</p>
          <h3 className="text-xl font-semibold text-blue-600">
            Rs{" "}
            {(
              transactions
                .filter((t) => t.amount > 0)
                .reduce((s, t) => s + t.amount, 0) -
              transactions
                .filter((t) => t.amount < 0)
                .reduce((s, t) => s + Math.abs(t.amount), 0)
            ).toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}
