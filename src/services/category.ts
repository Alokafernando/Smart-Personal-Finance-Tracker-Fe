import api from "./api"

export type Category = {
  _id: string
  name: string
  type: "INCOME" | "EXPENSE"
  icon: string
  color: string
  is_default: boolean
}

export const getAllCategories = async () => {
  const res = await api.get("/category/")
  return res.data
}
