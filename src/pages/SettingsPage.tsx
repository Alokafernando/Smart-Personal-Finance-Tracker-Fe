import React, { useEffect, useState, type ChangeEvent } from "react"
import { User, Save, Camera, Mail, Bell, Globe, ShieldCheck, Smartphone, Lock, X, Eye, EyeOff } from "lucide-react"
import defaultUser from "../assets/default-user.jpg"
import { getUserDetails, passwordChangeHandle } from "../services/auth"
import { updateProfileImage, updateUserDetails } from "../services/user"
import { useAuth } from "../context/authContext"
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


  // get username and email from the getUserDetails method's response
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await getUserDetails()
      setUserData({
        name: res.data.username,
        email: res.data.email,
      })
      setProfilePic(res.data.profileURL || defaultUser) // <-- correct key
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
        password: undefined
      }

      const res = await updateUserDetails(user.userId, payload)
      Swal.fire({
        icon: "success",
        title: "Profile Updated",
        text: "Your profile has been updated successfully!",
        confirmButtonColor: "#2563eb",
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
        confirmButtonColor: "#dc2626"
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "New password and confirm password must match",
        confirmButtonColor: "#dc2626"
      })
      return
    }

    if (!passwordRegex.test(passwordData.newPassword)) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
        confirmButtonColor: "#dc2626"
      })
      return
    }

    try {

      const res = await passwordChangeHandle(passwordData.currentPassword, passwordData.newPassword)
      Swal.fire({
        icon: "success",
        title: "Password Changed",
        text: res.message || "Your password has been updated successfully!",
        confirmButtonColor: "#2563eb"
      })

      setIsPasswordModalOpen(false)

    } catch (err: any) {
      console.error(err)
      Swal.fire({
        icon: "error",
        title: "Failed to Change Password",
        text: err.response?.data?.message || "Something went wrong. Try again.",
        confirmButtonColor: "#dc2626"
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
        confirmButtonColor: "#2563eb",
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

          <form onSubmit={updateDetails} className="space-y-6">
            {/* Profile Pic */}
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-28 h-28 rounded-full object-cover border shadow-md"
                />

                <label
                  htmlFor="profile-upload"
                  onClick={openProfileModal}
                  className="absolute bottom-1 right-1 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 shadow-lg transition"
                >
                  <Camera size={16} />
                </label>
              </div>

              <div>
                <h5 className="text-4xl font-bold text-gray-700">
                  {userData.name}
                </h5>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50 shadow-sm">
                <User size={18} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="name"
                  value={userData.name || ""}
                  onChange={handleChange}
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="flex items-center border rounded-xl px-4 py-2 bg-gray-50 shadow-sm">
                <Mail size={18} className="text-gray-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                  className="flex-1 bg-transparent outline-none"
                  disabled
                />
              </div>
              <p className="text-xs text-gray-400 mt-1 ml-1">
                sorry email cannot editable
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button type="submit" onClick={updateDetails} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow-md transition active:scale-95" >
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

              {/* CURRENT PASSWORD */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    name="currentPassword"
                    type={showCurrentPw ? "text" : "password"}
                    onChange={handlePasswordChange}
                    className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none shadow-sm"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrentPw(!showCurrentPw)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showCurrentPw ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* NEW PASSWORD */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  New Password
                </label>

                <div className="relative">
                  <input
                    name="newPassword"
                    type={showNewPw ? "text" : "password"}
                    onChange={handlePasswordChange}
                    className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none shadow-sm"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNewPw(!showNewPw)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showNewPw ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <p className="text-xs text-gray-400 mt-1 ml-1">
                  Leave blank if you don't want to change it.
                </p>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPw ? "text" : "password"}
                    onChange={handlePasswordChange}
                    className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none shadow-sm"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPw(!showConfirmPw)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPw ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition active:scale-95 mt-4"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      )}

      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">
            <button onClick={() => setIsProfileModalOpen(false)} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Camera size={22} className="text-blue-600" /> Update Profile Picture
            </h2>

            {newProfilePic && (
              <div className="flex justify-center mb-6">
                <img src={newProfilePic} alt="Preview" className="w-32 h-32 rounded-full object-cover border shadow-md" />
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
              className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-xl text-center cursor-pointer hover:bg-gray-200 transition"
            >
              Choose New Image
            </label>

            <button onClick={saveProfileImage} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl shadow-md transition active:scale-95 mt-4">
              Save
            </button>

            <button onClick={() => setIsProfileModalOpen(false)} className="w-full bg-gray-300 text-gray-600 py-3 rounded-xl shadow-md hover:bg-gray-400 transition mt-2">
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  )
}
