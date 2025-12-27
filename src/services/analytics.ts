import api from "./api"

export type AnalyticsSummary = {
  income: number
  expense: number
  balance: number
  savingsRate: number
}

export type MonthlyAnalytics = {
  month: string
  income: number
  expense: number
}

export type CategoryAnalytics = {
  name: string
  value: number
}

export type AnalyticsResponse = {
  summary: AnalyticsSummary
  monthly: MonthlyAnalytics[]
  categories: CategoryAnalytics[]
}

export type AnalyticsFilter = {
  month?: number
  year?: number
  type?: "INCOME" | "EXPENSE"
  category?: string
}

export type BalanceTrend = {
  month: number
  balance: number
}

export type AdminSummary = {
  totalIncome: number
  totalExpense: number
  netBalance: number
}

export type AdminMonthlyAnalytics = {
  year: number
  month: number
  totalIncome: number
  totalExpense: number
  netBalance: number
}

export type TopCategory = {
  categoryId: string
  name: string
  totalAmount: number
}

export type UsersSummary = {
  totalUsers: number
  newUsers: number
  activeUsers: number
}

export const getAnalyticsSummary = async () => {
  const res = await api.get<AnalyticsSummary>("/analytics/summary")
  return res.data
}


export const getMonthlyAnalytics = async () => {
  const res = await api.get<MonthlyAnalytics[]>("/analytics/monthly")
  return res.data
}

export const getCategoryAnalytics = async () => {
  const res = await api.get<CategoryAnalytics[]>("/analytics/category")
  return res.data
}

export const getAnalytics = async (filter?: any) => {
  const res = await api.post<AnalyticsResponse>("/analytics/filter", filter || {})
  return res.data
}

export const downloadAnalyticsPDF = async (filter?: AnalyticsFilter) => {
  const res = await api.post(
    "/analytics/export/pdf",
    filter || {},
    {
      responseType: "blob", 
    }
  )

  return res.data
}

export const getBalanceTrend = async (): Promise<BalanceTrend[]> => {
  const res = await api.get<BalanceTrend[]>("/analytics/balance-trend")
  return res.data
}

//======================================= admin =======================================
export const getAdminAnalyticsSummary = async (): Promise<AdminSummary> => {
  const res = await api.get("/analytics/admin/summary")
  return res.data
}

export const getAdminMonthlyAnalytics = async (): Promise<AdminMonthlyAnalytics[]> => {
  const res = await api.get("/analytics/admin/monthly")
  return res.data.data
}

export const getAdminTopCategories = async (
  type: "INCOME" | "EXPENSE" = "EXPENSE",
  limit = 5
): Promise<TopCategory[]> => {
  const res = await api.get(
    `/analytics/admin/top-categories?type=${type}&limit=${limit}`
  )
  return res.data.data
}

export const getAdminUsersSummary = async (): Promise<UsersSummary> => {
  const res = await api.get("/analytics/admin/users")
  return res.data
}