import React, { useState } from "react";
import { Plus, Pencil, Trash2, Layers } from "lucide-react";

type Category = {
  id: number;
  name: string;
  type: "Income" | "Expense";
};

const initialCategories: Category[] = [
  { id: 1, name: "Salary", type: "Income" },
  { id: 2, name: "Business", type: "Income" },
  { id: 3, name: "Food", type: "Expense" },
  { id: 4, name: "Bills", type: "Expense" },
  { id: 5, name: "Shopping", type: "Expense" },
  { id: 6, name: "Fuel", type: "Expense" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<"Income" | "Expense">("Income");

  const addCategory = () => {
    if (!newName) return;
    setCategories([
      ...categories,
      { id: Date.now(), name: newName, type: newType },
    ]);
    setNewName("");
  };

  const deleteCategory = (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Layers className="w-8 h-8 text-blue-600" />
          Categories
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Category Name"
            className="px-3 py-2 rounded-lg border border-gray-300 outline-none"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <select
            className="px-3 py-2 rounded-lg border border-gray-300 outline-none"
            value={newType}
            onChange={(e) => setNewType(e.target.value as "Income" | "Expense")}
          >
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <button
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
            onClick={addCategory}
          >
            <Plus size={20} /> Add
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr
                key={c.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4">{c.name}</td>
                <td className="p-4 font-semibold">{c.type}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button className="text-blue-600 hover:text-blue-800 transition">
                    <Pencil size={16} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 transition"
                    onClick={() => deleteCategory(c.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  No categories added.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
