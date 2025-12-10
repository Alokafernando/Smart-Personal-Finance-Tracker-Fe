"use client"

import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Layers, X, Tag, TrendingUp, TrendingDown, Grid3X3, Search } from "lucide-react"
import { addCategories, getAllCategories, updateCategory, deleteCategory } from "../services/category"
import type { Category } from "../services/category"
import Swal from "sweetalert2"

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"ALL" | "INCOME" | "EXPENSE">("ALL")

  const [newName, setNewName] = useState("")
  const [newType, setNewType] = useState<"INCOME" | "EXPENSE">("INCOME")
  const [newIcon, setNewIcon] = useState("")

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editId, setEditId] = useState("")
  const [editName, setEditName] = useState("")
  const [editType, setEditType] = useState<"INCOME" | "EXPENSE">("INCOME")
  const [editIcon, setEditIcon] = useState("")

  const loadCategories = async () => {
    try {
      const data = await getAllCategories()
      setCategories(data.categories)
    } catch (err: any) {
      console.error(err)
    }
  }

  const openEditModal = (cat: Category) => {
    setEditId(cat._id)
    setEditName(cat.name)
    setEditType(cat.type)
    setEditIcon(cat.icon)
    setIsEditModalOpen(true)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const addCategory = async () => {
    if (!newName.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Category name required",
        text: "Please enter a category name.",
      })
    }

    if (!newIcon.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Icon required",
        text: "Please choose an icon.",
      })
    }

    const exists = categories.some((c) => c.name.trim().toLowerCase() === newName.trim().toLowerCase())

    if (exists) {
      return Swal.fire({
        icon: "error",
        title: "Duplicate Category",
        text: `"${newName}" already exists! Try another name.`,
      })
    }

    try {
      const obj: any = {
        name: newName.trim(),
        type: newType,
        icon: newIcon,
      }

      const res = await addCategories(obj)
      console.log(res.message)

      await loadCategories()

      await Swal.fire({
        icon: "success",
        title: "Category Added",
        text: `${newName} created successfully!`,
        confirmButtonColor: "#f59e0b",
      })

      setNewName("")
      setNewType("INCOME")
      setNewIcon("")
      setIsModalOpen(false)
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Failed to Add",
        text: err?.response?.data?.message || "Something went wrong!",
      })
    }
  }

  const updateCategories = async () => {
    if (!editName.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Name required",
        text: "Category name cannot be empty.",
      })
    }

    if (!editIcon.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Icon required",
        text: "Please choose an icon.",
      })
    }

    try {
      const body = {
        name: editName.trim(),
        type: editType,
        icon: editIcon,
      }

      const res = await updateCategory(editId, body)
      console.log(res.message)

      await loadCategories()

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Category updated successfully!",
        confirmButtonColor: "#f59e0b",
      })

      setIsEditModalOpen(false)
    } catch (err: any) {
      console.error(err)
    }
  }

  const deleteCategories = async (categoryId: string, isDefault: boolean) => {
    if (isDefault) {
      return Swal.fire({
        icon: "error",
        title: "Cannot Delete",
        text: "Default categories cannot be deleted.",
      })
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: `Do you want to delete this category?`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    })

    if (!result.isConfirmed) return

    try {
      const res = await deleteCategory(categoryId)
      console.log(res.message)

      await loadCategories()

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Category deleted successfully.",
        confirmButtonColor: "#f59e0b",
      })
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err?.response?.data?.message || "Something went wrong!",
      })
    }
  }

  // Filter and search categories
  const filteredCategories = categories.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "ALL" || c.type === filterType
    return matchesSearch && matchesType
  })

  const incomeCount = categories.filter((c) => c.type === "INCOME").length
  const expenseCount = categories.filter((c) => c.type === "EXPENSE").length

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-yellow-200/40 to-amber-200/40 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
              <p className="text-gray-500 text-sm">Manage your income and expense categories</p>
            </div>
          </div>

          <button
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-3 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 font-medium"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={20} /> Add Category
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center">
                <Grid3X3 className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Categories</p>
                <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Income Categories</p>
                <p className="text-2xl font-bold text-emerald-600">{incomeCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-white/50 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-rose-100 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Expense Categories</p>
                <p className="text-2xl font-bold text-red-500">{expenseCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/50 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                className="w-full pl-10 pr-4 py-3 bg-white/80 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {(["ALL", "INCOME", "EXPENSE"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all ${
                    filterType === type
                      ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg"
                      : "bg-white/80 text-gray-600 hover:bg-amber-50 border border-gray-200"
                  }`}
                >
                  {type === "ALL" ? "All" : type === "INCOME" ? "Income" : "Expense"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              {filteredCategories.map((c) => (
                <div
                  key={c._id}
                  className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                          c.type === "INCOME"
                            ? "bg-gradient-to-br from-emerald-100 to-green-100"
                            : "bg-gradient-to-br from-red-100 to-rose-100"
                        }`}
                      >
                        {c.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{c.name}</h3>
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                            c.type === "INCOME" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {c.type === "INCOME" ? "Income" : "Expense"}
                        </span>
                      </div>
                    </div>
                    {c.is_default && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium">
                        Default
                      </span>
                    )}
                  </div>

                  {!c.is_default && (
                    <div className="flex gap-2 pt-3 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-all text-sm font-medium"
                        onClick={() => openEditModal(c)}
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all text-sm font-medium"
                        onClick={() => deleteCategories(c._id, c.is_default)}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tag className="w-10 h-10 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No categories found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterType !== "ALL"
                  ? "Try adjusting your search or filter"
                  : "Get started by adding your first category"}
              </p>
              {!searchTerm && filterType === "ALL" && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all shadow-lg font-medium"
                >
                  <Plus size={20} /> Add Your First Category
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-5 relative">
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Add Category</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <label className="block mb-4">
                <span className="text-gray-700 font-medium text-sm">Category Name</span>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g., Shopping"
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700 font-medium text-sm">Type</span>
                <select
                  className="mt-2 block w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as "INCOME" | "EXPENSE")}
                >
                  <option value="INCOME">Income</option>
                  <option value="EXPENSE">Expense</option>
                </select>
              </label>

              <label className="block mb-6">
                <span className="text-gray-700 font-medium text-sm">Icon (emoji)</span>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all text-2xl"
                  value={newIcon}
                  onChange={(e) => setNewIcon(e.target.value)}
                  placeholder="🍔"
                />
              </label>

              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all font-medium shadow-lg"
                  onClick={addCategory}
                >
                  Save Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-5 relative">
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                onClick={() => setIsEditModalOpen(false)}
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white">Edit Category</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <label className="block mb-4">
                <span className="text-gray-700 font-medium text-sm">Category Name</span>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </label>

              <label className="block mb-4">
                <span className="text-gray-700 font-medium text-sm">Type</span>
                <select
                  className="mt-2 block w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                  value={editType}
                  onChange={(e) => setEditType(e.target.value as "INCOME" | "EXPENSE")}
                >
                  <option value="INCOME">Income</option>
                  <option value="EXPENSE">Expense</option>
                </select>
              </label>

              <label className="block mb-6">
                <span className="text-gray-700 font-medium text-sm">Icon (emoji)</span>
                <input
                  type="text"
                  className="mt-2 block w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all text-2xl"
                  value={editIcon}
                  onChange={(e) => setEditIcon(e.target.value)}
                />
              </label>

              <div className="flex gap-3">
                <button
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all font-medium shadow-lg"
                  onClick={updateCategories}
                >
                  Update Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
