import { lazy, Suspense, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Layout from "../components/Layout"

const Welcome = lazy(() => import("../pages/Welcome"))

const Login = lazy(() => import("../pages/Auth/Login"))
const Register = lazy(() => import("../pages/Auth/Register"))
const ForgotPassword = lazy(() => import("../pages/Auth/ForgotPassword"))

const Home = lazy(() => import("../pages/User/Home")) 
const Transactions = lazy(() => import("../pages/User/Transactions"))
const Help = lazy(() => import("../pages/User/HelpPage"))
const Setting = lazy(() => import("../pages/User/SettingsPage"))
const Anlytics = lazy(() => import("../pages/User/AnalyticsPage"))
const Budget = lazy(() => import("../pages/User/Budget"))
const Categories = lazy(() => import("../pages/User/Categories"))

const AdminHome = lazy(() => import("../pages/Admin/Home"))
const AdminTransactions = lazy(() => import("../pages/Admin/Transaction"))
const AdminHelp = lazy(() => import("../pages/Admin/Help"))
const AdminSetting = lazy(() => import("../pages/Admin/Settings"))
const AdminAnlytics = lazy(() => import("../pages/Admin/Analytics"))
const AdminBudget = lazy(() => import("../pages/Admin/Budget"))
const AdminCategories = lazy(() => import("../pages/Admin/Category"))
const AllUsers = lazy(() => import("../pages/Admin/Users"))


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
          <Route path="/forgot-password" element={<ForgotPassword />} />

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
            <Route path="/admin/budget" element={<AdminBudget />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/analytics" element={<AdminAnlytics />} />
            <Route path="/admin/help" element={<AdminHelp />} />
            <Route path="/admin/settings" element={<AdminSetting />} />
            <Route path="/admin/transaction" element={<AdminTransactions />} />
            <Route path="/admin/users" element={<AllUsers />} />

          </Route>

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}