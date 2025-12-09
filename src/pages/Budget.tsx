import React, { useState } from "react";
import { Plus, Pencil, Trash2, PieChart } from "lucide-react";

type Budget = {
  id: number;
  category: string;
  amount: number;
  spent: number;
};

const initialBudgets: Budget[] = [
  { id: 1, category: "Food", amount: 15000, spent: 12000 },
  { id: 2, category: "Bills", amount: 20000, spent: 16500 },
  { id: 3, category: "Shopping", amount: 10000, spent: 8000 },
  { id: 4, category: "Fuel", amount: 8000, spent: 7000 },
];

export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [newCategory, setNewCategory] = useState("");
  const [newAmount, setNewAmount] = useState<number>(0);

  // Edit Modal
  const [editBudget, setEditBudget] = useState<Budget | null>(null);

  /* ADD */
  const addBudget = () => {
    if (!newCategory || newAmount <= 0) return;

    setBudgets([
      ...budgets,
      { id: Date.now(), category: newCategory, amount: newAmount, spent: 0 },
    ]);

    setNewCategory("");
    setNewAmount(0);
  };

  /* DELETE */
  const deleteBudget = (id: number) => {
    if (confirm("Are you sure you want to delete this budget?")) {
      setBudgets(budgets.filter((b) => b.id !== id));
    }
  };

  /* UPDATE */
  const updateBudget = () => {
    if (!editBudget) return;

    setBudgets(
      budgets.map((b) => (b.id === editBudget.id ? editBudget : b))
    );

    setEditBudget(null);
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <PieChart className="w-8 h-8 text-blue-600" />
          Budgets
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Category"
            className="px-3 py-2 rounded-lg border border-gray-300 outline-none"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />

          <input
            type="number"
            placeholder="Amount"
            className="px-3 py-2 rounded-lg border border-gray-300 outline-none w-32"
            value={newAmount}
            onChange={(e) => setNewAmount(Number(e.target.value))}
          />

          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={addBudget}
          >
            <Plus size={20} /> Add
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Budgeted</th>
              <th className="p-4 text-left">Spent</th>
              <th className="p-4 text-left">Progress</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {budgets.map((b) => {
              const percent = Math.min((b.spent / b.amount) * 100, 100);

              return (
                <tr key={b.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">{b.category}</td>
                  <td className="p-4 font-semibold">Rs {b.amount}</td>
                  <td className="p-4 font-semibold">{b.spent}</td>

                  <td className="p-4">
                    <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                      <div
                        className={`h-4 rounded-full ${
                          percent < 50
                            ? "bg-green-500"
                            : percent < 80
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {percent.toFixed(0)}%
                    </span>
                  </td>

                  <td className="p-4 text-right flex justify-end gap-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 transition"
                      onClick={() => setEditBudget(b)}
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => deleteBudget(b.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}

            {budgets.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No budgets set.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT MODAL */}
      {editBudget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Budget</h2>

            <label className="block mb-2">Category</label>
            <input
              type="text"
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              value={editBudget.category}
              onChange={(e) =>
                setEditBudget({ ...editBudget, category: e.target.value })
              }
            />

            <label className="block mb-2">Amount</label>
            <input
              type="number"
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              value={editBudget.amount}
              onChange={(e) =>
                setEditBudget({
                  ...editBudget,
                  amount: Number(e.target.value),
                })
              }
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200"
                onClick={() => setEditBudget(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                onClick={updateBudget}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
