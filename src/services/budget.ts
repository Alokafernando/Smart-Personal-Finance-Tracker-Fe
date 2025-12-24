import api from "./api"

export type Budget = {
  _id?: string
  category_id: string
  amount: number
  month: string
  year: number
  user_id?: string
  spent?: number
}

export type AdminBudget = {
  userId: string
  username: string
  email: string
  budgets: {
    category: string
    limit: number
    spent: number
  }[]
}

export const getAllBudgets = async () => {
  const res = await api.get("/budget/")
  return res.data
}

export const addBudget = async (data: Budget) => {
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

export const getAllBudgetsForAdmin = async (
  page: number,
  limit: number,
  searchUser?: string,
  category?: string,
  status?: "ALL" | "OVER" | "OK"
): Promise<{ users: AdminBudget[]; page: number; totalPages: number; totalBudgets: number }> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  if (searchUser) params.append("searchUser", searchUser)
  if (category && category !== "ALL") params.append("category", category)
  if (status && status !== "ALL") params.append("status", status)

  const res = await api.get(`/budget/all?${params.toString()}`)
  return res.data
}
