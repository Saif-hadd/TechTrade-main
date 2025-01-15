import React from 'react';
import { FileText } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';

const Invoices = () => {
  const columns = [
    { key: 'number', header: 'Invoice #', width: '120px' },
    { key: 'client', header: 'Client' },
    { key: 'date', header: 'Date', width: '120px' },
    { key: 'dueDate', header: 'Due Date', width: '120px' },
    { key: 'amount', header: 'Amount', width: '120px' },
    { key: 'status', header: 'Status', width: '120px' },
  ];

  const data = [
    {
      number: 'INV-2024-001',
      client: 'Tech Solutions Inc',
      date: '2024-03-01',
      dueDate: '2024-03-31',
      amount: '$12,350',
      status: <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>,
    },
    // Add more sample data as needed
  ];

  return (
    <div className="p-6">
      <PageHeader 
        title="Invoices" 
        subtitle="Manage your billing"
        icon={FileText}
      />
      <DataTable 
        columns={columns} 
        data={data}
        onEdit={(invoice) => console.log('Edit invoice:', invoice)}
        onDelete={(invoice) => console.log('Delete invoice:', invoice)}
      />
    </div>
  );
};

export default Invoices;