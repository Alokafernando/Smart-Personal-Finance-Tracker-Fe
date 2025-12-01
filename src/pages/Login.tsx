import { useState, type FormEvent } from "react";
import { getUserDetails, login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const res = await login(email, password);

      if (!res.data.accessToken) {
        alert("Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      const detail = await getUserDetails();
      setUser(detail.data);

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0d0f1a] flex items-center justify-center px-6 relative overflow-hidden">

      {/* Animated Blurred Background Elements */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl animate-ping"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-[#141726]/90 backdrop-blur-xl 
                      border border-white/10 rounded-2xl p-8 shadow-[0_0_40px_-10px_rgba(0,0,0,0.6)]
                      transition hover:shadow-[0_0_60px_-10px_rgba(0,0,0,0.8)]">

        <h1 className="text-3xl font-bold text-center">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </span>
        </h1>

        <p className="text-gray-400 text-center mt-2">
          Login to continue managing your finances
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl bg-[#1b1f33] border border-white/10 
                         text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none
                         transition"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-gray-300 mb-1">Password</label>
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>

            <input
              type={showPw ? "text" : "password"}
              className="w-full px-4 py-3 rounded-xl bg-[#1b1f33] border border-white/10 
                         text-gray-200 focus:ring-2 focus:ring-purple-600 focus:outline-none
                         transition"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r 
                       from-blue-600 to-purple-700 hover:opacity-90 transition
                       shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:text-blue-300">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
