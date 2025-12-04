import api from "./api"

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