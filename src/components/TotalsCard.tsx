import type { ReactNode } from "react"

interface TotalsCardProps {
  title: string
  amount: number
  color: string
  icon: ReactNode
  trend?: string
  isGradient?: boolean
}

export default function TotalsCard({ title, amount, color, icon, trend, isGradient }: TotalsCardProps) {
  return (
    <div className={`group relative ${isGradient ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white" : "bg-white/70"} backdrop-blur-xl border border-white/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1`}>
      <div className="relative flex justify-between items-start">
        <div>
          <p className={`${isGradient ? "text-amber-100" : "text-gray-500"} text-sm font-medium mb-1`}>{title}</p>
          <h2 className={`text-3xl font-bold ${color}`}>Rs {amount.toFixed(2)}</h2>
          {trend && <p className={`text-xs mt-2 ${isGradient ? "text-amber-100" : ""}`}>{trend}</p>}
        </div>
        <div className={`${isGradient ? "bg-white/20 backdrop-blur-sm" : "bg-gradient-to-br from-green-400 to-emerald-500"} p-3 rounded-xl shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  )
}
