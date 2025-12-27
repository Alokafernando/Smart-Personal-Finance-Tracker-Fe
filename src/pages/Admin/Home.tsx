import { Users, Shield, UserCheck, UserX, BarChart3, PlusCircle, LogOut, Settings,  Bell, } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { getAllUsers } from "../../services/user"

interface UsersSummary {
  total: number
  approved: number
  pending: number
  rejected: number
}

interface User {
  username: string
  email: string
  approved: string
  role: string[]
}

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [usersSummary, setUsersSummary] = useState<UsersSummary | null>(null)
  const [recentUsers, setRecentUsers] = useState<User[]>([])

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout from the admin panel?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#9ca3af",
    }).then((res) => {
      if (res.isConfirmed) {
        localStorage.clear()
        navigate("/login")
      }
    })
  }

  useEffect(() => {
    const fetchUsersSummary = async () => {
      try {
        const res: any = await getAllUsers()

        const usersArray = Array.isArray(res.users) ? res.users : []
        const total = usersArray.length
        const approved = usersArray.filter((u: { approved: string }) => u.approved === "APPROVED").length
        const pending = usersArray.filter((u: { approved: string }) => u.approved === "PENDING").length
        const rejected = usersArray.filter((u: { approved: string }) => u.approved === "REJECTED").length

        setUsersSummary({ total, approved, pending, rejected })

        setRecentUsers(usersArray.slice(-5).reverse())
      } catch (error: any) {
        console.error("Failed to fetch users:", error)
      }
    }

    fetchUsersSummary()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview & system management</p>
          </div>
          <div className="flex gap-3">
            <IconBtn icon={Bell} />
            <IconBtn icon={Settings} />
            <IconBtn icon={LogOut} danger onClick={handleLogout} />
          </div>
        </header>

        {/* STATS CARDS */}
        {usersSummary ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Users" value={usersSummary.total.toString()} icon={Users} color="blue" />
            <StatCard title="Approved Users" value={usersSummary.approved.toString()} icon={UserCheck} color="green" />
            <StatCard title="Pending Users" value={usersSummary.pending.toString()} icon={Shield} color="yellow" />
            <StatCard title="Rejected Users" value={usersSummary.rejected.toString()} icon={UserX} color="red" />
          </section>
        ) : (
          <p className="text-gray-500">Loading stats...</p>
        )}

        {/* QUICK ACTIONS */}
        <section className="flex flex-wrap gap-4 mt-4">
          <ActionBtn icon={PlusCircle} label="Add Admin" onClick={() => navigate("/admin/users")} />
          <ActionBtn icon={Users} label="Manage Users" onClick={() => navigate("/admin/users")} />
          <ActionBtn icon={BarChart3} label="Analytics" onClick={() => navigate("/admin/analytics")} />
        </section>

        {/* MAIN GRID */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

          {/* RECENT USERS */}
          <Card title="Recent Users">
            {recentUsers.length > 0 ? (
              recentUsers.map((u, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-xl mb-2 bg-white shadow hover:shadow-lg transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                      {u.username.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{u.username}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                    u.approved === "APPROVED" ? "bg-green-100 text-green-700" :
                    u.approved === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {u.approved}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No users found</p>
            )}
          </Card>

          {/* SYSTEM SUMMARY */}
          <Card title="System Summary">
            {usersSummary ? (
              <>
                <SummaryRow label="Total Users" value={usersSummary.total.toString()} iconColor="blue" />
                <SummaryRow label="Approved Users" value={usersSummary.approved.toString()} iconColor="green" />
                <SummaryRow label="Pending Users" value={usersSummary.pending.toString()} iconColor="yellow" />
                <SummaryRow label="Rejected Users" value={usersSummary.rejected.toString()} iconColor="red" />
              </>
            ) : (
              <p className="text-gray-500">Loading summary...</p>
            )}
          </Card>

        </section>
      </div>
    </div>
  )
}

/* ----------  Components ---------- */

function Card({ title, children }: any) {
  return (
    <div className="bg-white/90 rounded-2xl p-6 shadow hover:shadow-xl transition">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      {children}
    </div>
  )
}

function StatCard({ title, value, icon: Icon, color }: any) {
  const colors: any = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    purple: "bg-purple-100 text-purple-700",
  }

  return (
    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow hover:shadow-xl transition transform hover:-translate-y-1">
      <div className={`p-3 rounded-xl ${colors[color]}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  )
}

function ActionBtn({ icon: Icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl shadow hover:scale-105 transition transform"
    >
      <Icon size={18} /> {label}
    </button>
  )
}

function IconBtn({ icon: Icon, onClick, danger }: any) {
  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-xl shadow ${
        danger ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-white text-amber-600 hover:bg-gray-100"
      } transition`}
    >
      <Icon size={18} />
    </button>
  )
}

function SummaryRow({ label, value, iconColor }: any) {
  const colors: any = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    purple: "bg-purple-100 text-purple-700",
  }
  return (
    <div className="flex justify-between items-center p-4 mb-2 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition">
      <span className="text-gray-600">{label}</span>
      <span className={`font-semibold px-3 py-1 rounded-full ${colors[iconColor]}`}>{value}</span>
    </div>
  )
}
