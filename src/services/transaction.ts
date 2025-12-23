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

export const getAllTransactions = async (page: number, limit: number) => {
  const res = await api.get(`/transactions?page=${page}&limit=${limit}`)
  return res.data
}

export const createTransaction = async (data: any) => {
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

export const getLatestTransaction = async () => {
  const res = await api.get("/transactions/latest")
  return res.data
}

export const getAllTransactionsForAdmin = async (
  page: number,
  limit: number,
  searchUser?: string,
  filterType?: "ALL" | "INCOME" | "EXPENSE",
  fromDate?: string,
  toDate?: string
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  })

  if (searchUser) params.append("searchUser", searchUser)
  if (filterType) params.append("filterType", filterType)
  if (fromDate) params.append("fromDate", fromDate)
  if (toDate) params.append("toDate", toDate)

  const res = await api.get(`/transactions/all?${params.toString()}`)
  return res.data
}
