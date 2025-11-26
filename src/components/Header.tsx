import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white shadow-md p-4 flex justify-between items-center">
      {/* Left side: Logo / App name */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">
          💰 Finance Tracker
        </h1>
        <nav className="flex space-x-4">
          <Link to="/home" className="hover:text-yellow-300 transition">
            Dashboard
          </Link>
          <Link to="/post" className="hover:text-yellow-300 transition">
            Transactions
          </Link>
          {user?.role?.includes("ADMIN") && (
            <Link to="/my-post" className="hover:text-yellow-300 transition">
              My Posts
            </Link>
          )}
        </nav>
      </div>

      {/* Right side: User info + Logout */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
              {user?.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100 transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
