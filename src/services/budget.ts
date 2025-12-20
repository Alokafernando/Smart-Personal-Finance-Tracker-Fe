import api from "./api"

export type Budget = {
  _id?: string
  category_id: string
  amount: number
  month: string
  year: number  
  user_id?: string
}

export const getAllBudgets = async () => {
  const res = await api.get("/budget/")
  return res.data
}

export const addBudget = async (data: any) => {
  const res = await api.post("/budget/", data)
  return res.data
}

export const updateBudget = async (budgetId: string, body: any) => {
  const res = await api.put(`/budget/${budgetId}`, body)
  return res.data
}

export const deleteBudget = async (budgetId: string) => {
  const res = await api.delete(`/budget/${budgetId}`)
  return res.data
}

export const getLatestBudgets = async () => {
  const res = await api.get("/budget/latest/")
  return res.data
}