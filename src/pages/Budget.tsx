import React, { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, PieChart } from "lucide-react"
import {
  getAllBudgets,
  addBudget as addBudgetApi,
  updateBudget as updateBudgetApi,
  deleteBudget as deleteBudgetApi,
} from "../services/budget"
import { getAllCategories, type Category } from "../services/category"
import type { Budget } from "../services/budget"
import Swal from "sweetalert2"


export default function BudgetPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [newCategoryId, setNewCategoryId] = useState<string>("")
  const [newAmount, setNewAmount] = useState<string>("")

  const [loading, setLoading] = useState(false)

  const [editBudget, setEditBudget] = useState<Budget | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const loadAllBudgets = async () => {
    try {
      setLoading(true)
      const budgetData = await getAllBudgets()
      setBudgets(budgetData.budgets)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const loadAllCategories = async () => {
    try {
      const categoryData = await getAllCategories()
      setCategories(categoryData.categories)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadAllCategories()
    loadAllBudgets()
  }, [])


  const addBudget = async () => {
    if (!newCategoryId) {
      Swal.fire({
        icon: "warning",
        title: "Category required",
        text: "Please select a category",
      })
      return
    }

    if (newAmount.trim() === "" || Number(newAmount) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid amount",
        text: "Please enter a valid amount",
      })
      return
    }

    try {
      const now = new Date()
      const monthString = (now.getMonth() + 1).toString().padStart(2, "0")
      const yearNumber = now.getFullYear()

      const newBudget: Budget = {
        category_id: newCategoryId,
        amount: Number(newAmount),
        month: monthString,
        year: yearNumber,
        spent: 0,
      }

      const res = await addBudgetApi(newBudget)
      console.log(res.message)

      loadAllBudgets()
      setNewCategoryId("")
      setNewAmount("")
      setShowAddModal(false)

      Swal.fire({
        icon: "success",
        title: "Budget added",
        text: "Your budget has been added successfully",
      })
    } catch (err: any) {
      console.error("Failed to add budget", err)

      if (err.response && err.response.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Failed to add budget",
          text: "Budget already exists for this category"
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed to add budget",
          text: "Something went wrong. Please try again.",
        })
      }
    }
  }


  
  const getCategoryName = (category: string | any) => {
    if (!category) return "Unknown"
    if (typeof category === "object" && category.name) return category.name
    const found = categories.find((c) => c._id.toString() === category.toString())
    return found?.name || "Unknown"
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <PieChart className="w-8 h-8 text-blue-600" />
          Budgets
        </h1>

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={20} /> Add Budget
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Budgeted</th>
                <th className="p-4 text-left">Spent</th>
                <th className="p-4 text-left">Progress</th>
                <th className="p-4 text-left">Month</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {budgets.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-500">
                    No budgets set.
                  </td>
                </tr>
              ) : (
                budgets.map((b) => {
                  const spent = b.spent ?? Math.floor(Math.random() * b.amount)
                  const percent = Math.min((spent / b.amount) * 100, 100)

                  return (
                    <tr key={b._id} className="border-t hover:bg-gray-50 transition">
                      <td className="p-4">{getCategoryName(b.category_id)}</td>
                      <td className="p-4 font-semibold">Rs {b.amount}</td>
                      <td className="p-4 font-semibold">Rs {spent}</td>
                      <td className="p-4">
                        <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                          <div
                            className={`h-4 rounded-full ${percent < 50
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
                      <td className="p-4">{b.month}</td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button
                          className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition relative group"
                          onClick={() => setEditBudget(b)}
                        >
                          <Pencil size={16} />
                          <span className="text-sm">Edit</span>
                        </button>
                        <button
                          className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition relative group"
                          onClick={() => deleteBudget(b._id)}
                        >
                          <Trash2 size={16} />
                          <span className="text-sm">Delete</span>
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* ADD BUDGET MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Add Budget</h2>

            <label className="block mb-2">Category</label>
            <select
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              value={newCategoryId}
              onChange={(e) => setNewCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label className="block mb-2">Amount</label>
            <input
              type="number"
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-200"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                onClick={addBudget}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT BUDGET MODAL */}
      {editBudget && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Budget</h2>

            <label className="block mb-2">Category</label>
            <select
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              value={editBudget.category_id}
              onChange={(e) =>
                setEditBudget({ ...editBudget, category_id: e.target.value })
              }
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>

            <label className="block mb-2">Amount</label>
            <input
              type="number"
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              value={editBudget.amount}
              onChange={(e) =>
                setEditBudget({ ...editBudget, amount: Number(e.target.value) })
              }
            />

            <label className="block mb-2">Spent</label>
            <input
              type="number"
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              value={editBudget.spent || 0}
              onChange={(e) =>
                setEditBudget({ ...editBudget, spent: Number(e.target.value) })
              }
            />

            <label className="block mb-2">Month</label>
            <input
              type="month"
              className="w-full mb-4 px-3 py-2 border rounded-lg"
              value={editBudget.month}
              onChange={(e) =>
                setEditBudget({ ...editBudget, month: e.target.value })
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
  )
}
