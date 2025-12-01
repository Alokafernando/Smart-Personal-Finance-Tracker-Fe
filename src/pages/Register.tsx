import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../services/auth"

export default function Register() {
  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)
  const [role] = useState("USER")

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    if (!username || !email || !password || !confirm) {
      alert("All fields are required")
      return
    }

    if (password !== confirm) {
      alert("Passwords do not match")
      return
    }

    setLoading(true)

    try {

      const obj: any = { username, email, password, role }
      const res = await register(obj)

      console.log(res.data)
      console.log(res.message)

      alert(`Reginstration successful! Email: ${res?.data?.email}`)
      navigate("/login")

    } catch (err: any) {
      if (err.response?.status === 400) {
        alert("Email already registered")
      } else {
        alert(err.response?.data?.message || "Something went wrong")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0d0f1a] flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-ping"></div>

      <div className="relative z-10 w-full max-w-md bg-[#141726]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)]">
        <h1 className="text-3xl font-bold text-center">
          <span className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Create Account
          </span>
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Start your journey with smart finance management
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">

          <div>
            <label className="block text-gray-300 mb-1">Username</label>
            <input className="w-full px-4 py-3 rounded-xl bg-[#1b1f33] border border-white/10 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:outline-none" placeholder="Your username" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-3 rounded-xl bg-[#1b1f33] border border-white/10 text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label className="text-gray-300 mb-1">Password</label>

              <button type="button" onClick={() => setShowPw(!showPw)}className="text-xs text-blue-400 hover:text-blue-300">
                {showPw ? "Hide" : "Show"}
              </button>
            </div>

            <input type={showPw ? "text" : "password"} className="w-full px-4 py-3 rounded-xl bg-[#1b1f33] border border-white/10 text-gray-200 ocus:ring-2 focus:ring-purple-600 focus:outline-none" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Confirm Password</label>
            <input type={showPw ? "text" : "password"} className="w-full px-4 py-3 rounded-xl bg-[#1b1f33] border border-white/10 text-gray-200 focus:ring-2 focus:ring-purple-600 focus:outline-none" placeholder="Re-enter password" value={confirm} onChange={(e) => setConfirm(e.target.value)}/>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition shadow-lg disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:text-blue-300">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}
