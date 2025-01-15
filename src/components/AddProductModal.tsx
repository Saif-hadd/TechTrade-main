import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import Modal from './Modal';
import { FormField, FormActions } from './Form';

interface Product {
  productId: number;
  name: string;
  category: string;
  price: string;
  stock: string;
}

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product) => Promise<void>;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onClose, onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });

  const [loading, setLoading] = useState(false);

  // Réinitialiser le formulaire à chaque fois que la modal s'ouvre
  useEffect(() => {
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
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

    const productData: Product = { productId: 0, ...formData };  // Produit sans ID pour l'ajout

    try {
      await onAddProduct(productData);  // Appeler la fonction d'ajout
      onClose();  // Fermer la modal après ajout
    } catch (error) {
      console.error('Failed to add product:', error);
    } finally {
      setLoading(false);  // Réinitialiser l'état de chargement
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <FormField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
          <FormField
            label="Stock"
            name="stock"
            type="number"
            value={formData.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        <FormActions onCancel={onClose} isSubmitting={loading} />
      </form>
    </Modal>
  );
};

export default AddProductModal;
