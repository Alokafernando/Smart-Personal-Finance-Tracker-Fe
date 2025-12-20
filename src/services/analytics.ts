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