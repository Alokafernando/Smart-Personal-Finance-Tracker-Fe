import React, { useState, type ChangeEvent } from "react"
import { User, Save, Upload, Mail, Bell, Globe, ShieldCheck, Smartphone, Lock, X, } from "lucide-react"

export default function SettingsPage() {
  const [profilePic, setProfilePic] = useState<string>("/avatar-placeholder.png")
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)

  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfilePic = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setProfilePic(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Profile updated successfully!")
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Password changed successfully!")
    setIsPasswordModalOpen(false)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-blue-50 to-gray-100 p-8">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
          <User size={34} className="text-blue-600" />
          Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your profile, preferences, notifications, and security.
        </p>
      </div>

      <div className="space-y-10 max-w-4xl">
        {/* ===================== PROFILE ===================== */}
        <section className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Profile Information
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Pic */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img src={profilePic} alt="Profile" className="w-28 h-28 rounded-full object-cover border shadow-md" />

                <label htmlFor="profile-upload" className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-lg transition" >
                  <Upload size={16} />
                  <input id="profile-upload" type="file" accept="image/*" className="hidden" onChange={handleProfilePic} />
                </label>
              </div>

              <div>
                <p className="text-lg font-semibold text-gray-900">
                  {userData.name}
                </p>
                <p className="text-gray-600 text-sm">{userData.email}</p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50 shadow-sm">
                <User size={18} className="text-gray-400 mr-2" />
                <input type="text" name="name" value={userData.name} onChange={handleChange} className="flex-1 bg-transparent outline-none" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50 shadow-sm">
                <Mail size={18} className="text-gray-400 mr-2" />
                <input type="email" name="email" value={userData.email} onChange={handleChange} className="flex-1 bg-transparent outline-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition active:scale-95" >
                <Save size={18} />
                Save Changes
              </button>

              <button type="button" onClick={() => setIsPasswordModalOpen(true)} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-xl shadow-md transition active:scale-95">
                <Lock size={18} />
                Password Change
              </button>
            </div>
          </form>
        </section>

        <section className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Preferences
          </h2>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Globe className="text-blue-600" size={20} />
              <p className="font-medium text-gray-700">Currency</p>
            </div>

            <select className="border rounded-xl px-4 py-2 bg-gray-50 shadow-sm">
              <option>LKR (₨)</option>
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>INR (₹)</option>
            </select>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Smartphone size={20} className="text-blue-600" />
              <p className="font-medium text-gray-700">Dark Mode</p>
            </div>

            <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-xl text-sm shadow-sm">
              Coming Soon
            </button>
          </div>
        </section>

        <section className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Bell className="text-blue-600" size={22} />
            Notifications
          </h2>

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-700">Monthly Summary</p>

              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" disabled />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></div>
              </label>
            </div>

            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-700">Budget Alerts</p>

              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" disabled />
                <div className="w-12 h-6 bg-gray-300 rounded-full peer"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></div>
              </label>
            </div>
          </div>
        </section>

        <section className="bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <ShieldCheck size={22} className="text-blue-600" />
            Security
          </h2>

          <p className="text-gray-600 text-sm mb-4">
            Additional security features will be added soon.
          </p>

          <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-xl text-sm shadow-sm">
            Coming Soon
          </button>
        </section>
      </div>

      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">

            <button onClick={() => setIsPasswordModalOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Lock size={22} className="text-blue-600" />
              Change Password
            </h2>

            <form onSubmit={handlePasswordSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input name="currentPassword" type="password" onChange={handlePasswordChange} className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none shadow-sm" required />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input name="newPassword" type="password" onChange={handlePasswordChange} className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none shadow-sm" />

                 <p className="text-xs text-gray-400 mt-1 ml-1">
                  Leave blank if you don't want to change it.
                </p>

              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input name="confirmPassword" type="password" onChange={handlePasswordChange} className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none shadow-sm" required />
              </div>

              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition active:scale-95 mt-4">
                Change Password
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
