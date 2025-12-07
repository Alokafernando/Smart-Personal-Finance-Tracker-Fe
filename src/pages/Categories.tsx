import { useEffect, useState } from "react"
import { Plus, Pencil, Trash2, Layers, X } from "lucide-react"
import api from "../services/api"
import { addCategories, getAllCategories } from "../services/category"
import type { Category } from "../services/category"
import Swal from "sweetalert2"


export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  // Add category
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

    // duplicate check
    const exists = categories.some(
      (c) => c.name.trim().toLowerCase() === newName.trim().toLowerCase()
    )

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
        confirmButtonColor: "#3085d6",
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

  const updateCategory = async () => {
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

      const res = await api.put(`/category/${editId}`, body)
      console.log(res.data.message)

      await loadCategories()

      Swal.fire({
        icon: "success",
        title: "Updated",
        text: "Category updated successfully!",
      })

      setIsEditModalOpen(false)
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: err?.response?.data?.message || "Something went wrong!",
      })
    }
  }

  const deleteCategory = async (categoryId: string, isDefault: boolean) => {

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
      text: `Do you want to delete this category ?`,
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    })

    if (!result.isConfirmed) return

    try {
      const res = await api.delete(`/category/${categoryId}`)
      console.log(res.data.message);

      await loadCategories()

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Category deleted successfully.",
        confirmButtonColor: "#3085d6",
      })
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text: err?.response?.data?.message || "Something went wrong!",
      })
    }
  }


  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Layers className="w-8 h-8 text-blue-600" />
          Categories
        </h1>

        <button
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={20} /> Add Category
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 uppercase tracking-wide text-sm font-semibold">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800 text-base">
            {categories.map((c) => (
              <tr key={c._id} className="border-t hover:bg-gray-50 transition-all">
                <td className="p-4 flex items-center gap-3 font-medium">
                  <span className="text-2xl">{c.icon}</span>
                  <span className="font-semibold">{c.name}</span>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${c.type === "INCOME"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                      }`}
                  >
                    {c.type === "INCOME" ? "Income" : "Expense"}
                  </span>
                </td>
                <td className="p-4 text-right flex justify-end gap-3">
                  {!c.is_default && (
                    <>
                      <button
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition flex items-center gap-1 text-sm font-medium"
                        onClick={() => openEditModal(c)}
                      >
                        <Pencil size={16} /> Edit
                      </button>

                      <button
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition flex items-center gap-1 text-sm font-medium"
                        onClick={() => deleteCategory(c._id, c.is_default)}
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {categories.length === 0 && (
              <tr>
                <td colSpan={3} className="p-6 text-center text-gray-500 italic">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">Add Category</h2>

            <label className="block mb-3">
              <span className="text-gray-700 font-medium">Name</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Shopping"
              />
            </label>

            <label className="block mb-3">
              <span className="text-gray-700 font-medium">Type</span>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                value={newType}
                onChange={(e) =>
                  setNewType(e.target.value as "INCOME" | "EXPENSE")
                }
              >
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
              </select>
            </label>

            <label className="block mb-6">
              <span className="text-gray-700 font-medium">Icon</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                value={newIcon}
                onChange={(e) => setNewIcon(e.target.value)}
                placeholder="🍔"
              />
            </label>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={addCategory}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">

            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={() => setIsEditModalOpen(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">Edit Category</h2>

            <label className="block mb-3">
              <span className="text-gray-700 font-medium">Name</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </label>

            <label className="block mb-3">
              <span className="text-gray-700 font-medium">Type</span>
              <select
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                value={editType}
                onChange={(e) => setEditType(e.target.value as "INCOME" | "EXPENSE")}
              >
                <option value="INCOME">Income</option>
                <option value="EXPENSE">Expense</option>
              </select>
            </label>

            <label className="block mb-6">
              <span className="text-gray-700 font-medium">Icon</span>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                value={editIcon}
                onChange={(e) => setEditIcon(e.target.value)}
              />
            </label>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={updateCategory}
              >
                Update
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}
