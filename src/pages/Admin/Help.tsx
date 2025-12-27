import { Shield,  Users, Wallet, Tags,  BarChart3,  Settings, Info, CheckCircle, } from "lucide-react"

export default function AdminHelp() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
              <Shield className="text-white" size={26} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Admin Help & Guide
              </h1>
              <p className="text-gray-500">
                Understand how the admin panel works and where to manage system data
              </p>
            </div>
          </div>
        </header>

        {/* Admin Overview */}
        <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Info className="text-amber-600" size={20} />
            Admin Role Overview
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm">
            The Admin Panel allows system administrators to monitor users,
            manage financial data, analyze platform usage, and maintain
            overall system stability. Admins have elevated permissions and
            access to all user-level data in a read-only or controlled manner.
          </p>
        </section>

        {/* How Admin Works */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Users */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <Users className="text-amber-600" />
              <h3 className="font-semibold text-gray-800">User Management</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• View all registered users</li>
              <li>• Monitor account status (Active / Suspended)</li>
              <li>• View user email & registration info</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              Location: <strong>Admin → Users</strong>
            </p>
          </div>

          {/* Transactions */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <Wallet className="text-amber-600" />
              <h3 className="font-semibold text-gray-800">Transactions</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• View all income & expense records</li>
              <li>• Filter by user, category, date</li>
              <li>• Detect unusual financial activity</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              Location: <strong>Admin → Transactions</strong>
            </p>
          </div>

          {/* Categories */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <Tags className="text-amber-600" />
              <h3 className="font-semibold text-gray-800">Categories</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• View all user-created categories</li>
              <li>• Manage default system categories</li>
              <li>• Support AI categorization mapping</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              Location: <strong>Admin → Categories</strong>
            </p>
          </div>

          {/* Analytics */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100 p-6 hover:shadow-lg transition">
            <div className="flex items-center gap-3 mb-3">
              <BarChart3 className="text-amber-600" />
              <h3 className="font-semibold text-gray-800">Analytics</h3>
            </div>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• View platform-wide financial trends</li>
              <li>• Analyze income vs expense ratios</li>
              <li>• Monitor user engagement</li>
            </ul>
            <p className="mt-3 text-xs text-gray-500">
              Location: <strong>Admin → Analytics</strong>
            </p>
          </div>
        </section>

        {/* System Controls */}
        <section className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Settings className="text-amber-600" size={20} />
            System & Security Controls
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {[
              "JWT Authentication Monitoring",
              "API Health & Stability",
              "Data Consistency Checks",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100"
              >
                <CheckCircle className="text-green-500" size={18} />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Note */}
        <footer className="text-center text-sm text-gray-500 pt-4">
          Admin access is restricted. All actions are logged for security and auditing purposes.
        </footer>

      </div>
    </div>
  )
}
