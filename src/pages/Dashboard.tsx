import React, { useState } from 'react';
import { Users, DollarSign, FileText, Package, ShoppingCart, Percent } from 'lucide-react';
import StatCard from '../components/StatCard';
import TopProducts from '../components/TopProducts';
import RevenueChart from '../components/RevenueChart';
import AddSaleModal from '../components/AddSaleModal';
import { exportToCSV } from '../utils/exportData';

const Dashboard = () => {
  const [isAddSaleModalOpen, setIsAddSaleModalOpen] = useState(false);

  const handleExportReport = () => {
    const reportData = [
      {
        date: '2024-03-01',
        revenue: 45230,
        products_sold: 156,
        client: 'Tech Solutions Inc',
      },
      {
        date: '2024-03-02',
        revenue: 32150,
        products_sold: 98,
        client: 'Digital Innovations Ltd',
      },
      // Add more data as needed
    ];

    exportToCSV(reportData, `sales-report-${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Welcome back, Admin</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleExportReport}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Export Report
          </button>
          <button 
            onClick={() => setIsAddSaleModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add Sale
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Revenue"
          value="$124,563.00"
          icon={DollarSign}
          trend={{ value: "12.5%", positive: true }}
        />
        <StatCard
          title="Active Clients"
          value="1,245"
          icon={Users}
          trend={{ value: "3.2%", positive: true }}
        />
        <StatCard
          title="Pending Invoices"
          value="23"
          icon={FileText}
          trend={{ value: "5.1%", positive: false }}
        />
        <StatCard
          title="Products Sold"
          value="845"
          icon={ShoppingCart}
          trend={{ value: "8.9%", positive: true }}
        />
        <StatCard
          title="Available Stock"
          value="1,678"
          icon={Package}
          trend={{ value: "2.3%", positive: true }}
        />
        <StatCard
          title="Conversion Rate"
          value="64.7%"
          icon={Percent}
          trend={{ value: "4.6%", positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>

      <AddSaleModal 
        isOpen={isAddSaleModalOpen}
        onClose={() => setIsAddSaleModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;