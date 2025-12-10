import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/auth"
import Swal from "sweetalert2"
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Wallet, TrendingUp, Shield, Zap, CheckCircle } from "lucide-react"

export default function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [role] = useState("USER")
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    if (!username || !email || !password || !confirm) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "All fields are required!",
        confirmButtonColor: "#f59e0b",
        confirmButtonText: "OK",
      })
      return
    }

    if (password !== confirm) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match!",
        confirmButtonColor: "#f59e0b",
        confirmButtonText: "OK",
      })
      return
    }

    setLoading(true)

    try {
      const obj: any = { username, email, password, role }
      const res = await register(obj)

      console.log(res.data)
      console.log(res.message)

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Email: ${res?.data?.email}`,
        confirmButtonColor: "#f59e0b",
        confirmButtonText: "OK",
      })
      navigate("/login")
    } catch (err: any) {
      if (err.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Email already registered!",
          confirmButtonColor: "#f59e0b",
          confirmButtonText: "OK",
        })
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.response?.data?.message || "Something went wrong",
          confirmButtonColor: "#f59e0b",
          confirmButtonText: "OK",
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignUp = () => {
    console.log("Google sign up clicked")
    // Implement your Google OAuth logic here
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
        <div className="absolute top-32 left-32 text-amber-500/30 animate-bounce" style={{ animationDuration: "3s" }}>
          <Wallet className="w-16 h-16" />
        </div>
        <div
          className="absolute top-48 right-32 text-orange-500/25 animate-bounce"
          style={{ animationDelay: "1s", animationDuration: "3.5s" }}
        >
          <TrendingUp className="w-12 h-12" />
        </div>
        <div
          className="absolute bottom-48 left-24 text-yellow-500/20 animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        >
          <Shield className="w-14 h-14" />
        </div>
        <div
          className="absolute bottom-32 right-40 text-amber-400/25 animate-bounce"
          style={{ animationDelay: "0.5s", animationDuration: "3.2s" }}
        >
          <Zap className="w-10 h-10" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-8 shadow-lg shadow-amber-500/25">
              <Wallet className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Start your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                financial journey.
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-md leading-relaxed">
            Join thousands of users who trust us with their financial management. Smart, secure, simple.
          </p>

          {/* Benefits */}
          <div className="mt-12 pt-12 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-amber-500" />
              <span className="text-gray-300">Free forever for personal use</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-amber-500" />
              <span className="text-gray-300">AI-powered expense tracking</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-amber-500" />
              <span className="text-gray-300">Bank-level security & encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Register Form */}
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
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[#1a1a1a]">Create account</h2>
            <p className="text-gray-500 mt-2">Start your journey with smart finance management</p>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleGoogleSignUp}
            className="group w-full py-4 px-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-[#1a1a1a] font-semibold group-hover:text-gray-700 transition-colors">
              Sign up with Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#faf9f7] text-gray-400">or register with email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-[#1a1a1a] text-sm mb-2 font-medium">Username</label>
              <div
                className={`relative rounded-2xl transition-all duration-300 ${focusedInput === "username" ? "ring-2 ring-amber-500/50 shadow-lg shadow-amber-500/10" : ""}`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User
                    className={`w-5 h-5 transition-colors duration-300 ${focusedInput === "username" ? "text-amber-500" : "text-gray-400"}`}
                  />
                </div>
                <input
                  type="text"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-gray-200 text-[#1a1a1a] placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-all duration-300"
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedInput("username")}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
            </div>

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
              <label className="block text-[#1a1a1a] text-sm mb-2 font-medium">Password</label>
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
                  placeholder="Create a password"
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

            {/* Confirm Password Input */}
            <div>
              <label className="block text-[#1a1a1a] text-sm mb-2 font-medium">Confirm Password</label>
              <div
                className={`relative rounded-2xl transition-all duration-300 ${focusedInput === "confirm" ? "ring-2 ring-amber-500/50 shadow-lg shadow-amber-500/10" : ""}`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    className={`w-5 h-5 transition-colors duration-300 ${focusedInput === "confirm" ? "text-amber-500" : "text-gray-400"}`}
                  />
                </div>
                <input
                  type={showPw ? "text" : "password"}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-gray-200 text-[#1a1a1a] placeholder-gray-400 focus:border-amber-500 focus:outline-none transition-all duration-300"
                  placeholder="Confirm your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onFocus={() => setFocusedInput("confirm")}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-6"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 transition-transform duration-500 group-hover:scale-105" />
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
              Sign in
            </a>
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-gray-200">
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
