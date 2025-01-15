import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import { toast } from 'react-hot-toast';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import ConfirmDialog from '../components/ConfirmDialog';
import { FormField, FormActions } from '../components/Form';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: string;
  sales: string;
  status: JSX.Element;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });

  const columns = [
    { key: 'name', header: 'Product Name' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price', width: '120px' },
    { key: 'stock', header: 'Stock', width: '100px' },
    { key: 'sales', header: 'Sales', width: '100px' },
    { key: 'status', header: 'Status', width: '120px' },
  ];

  // Fonction pour récupérer les produits depuis l'API
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/produits', {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const fetchedData = data.map((item: any) => ({
        id: item.id.toString(),
        name: item.name,
        category: item.categorieName || 'N/A',
        price: `$${item.price}`,
        stock: item.quantite.toString(),
        sales: 'N/A',
        status: (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Available
          </span>
        ),
      }));

      setProducts(fetchedData);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products!');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simuler l'ajout ou la modification du produit
    if (selectedProduct) {
      toast.success('Product updated successfully!');
    } else {
      toast.success('Product added successfully!');
    }
    handleCloseModal();
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.replace('$', ''),
      stock: product.stock,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedProduct) {
      // Appel API DELETE pour supprimer le produit
      toast.success('Product deleted successfully!');
      setIsDeleteDialogOpen(false);
      // Simuler la suppression pour l'exemple
      setProducts(products.filter((product) => product.id !== selectedProduct.id));
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
    });
  };

  const ProductForm = () => (
    <form onSubmit={handleSubmit}>
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
      <FormActions onCancel={handleCloseModal} />
    </form>
  );

  return (
    <div className="p-6">
      <PageHeader 
        title="Products" 
        subtitle="Manage your product catalog"
        icon={Package}
        onAdd={() => setIsAddModalOpen(true)}
      />
      <DataTable 
        columns={columns} 
        data={products}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={handleCloseModal}
        title={selectedProduct ? 'Edit Product' : 'Add Product'}
      >
        <ProductForm />
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
      />
    </div>
  );
};

export default Products;
