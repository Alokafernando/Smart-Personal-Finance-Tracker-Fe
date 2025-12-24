"use client"

import { useState, useMemo } from "react"
import { User, Tag, ChevronDown, ChevronUp, Search } from "lucide-react"

// ================= MOCK DATA =================
type UserCategory = {
  userId: string
  username: string
  categories: { name: string; is_default: boolean }[]
}

const mockUsers: UserCategory[] = [
  {
    userId: "u1",
    username: "John Doe",
    categories: [
      { name: "Food", is_default: true },
      { name: "Business", is_default: false },
      { name: "Travel", is_default: false },
    ],
  },
  {
    userId: "u2",
    username: "Jane Smith",
    categories: [
      { name: "Food", is_default: true },
      { name: "Health", is_default: false },
    ],
  },
  {
    userId: "u3",
    username: "Alice Johnson",
    categories: [
      { name: "Shopping", is_default: false },
      { name: "Entertainment", is_default: false },
      { name: "Food", is_default: true },
    ],
  },
]

// ================= COMPONENT =================
export default function AdminUserCategories() {
  const [users] = useState<UserCategory[]>(mockUsers)
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})
  const [search, setSearch] = useState("")

  const toggleExpand = (userId: string) => {
    setExpanded(prev => ({ ...prev, [userId]: !prev[userId] }))
  }

  // Filter users based on search input
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
          type="text"
          placeholder="Search by user name..."
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white shadow-inner border border-black placeholder-gray-400 text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 transition"
        />
      </div>


      {/* USERS LIST */}
      <div className="space-y-6">
        {filteredUsers.length === 0 && (
          <p className="text-gray-400 text-center py-6">No users match your search</p>
        )}

        {filteredUsers.map(user => {
          const manualCategories = user.categories.filter(c => !c.is_default)
          const isExpanded = expanded[user.userId] || false

          return (
            <div
              key={user.userId}
              className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition"
            >
              {/* USER HEADER */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpand(user.userId)}
              >
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
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
                      >
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
    </div>
  )
}
