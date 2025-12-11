import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Plus, Edit2, Trash2, Search, TrendingUp, TrendingDown, Wallet, Filter, ArrowUpDown, Receipt, Calendar, Camera, Upload, Scan, Sparkles, X, Check, Loader2, ImageIcon, } from "lucide-react"
import { createTransaction, getAllTransactions, type Transaction } from "../services/transaction"
import { getAllCategories, type Category } from "../services/category"

import Swal from "sweetalert2"



const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
  //income
  Salary: { bg: "bg-violet-100", text: "text-violet-700", icon: "bg-violet-200" },
  Business: { bg: "bg-indigo-100", text: "text-indigo-700", icon: "bg-indigo-200" },
  Investments: { bg: "bg-green-100", text: "text-green-700", icon: "bg-green-200" },

  //expense
  Food: { bg: "bg-amber-100", text: "text-amber-700", icon: "bg-amber-200" },
  Shopping: { bg: "bg-pink-100", text: "text-pink-700", icon: "bg-pink-200" },
  Fuel: { bg: "bg-sky-100", text: "text-sky-700", icon: "bg-sky-200" },
  Bills: { bg: "bg-red-100", text: "text-red-700", icon: "bg-red-200" },
  Entertainment: { bg: "bg-blue-100", text: "text-blue-700", icon: "bg-blue-200" },

  //other
  Other: { bg: "bg-gray-100", text: "text-gray-700", icon: "bg-gray-200" },
}


