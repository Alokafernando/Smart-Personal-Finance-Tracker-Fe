import type React from "react"
import { useEffect, useState, type ChangeEvent } from "react"
import { User, Save, Camera, Mail, Bell, Globe, ShieldCheck, Smartphone, Lock, X, Eye, EyeOff, Settings, ChevronRight, Shield, HelpCircle } from "lucide-react"
import defaultUser from "../../assets/default-user.jpg"
import { getUserDetails, passwordChangeHandle } from "../../services/auth"
import { updateProfileImage, updateUserDetails } from "../../services/user"
import { useAuth } from "../../context/authContext"
import Swal from "sweetalert2"

export default function SettingsPage() {
  const { user } = useAuth()

  const [profilePic, setProfilePic] = useState<string>(defaultUser)
  const [userData, setUserData] = useState({ name: "", email: "" })
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })

  // show passwords
  const [showCurrentPw, setShowCurrentPw] = useState(false)
  const [showNewPw, setShowNewPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)

  //profile modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [newProfilePic, setNewProfilePic] = useState<string | null>(null)

  // password regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

  // active tab
  const [activeTab, setActiveTab] = useState("profile")

  // get username and email from the getUserDetails method's response
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserDetails()
        setUserData({
          name: res.data.username,
          email: res.data.email,
        })
        setProfilePic(res.data.profileURL || defaultUser)
      } catch (err) {
        console.error("Failed to fetch user details:", err)
      }
    }

    fetchUser()
  }, [])

  //update username
  const updateDetails = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user?.userId) {
      alert("User not logged in")
      return
    }

    try {
      const payload = {
        username: userData.name,
        role: user.role,
        password: undefined,
      }

      const res = await updateUserDetails(user.userId, payload)
      console.log(res.message)

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        confirmButtonColor: "#f59e0b",
      })
    } catch (err: any) {
      console.error("Failed to update user: ", err.response?.data || err)
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Failed to update your profile. Please try again.",
        confirmButtonColor: "#dc2626",
      })
    }
  }

  // Update userData state as the user types in the input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  //change password
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all password fields",
        confirmButtonColor: "#dc2626",
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "New password and confirm password must match",
        confirmButtonColor: "#dc2626",
      })
      return
    }

    if (!passwordRegex.test(passwordData.newPassword)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
        confirmButtonColor: "#dc2626",
      })
      return
    }

    try {
      const res = await passwordChangeHandle(passwordData.currentPassword, passwordData.newPassword)
      Swal.fire({
        icon: "success",
        title: "Password Changed",
        text: res.message || "Your password has been updated successfully!",
        confirmButtonColor: "#f59e0b",
      })

      setIsPasswordModalOpen(false)
    } catch (err: any) {
      console.error(err)
      Swal.fire({
        icon: "error",
        title: "Failed to Change Password",
        text: err.response?.data?.message || "Something went wrong. Try again.",
        confirmButtonColor: "#dc2626",
      })
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  //==========================profile modal==========================
  const openProfileModal = () => {
    setNewProfilePic(profilePic)
    setIsProfileModalOpen(true)
  }

  const handleProfileModalFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (ev) => setNewProfilePic(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  const saveProfileImage = async () => {
    const fileInput = document.getElementById("profile-upload-modal") as HTMLInputElement
    const file = fileInput?.files?.[0]
    if (!file) return

    try {
      const res = await updateProfileImage(file)

      const newImageUrl = res.data.imageUrl
      setProfilePic(newImageUrl)
      setIsProfileModalOpen(false)

      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile image has been uploaded!",
        confirmButtonColor: "#f59e0b",
      })
    } catch (err: any) {
      console.error(err)
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: err.response?.data?.message || "Failed to upload profile image. Try again.",
        confirmButtonColor: "#dc2626",
      })
    }
  }

  const tabs = [
    { id: "profile", label: "Admin Profile", icon: User },
    { id: "security", label: "Security", icon: ShieldCheck },
    { id: "system", label: "System Settings", icon: Settings },
    { id: "notifications", label: "Admin Alerts", icon: Bell },
  ]


  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4 md:p-8 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200/40 to-orange-200/40 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-yellow-200/40 to-amber-200/40 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-orange-200/30 to-yellow-200/30 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
              <Settings size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Admin Settings</h1>
              <p className="text-gray-500">Manage administrator account, security, and system preferences</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl p-4 sticky top-8">
              {/* Profile Summary */}
              <div className="flex items-center gap-4 p-4 mb-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                <div className="relative">
                  <img
                    src={profilePic || "/placeholder.svg"}
                    alt="Profile"
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-200 shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{userData.name || "User"}</h3>
                  <p className="text-sm text-gray-500 truncate">{userData.email}</p>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === tab.id
                        ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-200"
                        : "text-gray-600 hover:bg-amber-50"
                      }`}
                  >
                    <tab.icon
                      size={20}
                      className={activeTab === tab.id ? "text-white" : "text-gray-400 group-hover:text-amber-500"}
                    />
                    <span className="font-medium">{tab.label}</span>
                    <ChevronRight
                      size={16}
                      className={`ml-auto transition-transform ${activeTab === tab.id ? "text-white/70" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </nav>

              {/* Help Card */}
              <div className="mt-6 p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <HelpCircle size={18} className="text-amber-600" />
                  <span className="font-medium text-amber-800">Need Help?</span>
                </div>
                <p className="text-sm text-amber-700 mb-3">Contact our support team for assistance.</p>
                <button className="w-full py-2 text-sm font-medium text-amber-700 bg-white rounded-lg hover:bg-amber-50 transition shadow-sm">
                  Get Support
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Profile Section */}
            {activeTab === "profile" && (
              <section className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <User size={22} />
                    Profile Information
                  </h2>
                  <p className="text-amber-100 text-sm">Update your personal details</p>
                </div>

                <form onSubmit={updateDetails} className="p-6 space-y-6">
                  {/* Profile Picture */}
                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <div className="relative group">
                      <img
                        src={profilePic || "/placeholder.svg"}
                        alt="Profile"
                        className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl transition-transform group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={openProfileModal}
                        className="absolute bottom-1 right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white p-2.5 rounded-full cursor-pointer hover:from-amber-600 hover:to-orange-600 shadow-lg transition-all hover:scale-110"
                      >
                        <Camera size={18} />
                      </button>
                    </div>

                    <div className="text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-gray-900">{userData.name || "Your Name"}</h3>
                      <p className="text-gray-500">{userData.email}</p>
                      <button
                        type="button"
                        onClick={openProfileModal}
                        className="mt-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
                      >
                        Change profile photo
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <User size={16} className="text-amber-500" />
                        Full Name
                      </label>
                      <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-100 transition-all">
                        <input
                          type="text"
                          name="name"
                          value={userData.name || ""}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Mail size={16} className="text-amber-500" />
                        Email Address
                      </label>
                      <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                        <input
                          type="email"
                          name="email"
                          value={userData.email || ""}
                          onChange={handleChange}
                          className="flex-1 bg-transparent outline-none text-gray-500 cursor-not-allowed"
                          disabled
                        />
                        <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-md">Locked</span>
                      </div>
                      <p className="text-xs text-gray-400 ml-1">Email cannot be changed for security reasons</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
                    <button
                      type="submit"
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-amber-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Save size={18} />
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsPasswordModalOpen(true)}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Lock size={18} />
                      Change Password
                    </button>
                  </div>
                </form>
              </section>
            )}

            {/* Preferences Section */}
            {activeTab === "preferences" && (
              <section className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Settings size={22} />
                    Preferences
                  </h2>
                  <p className="text-amber-100 text-sm">Customize your experience</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* Currency */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-md">
                        <Globe className="text-white" size={22} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Currency</p>
                        <p className="text-sm text-gray-500">Set your preferred currency</p>
                      </div>
                    </div>

                    <select className="border-2 border-gray-200 rounded-xl px-4 py-3 bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all font-medium">
                      <option>LKR (Rs)</option>
                      <option>USD ($)</option>
                      <option>EUR (Euro)</option>
                      <option>INR (Rupee)</option>
                    </select>
                  </div>

                  {/* Dark Mode */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-300 rounded-xl">
                        <Smartphone size={22} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Dark Mode</p>
                        <p className="text-sm text-gray-500">Switch to dark theme</p>
                      </div>
                    </div>

                    <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium">
                      Coming Soon
                    </span>
                  </div>

                  {/* Language */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-300 rounded-xl">
                        <Globe size={22} className="text-gray-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Language</p>
                        <p className="text-sm text-gray-500">Choose your language</p>
                      </div>
                    </div>

                    <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </section>
            )}

            {/* Notifications Section */}
            {activeTab === "notifications" && (
              <section className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Bell size={22} />
                    Notifications
                  </h2>
                  <p className="text-amber-100 text-sm">Manage your notification preferences</p>
                </div>

                <div className="p-6 space-y-4">
                  {[
                    { title: "Monthly Summary", desc: "Get a monthly overview of your finances", enabled: false },
                    { title: "Budget Alerts", desc: "Notify when approaching budget limits", enabled: false },
                    { title: "Transaction Reminders", desc: "Remind to log daily transactions", enabled: false },
                    { title: "Weekly Reports", desc: "Receive weekly spending reports", enabled: false },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 hover:border-amber-200 hover:bg-amber-50/50 transition-all"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>

                      <label className="relative inline-flex items-center cursor-not-allowed">
                        <input type="checkbox" className="sr-only peer" disabled />
                        <div className="w-14 h-7 bg-gray-300 rounded-full peer"></div>
                        <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow transition peer-checked:translate-x-7"></div>
                        <span className="ml-3 text-xs text-gray-400">Soon</span>
                      </label>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Security Section */}
            {activeTab === "security" && (
              <section className="bg-white/70 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <ShieldCheck size={22} />
                    Security
                  </h2>
                  <p className="text-amber-100 text-sm">Protect your account</p>
                </div>

                <div className="p-6 space-y-4">
                  {/* Password */}
                  <div
                    onClick={() => setIsPasswordModalOpen(true)}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 cursor-pointer hover:shadow-md hover:border-amber-200 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-md">
                        <Lock className="text-white" size={22} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Change Password</p>
                        <p className="text-sm text-gray-500">Update your password regularly</p>
                      </div>
                    </div>
                    <ChevronRight
                      size={20}
                      className="text-gray-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all"
                    />
                  </div>

                  {/* Two-Factor */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-300 rounded-xl">
                        <Shield className="text-gray-500" size={22} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add an extra layer of security</p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium">
                      Coming Soon
                    </span>
                  </div>

                  {/* Sessions */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-gray-300 rounded-xl">
                        <Smartphone className="text-gray-500" size={22} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Active Sessions</p>
                        <p className="text-sm text-gray-500">Manage your logged-in devices</p>
                      </div>
                    </div>
                    <span className="px-4 py-2 bg-gray-200 text-gray-500 rounded-xl text-sm font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

      {/* Password Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Lock size={22} />
                Change Password
              </h2>
              <button
                onClick={() => setIsPasswordModalOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-5">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Current Password</label>
                <div className="relative">
                  <input
                    name="currentPassword"
                    type={showCurrentPw ? "text" : "password"}
                    onChange={handlePasswordChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPw ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">New Password</label>
                <div className="relative">
                  <input
                    name="newPassword"
                    type={showNewPw ? "text" : "password"}
                    onChange={handlePasswordChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPw ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-400">Min 8 chars with uppercase, lowercase, number & special char</p>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPw ? "text" : "password"}
                    onChange={handlePasswordChange}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 bg-white outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100 transition-all"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPw ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3.5 rounded-xl shadow-lg shadow-amber-200 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Camera size={22} />
                Update Profile Picture
              </h2>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-white/80 hover:text-white hover:bg-white/20 p-1 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {newProfilePic && (
                <div className="flex justify-center">
                  <div className="relative">
                    <img
                      src={newProfilePic || "/placeholder.svg"}
                      alt="Preview"
                      className="w-36 h-36 rounded-full object-cover border-4 border-amber-200 shadow-xl"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>
              )}

              <input
                id="profile-upload-modal"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileModalFileChange}
              />

              <label
                htmlFor="profile-upload-modal"
                className="flex items-center justify-center gap-2 w-full bg-amber-50 text-amber-700 border-2 border-dashed border-amber-300 px-4 py-4 rounded-xl cursor-pointer hover:bg-amber-100 hover:border-amber-400 transition font-medium"
              >
                <Camera size={20} />
                Choose New Image
              </label>

              <div className="flex gap-3">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={saveProfileImage}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl shadow-lg shadow-amber-200 font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Save Photo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
