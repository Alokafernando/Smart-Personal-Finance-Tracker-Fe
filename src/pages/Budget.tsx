import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, PieChart, Wallet, TrendingUp, AlertCircle, X, DollarSign, Calendar } from "lucide-react"
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
      console.error(err)

      if (err.response && err.response.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Failed to add budget",
          text: "Budget already exists for this category",
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

  const updateBudget = async () => {
    if (!editBudget || !editBudget._id) return

    try {
      const updated = await updateBudgetApi(editBudget._id, editBudget)

      setBudgets(budgets.map((b) => (b._id === updated._id ? updated : b)))
      setEditBudget(null)

      await loadAllBudgets()

      Swal.fire({
        icon: "success",
        title: "Budget updated",
        text: "Budget has been updated successfully.",
      })
    } catch (err: any) {
      console.error(err)

      if (err.response && err.response.data?.message) {
        Swal.fire({
          icon: "error",
          title: "Failed to add budget",
          text: "Budget already exists for this category",
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

  const deleteBudget = async (id?: string) => {
    if (!id) return

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this budget?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      try {
        await deleteBudgetApi(id)
        setBudgets(budgets.filter((b) => b._id !== id))

        Swal.fire({
          icon: "success",
          title: "Deleted",
          text: "Budget has been deleted successfully.",
        })
      } catch (err: any) {
        console.error(err)
        Swal.fire({
          icon: "error",
          title: "Failed to delete",
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

  // Calculate summary stats
  const totalBudgeted = budgets.reduce((sum, b) => sum + b.amount, 0)
  const totalSpent = budgets.reduce((sum, b) => sum + (b.spent || 0), 0)
  const remainingBudget = totalBudgeted - totalSpent
  const overBudgetCount = budgets.filter((b) => (b.spent || 0) > b.amount).length

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-amber-200/30 to-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-yellow-200/30 to-amber-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl text-white">
                <PieChart className="w-7 h-7" />
              </div>
              Budget Manager
            </h1>
            <p className="text-gray-500 mt-1">Track and manage your spending limits</p>
          </div>

          <button
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 rounded-xl hover:shadow-lg hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300 font-medium"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={20} /> Add Budget
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Wallet className="w-5 h-5 text-amber-600" />
              </div>
              <span className="text-gray-500 text-sm">Total Budgeted</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">Rs {totalBudgeted.toLocaleString()}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <span className="text-gray-500 text-sm">Total Spent</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">Rs {totalSpent.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 shadow-lg shadow-amber-500/20 hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/80 text-sm">Remaining</span>
            </div>
            <p className="text-2xl font-bold text-white">Rs {remainingBudget.toLocaleString()}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm border border-white/50 hover:shadow-md hover:scale-[1.02] transition-all duration-300">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-gray-500 text-sm">Over Budget</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">
              {overBudgetCount} <span className="text-sm font-normal text-gray-500">categories</span>
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/50 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-gray-500">Loading budgets...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gradient-to-r from-amber-50 to-orange-50">
                <tr>
                  <th className="p-4 text-left text-gray-600 font-semibold">Category</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Budgeted</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Spent</th>
                  <th className="p-4 text-left text-gray-600 font-semibold">Progress</th>
                  <th className="p-4 text-right text-gray-600 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {budgets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-12 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                          <PieChart className="w-8 h-8 text-amber-500" />
                        </div>
                        <p className="text-gray-500 mb-4">No budgets set yet</p>
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
                        >
                          <Plus size={16} /> Create your first budget
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  budgets.map((b, index) => {
                    const spent = b.spent ?? 0
                    const percent = Math.min((spent / b.amount) * 100, 100)
                    const isOverBudget = spent > b.amount

                    return (
                      <tr
                        key={b._id}
                        className={`border-t border-gray-100 hover:bg-amber-50/50 transition-colors ${index % 2 === 0 ? "bg-white/50" : "bg-gray-50/30"}`}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${percent < 50 ? "bg-green-500" : percent < 80 ? "bg-amber-500" : "bg-red-500"
                                }`}
                            />
                            <span className="font-medium text-gray-800">{getCategoryName(b.category_id)}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-gray-800">Rs {b.amount.toLocaleString()}</span>
                        </td>
                        <td className="p-4">
                          <span className={`font-semibold ${isOverBudget ? "text-red-600" : "text-gray-800"}`}>
                            Rs {spent.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-gray-200 h-3 rounded-full overflow-hidden">
                              <div
                                className={`h-3 rounded-full transition-all duration-500 ${percent < 50
                                    ? "bg-gradient-to-r from-green-400 to-green-500"
                                    : percent < 80
                                      ? "bg-gradient-to-r from-amber-400 to-amber-500"
                                      : "bg-gradient-to-r from-red-400 to-red-500"
                                  }`}
                                style={{ width: `${percent}%` }}
                              />
                            </div>
                            <span
                              className={`text-sm font-medium min-w-[45px] ${percent < 50 ? "text-green-600" : percent < 80 ? "text-amber-600" : "text-red-600"
                                }`}
                            >
                              {percent.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-end gap-2">
                            <button
                              className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-2 rounded-lg hover:bg-amber-200 transition-all duration-200 hover:scale-105"
                              onClick={() => setEditBudget(b)}
                            >
                              <Pencil size={16} />
                              <span className="text-sm font-medium">Edit</span>
                            </button>
                            <button
                              className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-all duration-200 hover:scale-105"
                              onClick={() => deleteBudget(b._id)}
                            >
                              <Trash2 size={16} />
                              <span className="text-sm font-medium">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <p>
            {budgets.length} budget{budgets.length !== 1 ? "s" : ""} total
          </p>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* ADD BUDGET MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Plus size={24} /> Add New Budget
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
              <div className="relative mb-4">
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-gray-50 transition-all"
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
              </div>

              <label className="block mb-2 text-sm font-medium text-gray-700">Budget Amount</label>
              <div className="relative mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <DollarSign size={18} />
                </div>
                <input
                  type="number"
                  placeholder="Enter amount"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 transition-all"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                  onClick={addBudget}
                >
                  Add Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT BUDGET MODAL */}
      {editBudget && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Pencil size={24} /> Edit Budget
              </h2>
              <button
                onClick={() => setEditBudget(null)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">Category</label>
              <div className="relative mb-4">
                <select
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-gray-50 transition-all"
                  value={editBudget.category_id?.toString() || ""}
                  onChange={(e) => setEditBudget({ ...editBudget, category_id: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id.toString()}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <label className="block mb-2 text-sm font-medium text-gray-700">Budget Amount</label>
              <div className="relative mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <DollarSign size={18} />
                </div>
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 transition-all"
                  value={editBudget.amount}
                  onChange={(e) => setEditBudget({ ...editBudget, amount: Number(e.target.value) })}
                />
              </div>

              <label className="block mb-2 text-sm font-medium text-gray-700">Amount Spent</label>
              <div className="relative mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <TrendingUp size={18} />
                </div>
                <input
                  type="number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-gray-50 transition-all"
                  value={editBudget.spent || 0}
                  onChange={(e) => setEditBudget({ ...editBudget, spent: Number(e.target.value) })}
                />
              </div>

              <label className="block mb-2 text-sm font-medium text-gray-700">Month</label>
              <div className="relative mb-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Calendar size={18} />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
                  onClick={() => setEditBudget(null)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                  onClick={updateBudget}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
