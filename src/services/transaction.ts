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
  const res = await api.get("/transactions/")
  return res.data
}

export const createTransaction = async (data: Partial<Transaction>) => {
  const res = await api.post("/transactions/", data)
  return res.data
}

export const updateTransaction = async ( transactionId: string,  body: any ) => {
  const res = await api.put(`/transactions/${transactionId}`, body)
  return res.data
}

export const deleteTransaction = async (transactionId: string) => {
  const res = await api.delete(`/transactions/${transactionId}`)
  return res.data
}