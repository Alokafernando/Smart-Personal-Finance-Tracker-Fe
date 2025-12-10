import { useState, type FormEvent } from "react"
import { getUserDetails, login } from "../services/auth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Swal from "sweetalert2"
import { Eye, EyeOff, Mail, Lock, ArrowRight, Wallet, TrendingUp, Shield, Zap } from "lucide-react"

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "All fields are required!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      })
      return
    }

    setLoading(true)

    try {
      const res = await login(email, password)

      if (!res.data.accessToken) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        })
        setLoading(false)
        return
      }

      localStorage.setItem("accessToken", res.data.accessToken)
      localStorage.setItem("refreshToken", res.data.refreshToken)

      const detail = await getUserDetails()
      setUser(detail.data)

      navigate("/home")
    } catch (err: any) {
      console.error(err)

      const message = err?.response?.data?.message || "Invalid credentials. Please try again."

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: message,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1a1a1a] relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-32 right-20 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        {/* Floating icons */}
        <div className="absolute top-32 left-32 text-amber-500/30 animate-bounce">
          <Wallet className="w-16 h-16" />
        </div>
        <div className="absolute top-48 right-32 text-orange-500/25 animate-bounce" style={{ animationDelay: "1s" }}>
          <TrendingUp className="w-12 h-12" />
        </div>
        <div className="absolute bottom-48 left-24 text-yellow-500/20 animate-bounce" style={{ animationDelay: "2s" }}>
          <Shield className="w-14 h-14" />
        </div>
        <div
          className="absolute bottom-32 right-40 text-amber-400/25 animate-bounce"
          style={{ animationDelay: "0.5s" }}
        >
          <Zap className="w-10 h-10" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-8 shadow-lg shadow-amber-500/25">
              <Wallet className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight text-balance">
              Finance without
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                the complexity.
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-md leading-relaxed">
            Track expenses, scan receipts, and get AI-powered insights. Your complete financial companion.
          </p>

          {/* Stats */}
          <div className="flex gap-12 mt-12 pt-12 border-t border-white/10">
            <div>
              <div className="text-3xl font-bold text-white">50K+</div>
              <div className="text-gray-500 text-sm mt-1">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">$2M+</div>
              <div className="text-gray-500 text-sm mt-1">Tracked Monthly</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-gray-500 text-sm mt-1">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#faf9f7]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-[#1a1a1a]">FinanceAI</span>
          </div>

          {/* Header */}
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-[#1a1a1a]">Welcome back</h2>
            <p className="text-gray-500 mt-2">Login to continue managing your finances</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-[#1a1a1a] text-sm mb-2 font-medium">Email address</label>
              <div
                className={`relative rounded-2xl transition-all duration-300 ${focusedInput === "email" ? "ring-2 ring-amber-500/50 shadow-lg shadow-amber-500/10" : ""}`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail
                    className={`w-5 h-5 transition-colors duration-300 ${focusedInput === "email" ? "text-amber-500" : "text-gray-400"}`}
                  />
                </div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-gray-200 text-[#1a1a1a] placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-all duration-300"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[#1a1a1a] text-sm font-medium">Password</label>
                <a
                  href="/forgot-password"
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>
              <div
                className={`relative rounded-2xl transition-all duration-300 ${focusedInput === "password" ? "ring-2 ring-amber-500/50 shadow-lg shadow-amber-500/10" : ""}`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    className={`w-5 h-5 transition-colors duration-300 ${focusedInput === "password" ? "text-amber-500" : "text-gray-400"}`}
                  />
                </div>
                <input
                  type={showPw ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white border-2 border-gray-200 text-[#1a1a1a] placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-all duration-300"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-8"
            >
              {/* Button gradient background */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-transform duration-500 group-hover:scale-105" />
              {/* Button content */}
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 mt-8">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
              Register
            </a>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-10 pt-8 border-t border-gray-200">
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-4 h-4" />
              <span className="text-xs">256-bit SSL</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Lock className="w-4 h-4" />
              <span className="text-xs">Bank-level security</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
