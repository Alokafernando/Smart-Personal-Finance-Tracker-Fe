import React from "react"
import { Wallet, ArrowUpCircle, ArrowDownCircle, Plus } from "lucide-react"

export default function WalletPage() {
  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Wallet className="w-8 h-8 text-blue-600" />
          Wallet
        </h1>

        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition">
          <Plus size={20} />
          Add Transaction
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Balance */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-gray-500">Current Balance</p>
          <h2 className="text-3xl font-bold mt-2">Rs. 120,500.00</h2>
        </div>

        {/* Income */}
        <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-3">
          <ArrowUpCircle className="text-green-600 w-8 h-8" />
          <div>
            <p className="text-gray-500">Total Income</p>
            <h2 className="text-2xl font-bold">Rs. 180,000.00</h2>
          </div>
        </div>

        {/* Expense */}
        <div className="bg-white p-5 rounded-2xl shadow flex items-center gap-3">
          <ArrowDownCircle className="text-red-600 w-8 h-8" />
          <div>
            <p className="text-gray-500">Total Expense</p>
            <h2 className="text-2xl font-bold">Rs. 59,500.00</h2>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Amount</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-4">Salary</td>
                <td className="p-4">Income</td>
                <td className="p-4">2025-12-01</td>
                <td className="p-4 text-green-600 font-semibold">+ Rs. 120,000</td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Grocery</td>
                <td className="p-4">Expense</td>
                <td className="p-4">2025-12-02</td>
                <td className="p-4 text-red-600 font-semibold">- Rs. 3,500</td>
              </tr>

              <tr className="border-t">
                <td className="p-4">Petrol</td>
                <td className="p-4">Expense</td>
                <td className="p-4">2025-12-03</td>
                <td className="p-4 text-red-600 font-semibold">- Rs. 5,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