export default function TransactionsPage() {
  const [search, setSearch] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [categories, setCategories] = useState<{
    [x: string]: string
    _id: string,
    name: string
  }[]>([])


  // Add Transaction modal / OCR modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showOCRModal, setShowOCRModal] = useState(false)
  const [ocrStep, setOcrStep] = useState<"upload" | "scanning" | "review">("upload")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [ocrResult, setOcrResult] = useState<{
    merchant: string
    amount: string
    date: string
    category: string
    aiSuggested: boolean
  } | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const [newTransaction, setNewTransaction] = useState({
    title: "",
    category: "",
    date: new Date().toISOString().split("T")[0], //2025-12-11T08:14:30.123Z -> 2025-12-11
    amount: "",
  })

  const loadAllTransaction = async () => {
    try {
      const data = await getAllTransactions()
      setTransactions(data)
    } catch (err) {
      console.error(err)
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
    loadAllTransaction()
  }, [])


  const filteredTx = transactions.filter((t) =>
    (t.note || "").toLowerCase().includes(search.toLowerCase())
  )


  const handleAddManualTransaction = async () => {
    if (!newTransaction.title) {
      return Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill title field before saving.",
      })
    }

    if (!newTransaction.amount) {
      return Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please fill amount field before saving.",
      })
    }

    if (!newTransaction.category) {
      return Swal.fire({
        icon: "warning",
        title: "Missing fields",
        text: "Please select category before saving.",
      })
    }

    const selectedCategory = categories.find(
      (cat) => cat._id === newTransaction.category
    )

    if (!selectedCategory) {
      return Swal.fire({
        icon: "error",
        title: "Invalid category",
        text: "Selected category not found.",
      })
    }

    const type = (selectedCategory as any).type || "EXPENSE"


    try {
      const obj = {
        category_id: newTransaction.category,
        amount: Number(newTransaction.amount),
        date: newTransaction.date,
        note: newTransaction.title,
        type
      }

      const res = await createTransaction(obj)
      console.log(res)

      await loadAllTransaction()

      Swal.fire({
        icon: "success",
        title: "Transaction added",
        text: "Your transaction has been saved successfully!",
        showConfirmButton: false,
      })

      setShowAddModal(false)
      setNewTransaction({
        title: "",
        category: "",
        amount: "",
        date: new Date().toISOString().split("T")[0],
      })

    } catch (err) {
      console.error("Failed to add transaction", err)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add transaction. Please try again.",
      })
    }
  }



  // Delete transaction
  const handleDelete = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  // OCR File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string)
      setOcrStep("scanning")

      // Simulate OCR processing
      setTimeout(() => {
        setOcrResult({
          merchant: "SuperMart Grocery",
          amount: "85.50",
          date: new Date().toISOString().split("T")[0],
          category: "Food",
          aiSuggested: true,
        })
        setOcrStep("review")
      }, 2500)
    }
    reader.readAsDataURL(file)
  }

  const handleConfirmOCR = () => {
    if (!ocrResult) return

    const tx: Transaction = {
      id: Date.now(),
      title: ocrResult.merchant,
      category: ocrResult.category,
      date: ocrResult.date,
      amount: -parseFloat(ocrResult.amount),
    }

    setTransactions((prev) => [tx, ...prev])
    resetOCRModal()
  }

  const resetOCRModal = () => {
    setShowOCRModal(false)
    setOcrStep("upload")
    setUploadedImage(null)
    setOcrResult(null)
  }

  const totalIncome = transactions
    .filter((t) => t.type === "INCOME")
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpense = transactions
    .filter((t) => t.type === "EXPENSE")
    .reduce((sum, t) => sum + t.amount, 0)

  const netBalance = totalIncome - totalExpense

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-orange-50/30 to-yellow-50/50 p-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-200">
            <Receipt className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
            <p className="text-gray-500 text-sm">Manage and review your financial records</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-200 focus:border-amber-400 bg-white/80 backdrop-blur-sm w-64 transition-all"
            />
          </div>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-amber-50 hover:border-amber-200 transition-all text-sm">
            <Filter size={16} />
            Filter
          </button>

          <button
            onClick={() => setShowOCRModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/80 backdrop-blur-sm text-amber-700 hover:bg-amber-100 hover:border-amber-400 transition-all text-sm font-medium"
          >
            <Camera size={18} />
            Scan Receipt
          </button>

          {/* Add Transaction Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium shadow-lg shadow-amber-200 hover:shadow-amber-300 transition-all hover:scale-[1.02]"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Total Income */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-md hover:shadow-emerald-100 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 font-medium">Total Income</p>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-emerald-600">Rs {totalIncome.toFixed(2)}</h3>
          <p className="text-xs text-gray-400 mt-1">+12% from last month</p>
        </div>

        {/* Total Expense */}
        <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-sm p-5 hover:shadow-md hover:shadow-red-100 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-gray-500 font-medium">Total Expense</p>
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-red-500">Rs {totalExpense.toFixed(2)}</h3>
          <p className="text-xs text-gray-400 mt-1">-5% from last month</p>
        </div>

        {/* Net Balance */}
        <div className="bg-gradient-to-br from-amber-500 to-orange-500 border border-amber-400 rounded-2xl shadow-lg shadow-amber-200 p-5 hover:shadow-xl hover:shadow-amber-300 transition-all group">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-amber-100 font-medium">Net Balance</p>
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Wallet className="w-5 h-5 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white">Rs {netBalance.toFixed(2)}</h3>
          <p className="text-xs text-amber-100 mt-1">Current savings</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-semibold text-gray-800">Recent Transactions</h2>
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-amber-600 transition-colors">
            <ArrowUpDown size={14} />
            Sort
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gradient-to-r from-amber-50/80 to-orange-50/80 text-gray-600 text-left">
              <tr>
                <th className="py-4 px-6 font-semibold">Transaction</th>
                <th className="py-4 px-6 font-semibold">Category</th>
                <th className="py-4 px-6 font-semibold">Date</th>
                <th className="py-4 px-6 text-right font-semibold">Amount (Rs)</th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions.filter((t) =>
                (t.merchant || t.note || "").toLowerCase().includes(search.toLowerCase())
              ).length > 0 ? (
                transactions
                  .filter((t) => (t.merchant || t.note || "").toLowerCase().includes(search.toLowerCase()))
                  .map((t) => {
                    const categoryName =
                      categories.find((c) => c._id === t.category_id)?.name || "Unknown"
                    const colors = categoryColors[categoryName] || categoryColors.Other

                    return (
                      <tr key={t._id} className="border-b border-gray-100 hover:bg-gray-50 transition-all">
                        {/* Transaction */}
                        <td className="py-4 px-6">{t.merchant || t.note || "No Title"}</td>

                        {/* Category */}
                        <td className="py-4 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
                          >
                            {categoryName}
                          </span>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6">{new Date(t.date).toLocaleDateString()}</td>

                        {/* Amount */}
                        <td
                          className={`py-4 px-6 text-right font-medium ${t.type === "INCOME" ? "text-emerald-600" : "text-red-500"
                            }`}
                        >
                          Rs {Math.abs(t.amount).toFixed(2)}
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-center">
                          <button
                            onClick={() => handleDelete(t._id)}
                            className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </td>
                      </tr>
                    )
                  })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-8 px-6 text-center text-gray-400 cursor-pointer hover:text-amber-600 transition-colors"
                    onClick={() => setShowAddModal(true)}
                  >
                    No transactions found. Click here to add a new transaction.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Table Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gradient-to-r from-amber-50/50 to-orange-50/50">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-700">{filteredTx.length}</span> of{" "}
            <span className="font-medium text-gray-700">{transactions.length}</span> transactions
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-amber-50 hover:border-amber-200 transition-all">
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all">
              Next
            </button>
          </div>
        </div>
      </div>

      {showOCRModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Scan className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Scan Receipt</h3>
                  <p className="text-amber-100 text-sm">Upload a receipt to auto-extract details</p>
                </div>
              </div>
              <button onClick={resetOCRModal} className="p-2 rounded-lg hover:bg-white/20 transition-colors text-white">
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Upload Step */}
              {ocrStep === "upload" && (
                <div className="text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-amber-300 rounded-2xl p-8 cursor-pointer hover:border-amber-400 hover:bg-amber-50/50 transition-all group"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Upload className="w-10 h-10 text-amber-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Upload Receipt Image</h4>
                    <p className="text-gray-500 text-sm mb-4">Drag and drop or click to select a receipt photo</p>
                    <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <ImageIcon size={14} />
                        JPG, PNG
                      </span>
                      <span>Max 10MB</span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-200"></div>
                    <span className="text-sm text-gray-400">or</span>
                    <div className="flex-1 h-px bg-gray-200"></div>
                  </div>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 font-medium hover:bg-amber-100 transition-all"
                  >
                    <Camera size={20} />
                    Take Photo
                  </button>
                </div>
              )}

              {/* Scanning Step */}
              {ocrStep === "scanning" && (
                <div className="text-center py-8">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    {uploadedImage && (
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Receipt"
                        className="w-full h-full object-cover rounded-xl"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/80 to-transparent rounded-xl flex items-end justify-center pb-4">
                      <div className="flex items-center gap-2 text-white text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Scanning...
                      </div>
                    </div>
                    {/* Scan line animation */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-amber-400 animate-pulse rounded-t-xl"></div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">Processing Receipt</h4>
                  <p className="text-gray-500 text-sm">Our AI is extracting details from your receipt...</p>
                  <div className="mt-6 flex items-center justify-center gap-2 text-amber-600">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-medium">AI-Powered OCR</span>
                  </div>
                </div>
              )}

              {/* Review Step */}
              {ocrStep === "review" && ocrResult && (
                <div>
                  <div className="flex items-center gap-3 mb-6 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      <Check className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-emerald-800">Receipt scanned successfully!</p>
                      <p className="text-sm text-emerald-600">Review and confirm the details below</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Merchant */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Merchant</label>
                      <input
                        type="text"
                        value={ocrResult.merchant}
                        onChange={(e) => setOcrResult({ ...ocrResult, merchant: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                      />
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount (Rs)</label>
                      <input
                        type="number"
                        value={ocrResult.amount}
                        onChange={(e) => setOcrResult({ ...ocrResult, amount: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                      />
                    </div>

                    {/* Date */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                      <input
                        type="date"
                        value={ocrResult.date}
                        onChange={(e) => setOcrResult({ ...ocrResult, date: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                      />
                    </div>

                    {/* Category with AI suggestion */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category
                        {ocrResult.aiSuggested && (
                          <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs">
                            <Sparkles size={10} />
                            AI Suggested
                          </span>
                        )}
                      </label>
                      <select
                        value={ocrResult.category}
                        onChange={(e) => setOcrResult({ ...ocrResult, category: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                      >
                        {Object.keys(categoryColors).map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={resetOCRModal}
                      className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmOCR}
                      className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-200 transition-all"
                    >
                      Add Transaction
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add transaction modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white">Add Transaction</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                <input
                  type="text"
                  placeholder="e.g., Grocery Shopping"
                  value={newTransaction.title}
                  onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount (Rs)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={newTransaction.amount}
                  onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                >
                  <option value="" disabled>
                    Select Category
                  </option>

                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                <input
                  type="date"
                  value={newTransaction.date}
                  onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddManualTransaction}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-200 transition-all"
                >
                  Add Transaction
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
