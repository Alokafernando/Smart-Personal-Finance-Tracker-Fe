import api from "./api"

export const updateUserDetails = async (userId: string, data: any) => {
    const res = await api.put(`/user/${userId}`, data)
    return res.data
}
