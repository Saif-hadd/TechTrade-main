import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Modal from './Modal';
import { FormField, FormActions } from './Form';

interface Client {
  clientId: number;
  name: string;
  emailAddress: string;
  telephone: string;
}

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditClient: (client: Client) => Promise<void>;
  clientToEdit: Client | null;
}

const EditClientModal: React.FC<EditClientModalProps> = ({ isOpen, onClose, onEditClient, clientToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
    telephone: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clientToEdit) {
      setFormData({
        name: clientToEdit.name,
        emailAddress: clientToEdit.emailAddress,
        telephone: clientToEdit.telephone,
      });
    }
  }, [clientToEdit]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (clientToEdit) {
      const clientData: Client = { ...clientToEdit, ...formData };
      try {
        await onEditClient(clientData);
        onClose();
      } catch (error) {
        console.error('Failed to edit client:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Client">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormField
            label="Client Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Email Address"
            name="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Telephone"
            name="telephone"
            type="tel"
            value={formData.telephone}
            onChange={handleInputChange}
            required
          />
        </div>
        <FormActions onCancel={onClose} isSubmitting={loading} />
      </form>
    </Modal>
  );
};

export default EditClientModal;
