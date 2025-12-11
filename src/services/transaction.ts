import api from "./api"

export type Transaction = {
    _id: string
    user_id: string
    category_id?: string
    amount: number
    date: string
    type: "INCOME" | "EXPENSE"
    note?: string
    merchant?: string
    raw_text?: string
    ai_category?: string
}

export const getAllTransactions = async () => {
  const res = await api.get("/api/transactions")
  return res.data
}

export const createTransaction = async () => {
  const res = await api.post("/api/transactions")
  return res.data
}
