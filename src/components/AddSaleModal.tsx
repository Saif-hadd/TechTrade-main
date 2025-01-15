import React, { useState } from 'react';
import Modal from './Modal';
import { FormField, FormActions } from './Form';

interface AddSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSaleModal: React.FC<AddSaleModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    client: '',
    product: '',
    quantity: '',
    price: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call
    console.log('Sale data:', formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Sale">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormField
            label="Client"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Product"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Price per Unit"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <FormActions onCancel={onClose} />
      </form>
    </Modal>
  );
};

export default AddSaleModal;