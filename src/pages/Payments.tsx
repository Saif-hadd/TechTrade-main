import React from 'react';
import { CreditCard } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';

const Payments = () => {
  const columns = [
    { key: 'transactionId', header: 'Transaction ID', width: '150px' },
    { key: 'client', header: 'Client' },
    { key: 'date', header: 'Date', width: '120px' },
    { key: 'method', header: 'Method', width: '120px' },
    { key: 'amount', header: 'Amount', width: '120px' },
    { key: 'status', header: 'Status', width: '120px' },
  ];

  const data = [
    {
      transactionId: 'TRX-2024-001',
      client: 'Tech Solutions Inc',
      date: '2024-03-01',
      method: 'Credit Card',
      amount: '$12,350',
      status: <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Completed</span>,
    },
    // Add more sample data as needed
  ];

  return (
    <div className="p-6">
      <PageHeader 
        title="Payments" 
        subtitle="Track your revenue"
        icon={CreditCard}
      />
      <DataTable 
        columns={columns} 
        data={data}
        onEdit={(payment) => console.log('Edit payment:', payment)}
        onDelete={(payment) => console.log('Delete payment:', payment)}
      />
    </div>
  );
};

export default Payments;