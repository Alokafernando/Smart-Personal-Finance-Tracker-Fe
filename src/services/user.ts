import api from "./api"

export type Status = "PENDING" | "APPROVED" | "REJECTED"
export type UserRole = "ADMIN" | "USER"

export interface IUser {
  _id: string
  username: string
  email: string
  profileURL?: string
  role: UserRole[]
  status: Status
  transactions?: number
}

export const updateUserDetails = async (userId: string, data: any) => {
    const res = await api.put(`/user/${userId}`, data)
    return res.data
}

export const updateProfileImage = async (file: File) => {
  const formData = new FormData()
  formData.append("image", file)

  const res = await api.put("/user/profile/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return res.data
}

export const getAllUsers = async () => {
  const res = await api.get("/user/")
  return res.data
}

export const updateUserStatus = async (userId: string, status: Status) => {
  const res = await api.put(`/user/${userId}/status`, { status })
  return res.data
}

export const getEachUserTransactionCount = async () => {
  const res = await api.get("/user/user-count");
  return res.data
};