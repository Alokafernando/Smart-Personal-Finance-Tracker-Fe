export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Smart Personal Finance Tracker
      </h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-gray-600 text-sm">Total Income</h2>
          <p className="text-2xl font-semibold text-green-600">$12,450</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-gray-600 text-sm">Total Expense</h2>
          <p className="text-2xl font-semibold text-red-600">$8,960</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-5">
          <h2 className="text-gray-600 text-sm">Balance</h2>
          <p className="text-2xl font-semibold text-blue-600">$3,490</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg shadow">
          + Add Income
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg shadow">
          + Add Expense
        </button>
        <button className="bg-gray-800 hover:bg-black text-white py-3 rounded-lg shadow">
          View Transactions
        </button>
        <button className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow">
          Generate Report
        </button>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Recent Transactions
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-700">Salary</span>
            <span className="text-green-600 font-semibold">+ $2,500</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-700">Groceries</span>
            <span className="text-red-600 font-semibold">- $120</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-700">Electricity Bill</span>
            <span className="text-red-600 font-semibold">- $80</span>
          </div>
        </div>
      </div>
    </div>
  );
}
