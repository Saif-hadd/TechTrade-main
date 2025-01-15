import React, { useState, useEffect } from 'react';
import { Tags } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import DataTable from '../components/DataTable';

interface Category {
  categorieId: number;
  name: string;
  description: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const columns = [
    { key: 'name', header: 'Category Name' },
    { key: 'products', header: 'Products', width: '100px' },
    { key: 'totalRevenue', header: 'Total Revenue', width: '150px' },
    { key: 'status', header: 'Status', width: '120px' },
  ];

  // Fonction pour récupérer les catégories depuis l'API
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/categorie', {
        method: 'GET',
        headers: {
          'accept': '*/*',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // Mapping des données reçues pour correspondre aux colonnes
      const categoriesData = data.map((item: any) => ({
        name: item.name,
        products: '0', // Remplacer par le nombre de produits si disponible
        totalRevenue: '$0', // Remplacer par le revenu total si disponible
        status: (
          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
            Active
          </span>
        ),
      }));

      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <PageHeader 
        title="Categories" 
        subtitle="Organize your product catalog"
        icon={Tags}
      />
      <DataTable 
        columns={columns} 
        data={categories}
        onEdit={(category) => console.log('Edit category:', category)}
        onDelete={(category) => console.log('Delete category:', category)}
      />
    </div>
  );
};

export default Categories;
