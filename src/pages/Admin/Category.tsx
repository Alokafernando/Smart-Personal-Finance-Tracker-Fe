"use client"

import { useState, useMemo, useEffect } from "react"
import { User, Tag, ChevronDown, ChevronUp, Search } from "lucide-react"
import { getAllUsersCategories } from "../../services/category"

// ================= TYPES =================
type UserCategory = {
  userId: string
  username: string
  email: string
  categories: { name: string; is_default: boolean }[]
}

// ================= COMPONENT =================
export default function AdminUserCategories() {
  const [users, setUsers] = useState<UserCategory[]>([])
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const data = await getAllUsersCategories({ page, searchUser: search })
      setUsers(data.users)
      setTotalPages(data.totalPages)
    } catch (err) {
      console.error("Error fetching users:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page, search])

  const toggleExpand = (userId: string) => {
    setExpanded(prev => ({ ...prev, [userId]: !prev[userId] }))
  }

  const filteredUsers = useMemo(() => {
    return users.filter(user =>
      user.username.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, users])

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-gray-800">User Categories Overview</h1>
        <p className="text-sm text-gray-500">
          View manually created categories for each user (default categories hidden)
        </p>
      </div>

      {/* SEARCH FILTER */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          type="text"
          placeholder="Search by user name..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow-inner border border-black placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
        />
      </div>

      {/* USERS LIST */}
      <div className="space-y-6">
        {loading && <p className="text-gray-500 text-center py-6">Loading...</p>}
        {!loading && filteredUsers.length === 0 && (
          <p className="text-gray-400 text-center py-6">No users match your search</p>
        )}

        {!loading && filteredUsers.map(user => {
          const manualCategories = user.categories.filter(c => !c.is_default)
          const isExpanded = expanded[user.userId] || false

          return (
            <div key={user.userId} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition">
              {/* USER HEADER */}
              <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleExpand(user.userId)}>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 shadow flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.username}</p>
                    <span className="inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-700">
                      {manualCategories.length} Manual Categories
                    </span>
                  </div>
                </div>
                <div className="text-amber-500">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* CATEGORIES LIST */}
              {isExpanded && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {manualCategories.length === 0 ? (
                    <p className="text-gray-400 col-span-full text-sm">No manually created categories</p>
                  ) : (
                    manualCategories.map((c, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
                        <Tag className="w-5 h-5 text-amber-500" />
                        <span className="font-medium text-gray-700">{c.name}</span>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* PAGINATION (optional) */}
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
    </div>
  )
}
