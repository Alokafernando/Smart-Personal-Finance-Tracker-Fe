import { useEffect, useMemo, useState } from "react"
import { TrendingDown, TrendingUp, User, Wallet, Search } from "lucide-react"
import { getAllBudgetsForAdmin } from "../../services/budget"

type Budget = {
  category: string
  limit: number
  spent: number
}

type UserBudget = {
  userId: string
  username: string
  email: string
  budgets: Budget[]
}

export default function AdminUserBudgetsPage() {
  const [users, setUsers] = useState<UserBudget[]>([])
  const [loading, setLoading] = useState(true)

  /* FILTERS */
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("ALL")
  const [statusFilter, setStatusFilter] = useState<"ALL" | "OVER" | "OK">("ALL")

  /* PAGINATION */
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

  /* ================= FETCH DATA ================= */
  const loadBudgets = async () => {
    try {
      setLoading(true)
      const res = await getAllBudgetsForAdmin(
        page,
        limit,
        search.trim() || undefined,
        undefined, 
        undefined
      )
      setUsers(res.users ?? [])
      setTotalPages(res.totalPages ?? 1)
    } catch (err) {
      console.error(err)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBudgets()
  }, [page])

  /* ================= CATEGORY OPTIONS ================= */
  const allCategories = useMemo(() => {
    const categories = users.flatMap(u => u.budgets.map(b => b.category))
    return Array.from(new Set(categories)).sort()
  }, [users])

  /* ================= FILTERED USERS ================= */
  const filteredUsers = useMemo(() => {
    return users
      .map(u => ({
        ...u,
        budgets: u.budgets.filter(b =>
          (categoryFilter === "ALL" || b.category === categoryFilter) &&
          (statusFilter === "ALL" ||
            (statusFilter === "OVER" && b.spent > b.limit) ||
            (statusFilter === "OK" && b.spent <= b.limit))
        )
      }))
      .filter(u =>
        (u.username.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())) &&
        u.budgets.length > 0
      )
  }, [users, search, categoryFilter, statusFilter])


  /* ================= UI ================= */
  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          User Budgets Overview
        </h1>
        <p className="text-sm text-gray-500">
          Monitor user spending against assigned budgets
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search user name or email..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 text-sm"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={e => { setCategoryFilter(e.target.value); setPage(1) }}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-200"
        >
          <option value="ALL">All Categories</option>
          {allCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={e => { setStatusFilter(e.target.value as "ALL" | "OVER" | "OK"); setPage(1) }}
          className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-amber-200"
        >
          <option value="ALL">All Status</option>
          <option value="OVER">Over Budget</option>
          <option value="OK">On Track</option>
        </select>
      </div>

      {/* LOADING */}
      {loading && <div className="text-center text-gray-500 py-12">Loading budgets...</div>}

      {/* NO DATA */}
      {!loading && filteredUsers.length === 0 && (
        <div className="text-center text-gray-400 py-16">No matching budgets found</div>
      )}

      {/* USERS */}
      {!loading && filteredUsers.length > 0 && (
        <div className="space-y-8">
          {filteredUsers.map(user => {
            const overCount = user.budgets.filter(b => b.spent > b.limit).length
            return (
              <div key={user.userId} className="bg-white rounded-3xl border shadow-lg p-6">
                {/* User Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 shadow">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{user.username}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                      <Wallet className="w-3 h-3" />
                      {user.budgets.length} Budgets
                    </span>
                    {overCount > 0 && (
                      <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-600">
                        {overCount} Over
                      </span>
                    )}
                  </div>
                </div>

                {/* Budgets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {user.budgets.map((b, idx) => {
                    const percent = Math.min((b.spent / b.limit) * 100, 100)
                    const isOver = b.spent > b.limit

                    return (
                      <div key={idx} className="bg-amber-50 rounded-2xl border p-5">
                        <div className="flex justify-between mb-2">
                          <p className="font-medium">{b.category}</p>
                          <span className={`text-xs flex gap-1 ${isOver ? 'text-red-600' : 'text-emerald-600'}`}>
                            {isOver ? <><TrendingDown className="w-3 h-3" />Over</> : <><TrendingUp className="w-3 h-3" />OK</>}
                          </span>
                        </div>
                        <p className="text-sm">Budget: Rs {b.limit.toLocaleString()}</p>
                        <p className={`text-sm font-semibold ${isOver ? 'text-red-600' : 'text-emerald-600'}`}>Spent: Rs {b.spent.toLocaleString()}</p>
                        <div className="h-2 bg-gray-200 rounded-full mt-2">
                          <div className={`${isOver ? 'bg-red-500' : 'bg-amber-500'} h-full rounded-full`} style={{ width: `${percent}%` }} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{percent.toFixed(0)}% used</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-4">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1 border rounded">Previous</button>
          <span>{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="px-3 py-1 border rounded">Next</button>
        </div>
      )}
    </div>
  )
}
