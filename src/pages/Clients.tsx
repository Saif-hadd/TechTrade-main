import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import AddClientModal from '../components/AddClientModal';
import EditClientModal from '../components/EditClientModal';

interface Client {
  clientId: number;
  name: string;
  emailAddress: string;
  telephone: string;
}

const Clients = () => {
  const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
  const [isEditClientModalOpen, setIsEditClientModalOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clientToEdit, setClientToEdit] = useState<Client | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/client');
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const data: Client[] = await response.json();
        setClients(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleAddClient = async (client: { name: string; emailAddress: string; telephone: string }) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/client', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
      });

      if (!response.ok) {
        throw new Error('Failed to add client');
      }

      const newClient = await response.json();
      setClients((prevClients) => [...prevClients, newClient]);
      setValidationMessage('Client added successfully!'); // Show validation message
    } catch (error) {
      console.error('Error adding client:', error);
    } finally {
      setLoading(false);
      setIsAddClientModalOpen(false);
    }
  };

  const handleEditClient = async (client: Client) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/client/${client.clientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
      });

      if (!response.ok) {
        throw new Error('Failed to update client');
      }

      const updatedClient = await response.json();
      setClients((prevClients) =>
        prevClients.map((c) => (c.clientId === updatedClient.clientId ? updatedClient : c))
      );
    } catch (error) {
      console.error('Error updating client:', error);
    } finally {
      setLoading(false);
      setIsEditClientModalOpen(false);
    }
  };

  const handleDelete = (clientId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this client?');
    if (confirmDelete) {
      setClients((prevClients) => prevClients.filter((client) => client.clientId !== clientId));
    }
  };

  const columns = [
    { key: 'name', header: 'Client Name' },
    { key: 'emailAddress', header: 'Email Address' },
    { key: 'telephone', header: 'Telephone' },
  ];

  if (loading) return <div className="p-6">Loading clients...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="p-6">
      <PageHeader title="Clients" subtitle="Manage your client relationships" icon={Users} />
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddClientModalOpen(true)}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
        >
          Add Client
        </button>
      </div>
      
      {/* Validation Message after adding client */}
      {validationMessage && (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
          {validationMessage}
        </div>
      )}

      <DataTable
        columns={columns}
        data={clients}
        onEdit={(client) => {
          setClientToEdit(client);
          setIsEditClientModalOpen(true);
        }}
        onDelete={(clientId) => handleDelete(clientId)}
      />
      <AddClientModal
        isOpen={isAddClientModalOpen}
        onClose={() => setIsAddClientModalOpen(false)}
        onAddClient={handleAddClient}
      />
      <EditClientModal
        isOpen={isEditClientModalOpen}
        onClose={() => setIsEditClientModalOpen(false)}
        onEditClient={handleEditClient}
        clientToEdit={clientToEdit}
      />
    </div>
  );
};

export default Clients;
