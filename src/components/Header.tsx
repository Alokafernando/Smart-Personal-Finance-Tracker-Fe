import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LayoutDashboard, Wallet, Layers, BarChart3, Search, Settings, HelpCircle, LogOut } from "lucide-react"
import { useAuth } from "../context/authContext"
import Swal from "sweetalert2"

export default function Sidebar() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate("/login")
      }
    })
  }

  const menuItems = [
    { label: "Dashboard", icon: <LayoutDashboard size={18} />, route: "/dashboard" },
    { label: "Wallet", icon: <Wallet size={18} />, route: "/wallet" },
    { label: "Transactions", icon: <Layers size={18} />, route: "/transactions" },
    { label: "Revenue Analytics", icon: <BarChart3 size={18} />, route: "/analytics" },
    { label: "Search", icon: <Search size={18} />, route: "/search" },
  ]

  return (
    <aside className={`relative bg-[#f5f8ff] border-r border-gray-200 flex flex-col justify-between shadow-sm transition-all duration-300 rounded-tr-3xl rounded-br-3xl ${sidebarCollapsed ? "w-20" : "w-64"}`}>

      <div>
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={user?.profilePic || "/avatar-placeholder.png"} alt="User" className="w-16 h-16 rounded-full object-cover" />

            {!sidebarCollapsed && (
              <div>
                <h2 className="font-semibold text-gray-800 text-lg mt-1">{user?.firstname || "User"}</h2>
                <p className="text-gray-500 text-sm"> {user?.role || "Personal Account"}</p>
              </div>
            )}
          </div>

          <button onClick={() => setSidebarCollapsed(prev => !prev)} className={`absolute top-6 -right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:bg-gray-100 transition-all text-gray-500 z-50`}>
            {sidebarCollapsed ? "➡" : "⬅"}
          </button>
        </div>

        <nav className="p-2">
          {menuItems.map((item) => (
            <button key={item.label} onClick={() => navigate(item.route)} className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer hover:bg-[#e7efff] transition ${sidebarCollapsed ? "justify-center" : "text-left"}`}>
              {item.icon}
              {!sidebarCollapsed && <span className="text-sm font-medium text-gray-700">{item.label}</span>}
            </button>
          ))}

          <div className="mt-4 space-y-2">
            {!sidebarCollapsed && (
              <p className="text-xs font-semibold text-gray-400 uppercase px-3">Extra</p>
            )}

            <button onClick={() => navigate("/settings")} className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer hover:bg-[#e7efff] transition ${sidebarCollapsed ? "justify-center" : "text-left"}`}>
              <Settings size={18} className="text-gray-700" />
              {!sidebarCollapsed && <span className="text-sm font-medium text-gray-700">Settings</span>}
            </button>

            <button onClick={() => navigate("/help")} className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer hover:bg-[#e7efff] transition ${sidebarCollapsed ? "justify-center" : "text-left"}`}>
              <HelpCircle size={18} className="text-gray-700" />
              {!sidebarCollapsed && <span className="text-sm font-medium text-gray-700">Help</span>}
            </button>

            <button onClick={handleLogout} className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl cursor-pointer hover:bg-[#e7efff] transition ${sidebarCollapsed ? "justify-center" : "text-left"}`}>
              <LogOut size={18} className="text-gray-700" />
              {!sidebarCollapsed && <span className="text-sm font-medium text-gray-700">Log Out</span>}
            </button>
          </div>
        </nav>
      </div>
    </aside>

  )
}
