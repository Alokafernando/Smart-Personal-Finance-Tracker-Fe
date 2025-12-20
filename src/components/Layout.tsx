import { Outlet } from "react-router-dom"
import SidebarWrapper from "./SidebarWrapper"

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarWrapper />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>

        <footer className="bg-gray-100 text-gray-600 text-center py-4">
          © {new Date().getFullYear()} Smart Finance Tracker.
        </footer>
      </div>
    </div>
  )
}
