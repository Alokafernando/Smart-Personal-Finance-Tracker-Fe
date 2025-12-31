import { useState, type FormEvent } from "react"
import { Wallet } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { sendOtp, verifyOtpAndResetPassword } from "../../services/auth"

export default function ForgotPassword() {
  const [step, setStep] = useState<"EMAIL" | "OTP">("EMAIL")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  // Send OTP
  const handleSendOtp = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) {
      Swal.fire({ icon: "warning", title: "Missing email", text: "Please enter your email address", confirmButtonColor: "#f59e0b" })
      return
    }

    setLoading(true)
    try {
      const res = await sendOtp(email)
      Swal.fire({ icon: "success", title: "Check your email", text: res.message })
      setStep("OTP")
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Oops!", text: err.response?.data?.message || "Something went wrong.", confirmButtonColor: "#f59e0b" })
    } finally {
      setLoading(false)
    }
  }

  // Verify OTP & Reset Password
  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    if (!otp || !newPassword) {
      Swal.fire({ icon: "warning", title: "Missing fields", text: "Please fill all fields", confirmButtonColor: "#f59e0b" })
      return
    }

    setLoading(true)
    try {
      const res = await verifyOtpAndResetPassword({ email, otp, newPassword })
      Swal.fire({ icon: "success", title: "Success", text: res.message, confirmButtonColor: "#f59e0b" }).then(() => { navigate("/login") })
      setStep("EMAIL") // Reset step
      setEmail("")
      setOtp("")
      setNewPassword("")
    } catch (err: any) {
      Swal.fire({ icon: "error", title: "Error", text: err.response?.data?.message, confirmButtonColor: "#f59e0b" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <div className="mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-8 shadow-lg">
              <Wallet className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white leading-tight">
              Reset your <br />
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

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-[#faf9f7]">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-[#1a1a1a]">
              {step === "EMAIL" ? "Find your account" : "Reset your password"}
            </h2>
            <p className="text-gray-500 mt-2">
              {step === "EMAIL"
                ? "Enter your email and we’ll send reset instructions"
                : "Enter the OTP sent to your email and choose a new password"}
            </p>
          </div>

          <form onSubmit={step === "EMAIL" ? handleSendOtp : handleResetPassword} className="space-y-6">
            {/* Email input always visible */}
            <div>
              <label className="block text-sm font-medium mb-2 text-[#1a1a1a]">Email address</label>
              <input
                type="email"
                className="w-full p-4 rounded-2xl bg-white border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={step === "OTP"}
              />
            </div>

            {/* OTP & New Password (Step 2) */}
            {step === "OTP" && (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1a1a1a]">OTP</label>
                  <input
                    type="text"
                    className="w-full p-4 rounded-2xl bg-white border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#1a1a1a]">New Password</label>
                  <input
                    type="password"
                    className="w-full p-4 rounded-2xl bg-white border-2 border-gray-200 focus:border-amber-500 focus:outline-none"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-semibold transition-all hover:scale-105"
            >
              {loading ? "Processing..." : step === "EMAIL" ? "Send OTP" : "Reset Password"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6">
            Remembered your password?{" "}
            <Link to="/login" className="text-amber-600 hover:text-amber-700 font-semibold">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
