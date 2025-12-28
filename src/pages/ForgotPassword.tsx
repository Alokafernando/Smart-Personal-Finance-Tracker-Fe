import { useState, type FormEvent } from "react"
import { Mail, Wallet, TrendingUp, Shield, Zap, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [focusedInput, setFocusedInput] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Missing email",
        text: "Please enter your email address",
        confirmButtonColor: "#f59e0b",
      })
      return
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      Swal.fire({
        icon: "success",
        title: "Check your email",
        text: "We’ve sent password reset instructions to your email.",
        confirmButtonColor: "#f59e0b",
      })
    }, 1200)
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel - Decorative (SAME AS LOGIN) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1a1a1a] relative overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />

        {/* Floating icons */}
        <div className="absolute top-32 left-32 text-amber-500/30 animate-bounce">
          <Wallet className="w-16 h-16" />
        </div>
        <div className="absolute top-48 right-32 text-orange-500/25 animate-bounce">
          <TrendingUp className="w-12 h-12" />
        </div>
        <div className="absolute bottom-48 left-24 text-yellow-500/20 animate-bounce">
          <Shield className="w-14 h-14" />
        </div>
        <div className="absolute bottom-32 right-40 text-amber-400/25 animate-bounce">
          <Zap className="w-10 h-10" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-8 shadow-lg">
              <Wallet className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Reset your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
                financial access
              </span>
            </h1>
          </div>
          <p className="text-gray-400 text-lg max-w-md">
            Securely recover your account and continue tracking your finances.
          </p>
        </div>
      </div>

      {/* Right Panel - Forgot Password Form */}
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
            <h2 className="text-3xl font-bold text-[#1a1a1a]">
              Find your account
            </h2>
            <p className="text-gray-500 mt-2">
              Enter your email and we’ll send reset instructions
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#1a1a1a]">
                Email address
              </label>
              <div
                className={`relative rounded-2xl transition-all ${
                  focusedInput === "email"
                    ? "ring-2 ring-amber-500/50 shadow-lg shadow-amber-500/10"
                    : ""
                }`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail
                    className={`w-5 h-5 ${
                      focusedInput === "email"
                        ? "text-amber-500"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 group-hover:scale-105 transition-transform" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? "Sending..." : "Send reset link"}
                <ArrowRight className="w-5 h-5" />
              </span>
            </button>
          </form>

          {/* Back to login */}
          <p className="text-center text-gray-500 mt-8">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
