import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Modal from './Modal';
import { FormField, FormActions } from './Form';

interface Client {
  clientId: number;
  name: string;
  emailAddress: string;
  telephone: string;
}

interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddClient: (client: Client) => Promise<void>;
}

const AddClientModal: React.FC<AddClientModalProps> = ({ isOpen, onClose, onAddClient }) => {
  const [formData, setFormData] = useState({
    name: '',
    emailAddress: '',
    telephone: '',
  });

  const [loading, setLoading] = useState(false);

  // Réinitialiser le formulaire à chaque fois que la modal s'ouvre
  useEffect(() => {
    setFormData({
      name: '',
      emailAddress: '',
      telephone: '',
    });
  }, [isOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const clientData: Client = { clientId: 0, ...formData };  // Client sans ID pour l'ajout

    try {
      await onAddClient(clientData);  // Appeler la fonction d'ajout
      onClose();  // Fermer la modal après ajout
    } catch (error) {
      console.error('Failed to add client:', error);
    } finally {
      setLoading(false);  // Réinitialiser l'état de chargement
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Client">
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
          />
        </div>
        <FormActions onCancel={onClose} isSubmitting={loading} />
      </form>
    </Modal>
  );
};

export default AddClientModal;
