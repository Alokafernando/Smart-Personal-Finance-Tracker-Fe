"use client"

import type React from "react"

import { useState, useMemo, useRef } from "react"
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  TrendingUp,
  TrendingDown,
  Wallet,
  Filter,
  ArrowUpDown,
  Receipt,
  Calendar,
  Camera,
  Upload,
  Scan,
  Sparkles,
  X,
  Check,
  Loader2,
  ImageIcon,
} from "lucide-react"

/* ---------------------------------------------
   Types
--------------------------------------------- */
type Transaction = {
  id: number
  title: string
  category: string
  date: string
  amount: number
}

/* ---------------------------------------------
   Category Colors
--------------------------------------------- */
const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
  Income: { bg: "bg-emerald-50", text: "text-emerald-600", icon: "bg-emerald-100" },
  Food: { bg: "bg-orange-50", text: "text-orange-600", icon: "bg-orange-100" },
  Transport: { bg: "bg-blue-50", text: "text-blue-600", icon: "bg-blue-100" },
  Bills: { bg: "bg-purple-50", text: "text-purple-600", icon: "bg-purple-100" },
  Shopping: { bg: "bg-pink-50", text: "text-pink-600", icon: "bg-pink-100" },
  Entertainment: { bg: "bg-amber-50", text: "text-amber-600", icon: "bg-amber-100" },
}

/* ---------------------------------------------
   Component
--------------------------------------------- */
export default function TransactionsPage() {
  const [search, setSearch] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, title: "Salary - November", category: "Income", date: "2025-11-25", amount: 2500 },
    { id: 2, title: "Grocery Shopping", category: "Food", date: "2025-11-24", amount: -120.5 },
    { id: 3, title: "Uber Ride", category: "Transport", date: "2025-11-23", amount: -15.2 },
    { id: 4, title: "Electricity Bill", category: "Bills", date: "2025-11-21", amount: -80.0 },
    { id: 5, title: "Freelance Work", category: "Income", date: "2025-11-18", amount: 560 },
  ])

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
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    amount: "",
  })

  /* Filtered results */
  const filteredTx = useMemo(
    () =>
      transactions.filter(
        (t) =>
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase()),
      ),
    [transactions, search],
  )

  /* Delete Transaction */
  const handleDelete = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
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
  }

  const handleConfirmOCR = () => {
    if (ocrResult) {
      const newTx: Transaction = {
        id: Date.now(),
        title: ocrResult.merchant,
        category: ocrResult.category,
        date: ocrResult.date,
        amount: -Number.parseFloat(ocrResult.amount),
      }
      setTransactions((prev) => [newTx, ...prev])
      resetOCRModal()
    }
  }

  const resetOCRModal = () => {
    setShowOCRModal(false)
    setOcrStep("upload")
    setUploadedImage(null)
    setOcrResult(null)
  }

  const handleAddManualTransaction = () => {
    if (newTransaction.title && newTransaction.amount) {
      const newTx: Transaction = {
        id: Date.now(),
        title: newTransaction.title,
        category: newTransaction.category,
        date: newTransaction.date,
        amount:
          newTransaction.category === "Income"
            ? Math.abs(Number.parseFloat(newTransaction.amount))
            : -Math.abs(Number.parseFloat(newTransaction.amount)),
      }
      setTransactions((prev) => [newTx, ...prev])
      setShowAddModal(false)
      setNewTransaction({
        title: "",
        category: "Food",
        date: new Date().toISOString().split("T")[0],
        amount: "",
      })
    }
  }

  /* Calculate totals */
  const totalIncome = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0)
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
              {filteredTx.length > 0 ? (
                filteredTx.map((t, index) => {
                  const catStyle = categoryColors[t.category] || {
                    bg: "bg-gray-50",
                    text: "text-gray-600",
                    icon: "bg-gray-100",
                  }
                  return (
                    <tr
                      key={t.id}
                      className={`border-t border-gray-50 hover:bg-amber-50/50 transition-colors ${index % 2 === 0 ? "bg-white/50" : "bg-gray-50/30"}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${catStyle.icon} flex items-center justify-center`}>
                            {t.amount > 0 ? (
                              <TrendingUp className={`w-5 h-5 ${catStyle.text}`} />
                            ) : (
                              <TrendingDown className={`w-5 h-5 ${catStyle.text}`} />
                            )}
                          </div>
                          <span className="font-medium text-gray-800">{t.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${catStyle.bg} ${catStyle.text}`}
                        >
                          {t.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar size={14} />
                          {t.date}
                        </div>
                      </td>
                      <td
                        className={`py-4 px-6 text-right font-bold ${t.amount > 0 ? "text-emerald-600" : "text-red-500"}`}
                      >
                        {t.amount > 0 ? `+${t.amount.toFixed(2)}` : `-${Math.abs(t.amount).toFixed(2)}`}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-center gap-2">
                          <button
                            className="p-2 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-12">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <Receipt className="w-8 h-8 text-gray-300" />
                      </div>
                      <p>No transactions found</p>
                      <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">
                        Add your first transaction
                      </button>
                    </div>
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
                  {Object.keys(categoryColors).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
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
