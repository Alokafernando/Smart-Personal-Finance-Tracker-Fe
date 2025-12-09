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

export const addCategories = async (data: Category) => {
  const res = await api.post("/category/", data)
  return res.data
}

export const updateCategory = async (categoryId: string, body: any) => {
  const res = await api.put(`/category/${categoryId}`, body)
  return res.data
}

export const deleteCategory = async (categoryId: string) => {
  const res = await api.delete(`/category/${categoryId}`)
  return res.data
}