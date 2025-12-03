import React, { useState, type ChangeEvent } from "react";
import {
  User,
  Lock,
  Save,
  Upload,
  Mail,
  Bell,
  Globe,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export default function SettingsPage() {
  const [profilePic, setProfilePic] = useState<string>("/avatar-placeholder.png");
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "",
  });

  /* -------------------- Handle Input -------------------- */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  /* -------------------- Profile Pic Upload -------------------- */
  const handleProfilePic = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setProfilePic(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    // TODO: integrate backend API
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen w-full overflow-y-auto">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-800 flex items-center gap-2">
          <User className="text-blue-600" size={28} /> Settings
        </h1>
        <p className="text-gray-500 text-sm">
          Manage your account, preferences, and security settings.
        </p>
      </header>

      {/* ------------------------ PROFILE SETTINGS ------------------------ */}
      <section className="bg-white border rounded-xl shadow-sm p-6 max-w-3xl mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Profile Information
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Photo */}
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={profilePic}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border shadow-sm"
              />

              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full cursor-pointer hover:bg-blue-700 shadow"
              >
                <Upload size={14} />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePic}
                />
              </label>
            </div>

            <div>
              <p className="text-gray-800 font-semibold text-lg">
                {userData.name}
              </p>
              <p className="text-gray-500 text-sm">{userData.email}</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <User size={16} className="text-gray-400 mr-2" />
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="flex-1 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <Mail size={16} className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="flex-1 outline-none bg-transparent"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Change Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
              <Lock size={16} className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="flex-1 outline-none bg-transparent"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 ml-1">
              Leave blank to keep your current password.
            </p>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            <Save size={16} /> Save Changes
          </button>
        </form>
      </section>

      {/* ------------------------ PREFERENCES ------------------------ */}
      <section className="bg-white border rounded-xl shadow-sm p-6 max-w-3xl mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Preferences
        </h2>

        {/* Currency */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-blue-600" />
            <p className="text-gray-700 font-medium">Currency</p>
          </div>

          <select className="border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-200">
            <option>LKR (₨)</option>
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>INR (₹)</option>
          </select>
        </div>

        {/* Dark Mode */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Smartphone size={18} className="text-blue-600" />
            <p className="text-gray-700 font-medium">Dark Mode</p>
          </div>

          <button className="bg-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-300">
            Coming Soon
          </button>
        </div>
      </section>

      {/* ------------------------ NOTIFICATIONS ------------------------ */}
      <section className="bg-white border rounded-xl shadow-sm p-6 max-w-3xl mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Bell size={20} className="text-blue-600" />
          Notification Settings
        </h2>

        <div className="space-y-4">
          {/* Monthly Summary */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Monthly Expense Summary</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" disabled />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
            </label>
          </div>

          {/* Budgets */}
          <div className="flex justify-between items-center">
            <p className="text-gray-700 font-medium">Budget Alerts</p>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" disabled />
              <div className="w-11 h-6 bg-gray-300 rounded-full peer"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-5 transition"></div>
            </label>
          </div>
        </div>
      </section>

      {/* ------------------------ SECURITY ------------------------ */}
      <section className="bg-white border rounded-xl shadow-sm p-6 max-w-3xl mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <ShieldCheck size={20} className="text-blue-600" />
          Security
        </h2>

        <p className="text-gray-600 text-sm mb-3">
          Your account security is important. Additional security features will
          be added soon.
        </p>

        <button className="bg-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm">
          Coming Soon
        </button>
      </section>
    </div>
  );
}
