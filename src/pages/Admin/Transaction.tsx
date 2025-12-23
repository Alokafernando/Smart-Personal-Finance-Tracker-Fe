import { useEffect, useState } from "react"
import { Search, Eye, Trash2,  } from "lucide-react"
import Swal from "sweetalert2"
import { deleteTransaction, getAllTransactionsForAdmin } from "../../services/transaction"

type TransactionType = "INCOME" | "EXPENSE"

interface Category {
  _id: string
  name: string
  type: TransactionType
}

interface Transaction {
  _id: string
  user: { username: string; email: string }
  category?: Category
  amount: number
  type: TransactionType
  date: string
}

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchUser, setSearchUser] = useState("")
  const [filterType, setFilterType] = useState<"ALL" | TransactionType>("ALL")
  const [fromDate, setFromDate] = useState("")
  const [toDate, setToDate] = useState("")
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const limit = 10

  /* ================= FETCH TRANSACTIONS ================= */
  const loadAllTransactions = async () => {
    try {
      setLoading(true)
      const res = await getAllTransactionsForAdmin(
        page,
        limit,
        searchUser,
        filterType,
        fromDate,
        toDate
      )
      setTransactions(res.transactions || [])
      setTotalPages(res.totalPages || 1)
    } catch (error) {
      console.error(error)
      Swal.fire("Error", "Failed to load transactions", "error")
    } finally {
      setLoading(false)
    }
  }

  // Reload when filters or page change
  useEffect(() => {
    loadAllTransactions()
  }, [page, searchUser, filterType, fromDate, toDate])

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
       await deleteTransaction(`${id}`)
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
          <div>
            <h1 className="text-3xl font-bold">Transactions</h1>
            <p className="text-gray-500">Search by user, filter by type or date</p>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              value={searchUser}
              onChange={e => { setPage(1); setSearchUser(e.target.value) }}
              placeholder="Search by username or email"
              className="pl-10 pr-4 py-2 rounded-xl border focus:ring-2 focus:ring-amber-400 w-full"
            />
          </div>

          <select
            value={filterType}
            onChange={e => { setPage(1); setFilterType(e.target.value as "ALL" | TransactionType) }}
            className="px-4 py-2 rounded-xl border"
          >
            <option value="ALL">All Types</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>

          <label className="text-gray-500 text-sm">From:</label>
          <input
            type="date"
            value={fromDate}
            onChange={e => { setPage(1); setFromDate(e.target.value) }}
            className="px-4 py-2 rounded-xl border"
          />

          <label className="text-gray-500 text-sm">To:</label>
          <input
            type="date"
            value={toDate}
            onChange={e => { setPage(1); setToDate(e.target.value) }}
            className="px-4 py-2 rounded-xl border"
          />
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
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-500">Loading transactions...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-gray-400">
                    <p className="text-lg"> No transactions found</p>
                  </td>
                </tr>
              ) : (
                transactions.map(t => (
                  <tr key={t._id} className="hover:bg-amber-50 cursor-pointer">
                    <td className="px-6 py-4">
                      <p className="font-medium">{t.user?.username || "Unknown User"}</p>
                      <p className="text-xs text-gray-500">{t.user.email || "Unknown User"}</p>
                    </td>
                    <td className="px-6 py-4">{t.category?.name || "Uncategorized"}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.type === "INCOME" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{t.type}</span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{t.type === "INCOME" ? "+" : "-"} Rs. {t.amount.toLocaleString()}</td>
                    <td className="px-6 py-4">{new Date(t.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => setSelectedTx(t)} className="p-2 bg-amber-100 rounded-lg hover:bg-amber-200 transition"><Eye size={16} /></button>
                      <button onClick={() => handleDelete(t._id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition"><Trash2 size={16} /></button>
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
              className={`px-3 py-1.5 rounded-lg border text-sm ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-amber-50 hover:border-amber-200"}`}
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
            >
              Previous
            </button>
            <span className="px-3 py-1.5 text-sm text-gray-700">{page} of {totalPages}</span>
            <button
              className={`px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-medium ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:from-amber-600 hover:to-orange-600"}`}
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>

        {/* TRANSACTION DETAILS MODAL */}
        {selectedTx && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border-t-8 border-amber-500">

              {/* Header */}
              <div className="bg-amber-500 text-white text-center py-4 font-bold text-xl tracking-wider">
                Transaction Receipt
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">

                {/* User */}
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-500 font-medium">User</span>
                  <span className="text-gray-800 font-semibold">{selectedTx.user.username}</span>
                </div>

                {/* Email */}
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-500 font-medium">Email</span>
                  <span className="text-gray-800 font-semibold">{selectedTx.user.email}</span>
                </div>

                {/* Category */}
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-500 font-medium">Category</span>
                  <span className="text-gray-800 font-semibold">{selectedTx.category?.name || "Uncategorized"}</span>
                </div>

                {/* Amount */}
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-500 font-medium">Amount (Rs)</span>
                  <span className="text-gray-800 font-semibold text-lg">{selectedTx.amount.toLocaleString()}</span>
                </div>

                {/* Date */}
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-500 font-medium">Date</span>
                  <span className="text-gray-800 font-semibold">{new Date(selectedTx.date).toLocaleDateString()}</span>
                </div>

                {/* Status Badge (optional) */}
                {selectedTx.type && (
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-gray-500 font-medium">Type</span>
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${selectedTx.type === "INCOME" ? "bg-green-500" : "bg-red-500"
                      }`}>
                      {selectedTx.type}
                    </span>
                  </div>
                )}

                {/* Close Button */}
                <div className="flex justify-center pt-4">
                  <button
                    onClick={() => setSelectedTx(null)}
                    className="px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:from-amber-600 hover:to-orange-600 shadow-lg transition-all"
                  >
                    Close
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
