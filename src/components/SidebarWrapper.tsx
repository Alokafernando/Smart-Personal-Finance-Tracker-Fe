import { useAuth } from "../context/authContext"
import UserSidebar from "./Sidebar"
import AdminSidebar from "./AdminSidebar"

export default function SidebarWrapper() {
  const { user, loading } = useAuth()

  if (loading || !user) return null

  const isAdmin =
    user?.role?.includes("ADMIN")

  return isAdmin ? <AdminSidebar /> : <UserSidebar />
}
