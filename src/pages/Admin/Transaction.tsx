"use client"

import { useEffect, useState } from "react"
import { Search, Eye, Trash2, X } from "lucide-react"
import Swal from "sweetalert2"
import { getAllTransactionsForAdmin, } from "../../services/transaction"

type TransactionType = "INCOME" | "EXPENSE"

interface Transaction {
  _id: string
  user: { username: string; email: string }
  category: string
  amount: number
  type: TransactionType
  date: string
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchUser, setSearchUser] = useState("")
  const [filterType, setFilterType] = useState<"ALL" | TransactionType>("ALL")
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const limit = 10 // 10 transactions per page

  /* ================= FETCH TRANSACTIONS ================= */
  const loadAllTransactions = async () => {
    try {
      setLoading(true)
      const res = await getAllTransactionsForAdmin(page, limit)
      setTransactions(res.transactions || [])
      setTotalPages(res.totalPages || 1)
    } catch (error) {
      console.error(error)
      Swal.fire("Error", "Failed to load transactions", "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAllTransactions()
  }, [page])

  /* ================= FILTERED TRANSACTIONS ================= */
  const filteredTransactions = (transactions || []).filter(t => {
    const username = t.user?.username?.toLowerCase() || ""
    const email = t.user?.email?.toLowerCase() || ""
    const matchesUser =
      username.includes(searchUser.toLowerCase()) ||
      email.includes(searchUser.toLowerCase())

    const matchesType = filterType === "ALL" || t.type === filterType
    return matchesUser && matchesType
  })


  /* ================= SUMMARY ================= */
  const totalIncome = filteredTransactions.filter(t => t.type === "INCOME").reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = filteredTransactions.filter(t => t.type === "EXPENSE").reduce((sum, t) => sum + t.amount, 0)
  const balance = totalIncome - totalExpense

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Delete transaction?",
      text: "Are you sure you want to delete this transaction?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      confirmButtonText: "Delete",
    })
    if (!confirm.isConfirmed) return

    try {
      // await delete(`/transactions/${id}`)
      Swal.fire("Deleted!", "Transaction removed", "success")
      loadAllTransactions()
    } catch (error) {
      console.error(error)
      Swal.fire("Error", "Failed to delete transaction", "error")
    }
  }

  return (
    <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-gray-500">Search by user or filter by type</p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={searchUser}
              onChange={e => setSearchUser(e.target.value)}
              placeholder="Search by username or email"
              className="pl-10 pr-4 py-2 rounded-xl border focus:ring-2 focus:ring-amber-400 w-full"
            />
          </div>
          <select value={filterType} onChange={e => setFilterType(e.target.value as any)} className="px-4 py-2 rounded-xl border">
            <option value="ALL">All Types</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-amber-100">
              <tr>
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr><td colSpan={6} className="py-16 text-center text-gray-500">Loading transactions...</td></tr>
              ) : filteredTransactions.length === 0 ? (
                <tr><td colSpan={6} className="py-10 text-center text-gray-500">No transactions found</td></tr>
              ) : (
                filteredTransactions.map(t => (
                  <tr key={t._id} className="hover:bg-amber-50">
                    <td className="px-6 py-4">
                      <p className="font-medium">{t.user?.username || "Unknown User"}</p>
                      <p className="text-xs text-gray-500">{t.user.email || "Unknown User"}</p>
                    </td>
                    <td className="px-6 py-4">{t.category}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.type === "INCOME" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{t.type}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{t.type === "INCOME" ? "+" : "-"} Rs. {t.amount.toLocaleString()}</td>
<td className="px-6 py-4">
  {new Date(t.date).getDate().toString().padStart(2, "0")}- 
  {(new Date(t.date).getMonth() + 1).toString().padStart(2, "0")}- 
  {new Date(t.date).getFullYear()}
</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => setSelectedTx(t)} className="p-2 bg-amber-100 rounded-lg"><Eye size={16} /></button>
                      <button onClick={() => handleDelete(t._id)} className="p-2 bg-red-100 text-red-600 rounded-lg"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-4">
            <button
              className={`px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-500 hover:bg-amber-50 hover:border-amber-200 transition-all ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={page === 1}
              onClick={() => page > 1 && setPage(prev => prev - 1)}
            >
              Previous
            </button>

            <span className="px-3 py-1.5 text-sm text-gray-700">
              {page} of {totalPages}
            </span>

            <button
              className={`px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium hover:from-amber-600 hover:to-orange-600 transition-all ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={page === totalPages}
              onClick={() => page < totalPages && setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* MODAL */}
      {selectedTx && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setSelectedTx(null)} className="absolute top-4 right-4 text-gray-500"><X /></button>
            <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
            <div className="space-y-2 text-sm">
              <p><b>User:</b> {selectedTx.user.username}</p>
              <p><b>Email:</b> {selectedTx.user.email}</p>
              <p><b>Category:</b> {selectedTx.category}</p>
              <p><b>Type:</b> {selectedTx.type}</p>
              <p><b>Amount:</b> Rs. {selectedTx.amount.toLocaleString()}</p>
              <p><b>Date:</b> {new Date(selectedTx.date).toDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
