import React from 'react';

const RevenueChart = () => {
  // This is a placeholder for the chart
  // In a real application, you'd use a charting library like Chart.js or Recharts
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Revenue Overview</h2>
          <p className="text-sm text-gray-500">Monthly revenue performance</p>
        </div>
        <select className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm">
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>Last 24 months</option>
        </select>
      </div>
      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">Revenue chart placeholder</p>
      </div>
    </div>
  );
};

export default RevenueChart;