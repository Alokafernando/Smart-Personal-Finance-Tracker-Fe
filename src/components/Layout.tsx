import Sidebar from "./Header"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />


      <div className="flex-1 flex flex-col">

        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>

        <footer className="bg-gray-100 text-gray-600 text-center py-4">
          © {new Date().getFullYear()} Smart Finance Tracker. All rights reserved.
        </footer>

      </div>
    </div>
  )
}
