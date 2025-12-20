import { lazy, Suspense, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Layout from "../components/Layout"

const Home = lazy(() => import("../pages/Home")) // dashboard
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const Welcome = lazy(() => import("../pages/Welcome"))
const Transactions = lazy(() => import("../pages/Transactions"))
const Help = lazy(() => import("../pages/HelpPage"))
const Setting = lazy(() => import("../pages/SettingsPage"))
const Anlytics = lazy(() => import("../pages/AnalyticsPage"))
const Budget = lazy(() => import("../pages/Budget"))
const Categories = lazy(() => import("../pages/Categories"))

const AdminHome = lazy(() => import("../pages/Admin/Home"))



type RequireAuthTypes = { children: ReactNode; roles?: string[] }

const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    // alert("User can't access. Please login first.");
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.some((role) => user.role?.includes(role))) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-2">Access denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    )
  }

  return <>{children}</>
}

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/help" element={<Help />} />
            <Route path="/settings" element={<Setting />} />
            <Route path="/analytics" element={<Anlytics />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/categories" element={<Categories />} />

          </Route>

          <Route
            element={
              <RequireAuth roles={["ADMIN"]}>
                <Layout />
              </RequireAuth>
            }
          >
            <Route path="/admin/home" element={<AdminHome />} />

          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}