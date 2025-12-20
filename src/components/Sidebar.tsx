import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Home, BarChartBig as ChartPie, Layers, BarChart3, Tag, Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight, Sparkles, } from "lucide-react"
import Swal from "sweetalert2"
import { getUserDetails } from "../services/auth"
import { useAuth } from "../context/authContext"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user: authUser, setUser } = useAuth()
  const [user, setLocalUser] = useState(authUser)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserDetails()
        setLocalUser(data.user)
        setUser(data.user)
      } catch (err) {
        console.error(err)
      }
    }
    if (!user) fetchUser()
  }, [])

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate("/login")
      }
    })
  }

  const menuItems = [
    { label: "Home", icon: Home, route: "/home" },
    { label: "Transactions", icon: Layers, route: "/transactions" },
    { label: "Budget", icon: ChartPie, route: "/budget" },
    { label: "Categories", icon: Tag, route: "/categories" },
    { label: "Revenue Analytics", icon: BarChart3, route: "/analytics" },
  ]

  const extraItems = [
    { label: "Settings", icon: Settings, route: "/settings" },
    { label: "Help", icon: HelpCircle, route: "/help" },
  ]

  const isActive = (route: string) => location.pathname === route

  return (
    <aside
      className={`relative bg-gradient-to-b from-[#faf9f7] to-[#f5f3f0] flex flex-col justify-between shadow-xl border-r border-amber-100 transition-all duration-300 ${sidebarCollapsed ? "w-20" : "w-72"
        }`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-amber-200/50 relative">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 p-0.5">
                <img
                  src={user?.profileURL || "/assets/default-user.jpg"}
                  alt="User"
                  className="w-full h-full rounded-xl object-cover bg-[#faf9f7]"
                />

              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#faf9f7]" />
            </div>

            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-gray-800 text-base truncate">{user?.username || "User"}</h2>
                <p className="text-amber-600 text-xs font-medium">{user?.role || "Personal Account"}</p>
              </div>
            )}
          </div>

          {/* Collapse toggle button */}
          <button
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="absolute top-6 -right-3 w-6 h-6 flex items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg hover:shadow-amber-500/25 transition-all text-white z-50 hover:scale-110"
          >
            {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Pro upgrade card */}
        {!sidebarCollapsed && (
          <div className="mx-3 mt-4 p-3 rounded-xl bg-white border border-amber-200 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-amber-500" />
              <span className="text-gray-800 text-sm font-semibold">Upgrade to Pro</span>
            </div>
            <p className="text-gray-500 text-xs mb-2">Get unlimited features and analytics</p>
            <button className="w-full py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all">
              Upgrade Now
            </button>
          </div>
        )}

        {/* Main navigation */}
        <nav className="flex-1 p-3 mt-2">
          {!sidebarCollapsed && (
            <p className="text-[10px] font-bold text-amber-600/70 uppercase tracking-wider px-3 mb-2">Main Menu</p>
          )}

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.route)
              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.route)}
                  className={`group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${sidebarCollapsed ? "justify-center" : "text-left"
                    } ${active
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25"
                      : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                    }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    size={20}
                    className={`flex-shrink-0 transition-transform duration-200 ${!active && "group-hover:scale-110"}`}
                  />
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  {active && !sidebarCollapsed && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              )
            })}
          </div>

          {/* Extra section */}
          <div className="mt-6">
            {!sidebarCollapsed && (
              <p className="text-[10px] font-bold text-amber-600/70 uppercase tracking-wider px-3 mb-2">Extra</p>
            )}

            <div className="space-y-1">
              {extraItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.route)
                return (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.route)}
                    className={`group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 ${sidebarCollapsed ? "justify-center" : "text-left"
                      } ${active
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25"
                        : "text-gray-600 hover:bg-amber-50 hover:text-amber-700"
                      }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    <Icon
                      size={20}
                      className={`flex-shrink-0 transition-transform duration-200 ${!active && "group-hover:scale-110"}`}
                    />
                    {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </button>
                )
              })}

              {/* Logout button below Help */}
              <button
                onClick={handleLogout}
                className={`group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200 text-gray-500 hover:bg-red-50 hover:text-red-500 ${sidebarCollapsed ? "justify-center" : "text-left"
                  }`}
                title={sidebarCollapsed ? "Log Out" : undefined}
              >
                <LogOut size={20} className="flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                {!sidebarCollapsed && <span className="text-sm font-medium">Log Out</span>}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}
