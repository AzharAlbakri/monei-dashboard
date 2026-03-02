import React from "react";
import { kpiData } from "../mockData";

const Dashboard: React.FC = () => {
  const { totalPayments, totalAmount, averageAmount } = kpiData;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Payments */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Payments</h2>
          <p className="text-2xl font-bold">{totalPayments}</p>
        </div>

        {/* Total Amount */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Total Amount</h2>
          <p className="text-2xl font-bold">${totalAmount}</p>
        </div>

        {/* Average Amount */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Average Amount</h2>
          <p className="text-2xl font-bold">${averageAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
