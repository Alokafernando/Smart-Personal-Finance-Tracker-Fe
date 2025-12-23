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

export const getAllTransactions = async (params?: {
  page?: number
  limit?: number
  category_id?: string
  type?: "INCOME" | "EXPENSE"
  startDate?: string
  endDate?: string
  search?: string
}) => {
  const query = new URLSearchParams()

  if (params?.page) query.append("page", params.page.toString())
  if (params?.limit) query.append("limit", params.limit.toString())
  if (params?.category_id) query.append("category_id", params.category_id)
  if (params?.type) query.append("type", params.type)
  if (params?.startDate) query.append("startDate", params.startDate)
  if (params?.endDate) query.append("endDate", params.endDate)
  if (params?.search) query.append("search", params.search)

  const res = await api.get(`/transactions?${query.toString()}`)
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
