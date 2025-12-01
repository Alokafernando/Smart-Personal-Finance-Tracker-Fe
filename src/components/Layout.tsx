import Header from "./Header"
import { Outlet } from "react-router-dom"

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto p-4 w-full">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-gray-600 text-center py-4 mt-auto">
        © {new Date().getFullYear()} Smart Finance Tracker. All rights reserved.
      </footer>
    </div>
  )
}