import { useState, useEffect } from "react"
import { Users, UserCheck, UserX, Shield, Mail, Eye, X, Search } from "lucide-react"
import Swal from "sweetalert2"
import { getAllUsers, updateUserStatus } from "../../services/user"
import type { Status } from "../../services/user"
import type { IUser } from "../../services/user"

export default function UsersPage() {
    const [users, setUsers] = useState<IUser[]>([])
    const [search, setSearch] = useState("")
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [isViewModalOpen, setIsViewModalOpen] = useState(false)
    const [filterRole, setFilterRole] = useState<"ALL" | "ADMIN" | "USER">("ALL")
    const [loading, setLoading] = useState(true)

    const loadAllUsers = async () => {
        try {
            setLoading(true)
            const data = await getAllUsers()
            const mappedUsers = Array.isArray(data.users)
                ? data.users.map((u: any) => ({
                    ...u,
                    status: (u.approved?.trim().toUpperCase() as Status) || "PENDING",
                }))
                : []
            setUsers(mappedUsers)
        } catch (err) {
            console.error("Failed to fetch users:", err)
            setUsers([])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadAllUsers()
    }, [])

    const filteredUsers = users.filter(
        (u) =>
            (u.username.toLowerCase().includes(search.toLowerCase()) ||
                u.email.toLowerCase().includes(search.toLowerCase())) &&
            (filterRole === "ALL" || u.role.includes(filterRole))
    )

    const statusClasses: Record<Status, string> = {
        PENDING: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
        APPROVED: "bg-green-100 text-green-700 hover:bg-green-200",
        REJECTED: "bg-red-100 text-red-700 hover:bg-red-200",
    }

    const handleStatusChange = async (userId: string, newStatus: Status) => {
        if (newStatus === "REJECTED") {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "This user will be rejected!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc2626",
                cancelButtonColor: "#6b7280",
                confirmButtonText: "Yes, Reject",
                cancelButtonText: "Cancel",
            })

            if (!result.isConfirmed) return
        }

        try {
            const res = await updateUserStatus(userId, newStatus)
            console.log(res.message)

            await loadAllUsers()

            Swal.fire({
                icon: "success",
                title: "Updated",
                text: `User status changed to ${newStatus}`,
                timer: 1500,
                showConfirmButton: false,
            })
        } catch (error) {
            console.error("Status update failed:", error)

            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update user status",
            })
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* HEADER */}
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                        <Users size={28} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                        <p className="text-gray-500">Manage system users and access control</p>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <StatCard title="Total Users" value={users.length} icon={Users} />
                    <StatCard title="Approved Users" value={users.filter(u => u.status === "APPROVED").length} icon={UserCheck} />
                    <StatCard title="Rejected Users" value={users.filter(u => u.status === "REJECTED").length} icon={UserX} />
                    <StatCard title="Admins" value={users.filter(u => u.role.includes("ADMIN")).length} icon={Shield} />
                </div>

                {/* FILTER BUTTONS */}
                <div className="flex flex-wrap gap-2">
                    <FilterButton active={filterRole === "ALL"} onClick={() => setFilterRole("ALL")} label={`All (${users.length})`} />
                    <FilterButton active={filterRole === "ADMIN"} onClick={() => setFilterRole("ADMIN")} label={`Admins (${users.filter(u => u.role.includes("ADMIN")).length})`} />
                    <FilterButton active={filterRole === "USER"} onClick={() => setFilterRole("USER")} label={`Users (${users.filter(u => u.role.includes("USER")).length})`} />
                </div>

                {/* TABLE */}
                <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-xl overflow-hidden mt-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 rounded-t-2xl">
                        <h2 className="text-xl font-semibold text-white">All Users</h2>
                        <div className="relative w-full md:w-80">
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white shadow-sm border border-white/50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1"
                            />
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-amber-50 text-gray-600">
                                <tr>
                                    <th className="px-6 py-3 text-left">User</th>
                                    <th className="px-6 py-3 text-center">Role</th>
                                    <th className="px-6 py-3 text-center">Status</th>
                                    <th className="px-6 py-3 text-center">Transactions</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y min-h-[150px]">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-20 text-gray-500">
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={5}>
                                            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                                                <UserX size={48} className="mb-4 text-gray-400" />
                                                <span className="text-lg font-medium">No users found</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((u, index) => (
                                        <tr key={u._id} className={`transition-colors duration-150 ${index % 2 === 0 ? "bg-white" : "bg-white/90"} hover:bg-amber-50/50`}>
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-gray-900">{u.username}</p>
                                                <p className="text-gray-500 flex items-center gap-1"><Mail size={14} /> {u.email}</p>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${u.role.includes("ADMIN") ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}>{u.role.join(", ")}</span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <select
                                                    value={u.status}
                                                    onChange={(e) => handleStatusChange(u._id, e.target.value as Status)}
                                                    className={`px-5 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 min-w-[140px] ${statusClasses[u.status]}  `}
                                                >
                                                    <option value="PENDING">Pending 🟡</option>
                                                    <option value="APPROVED">Approved 🟢 </option>
                                                    <option value="REJECTED">Rejected 🔴</option>
                                                </select>
                                            </td>

                                            <td className="px-6 py-4 text-center font-medium">{u.transactions}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => { setSelectedUser(u); setIsViewModalOpen(true) }}
                                                    className="p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200 transition"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {isViewModalOpen && selectedUser && (
                <Modal title="User Details" onClose={() => setIsViewModalOpen(false)}>
                    <InfoRow label="Name" value={selectedUser.username} />
                    <InfoRow label="Email" value={selectedUser.email} />
                    <InfoRow label="Role" value={selectedUser.role.join(", ")} />
                    <InfoRow label="Status" value={selectedUser.status} />
                    <InfoRow label="Transactions" value={selectedUser.transactions} />
                </Modal>
            )}
        </div>
    )
}

function StatCard({ title, value, icon: Icon }: any) {
    return (
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg p-5 flex items-center gap-4 transition hover:shadow-xl">
            <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow">
                <Icon size={22} className="text-white" />
            </div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    )
}

function FilterButton({ active, onClick, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl font-medium transition-all ${active ? "bg-amber-500 text-white shadow-lg" : "bg-white border border-amber-300 text-gray-700 hover:bg-amber-50"}`}
        >
            {label}
        </button>
    )
}

function InfoRow({ label, value }: any) {
    return (
        <div className="flex justify-between bg-gray-50 px-4 py-3 rounded-xl border shadow-sm">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    )
}

function Modal({ title, children, onClose }: any) {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex justify-between items-center rounded-t-2xl">
                    <h2 className="text-xl font-semibold text-white">{title}</h2>
                    <button onClick={onClose} className="text-white/80 hover:text-white transition">
                        <X />
                    </button>
                </div>
                <div className="p-6 space-y-3">{children}</div>
            </div>
        </div>
    )
}
