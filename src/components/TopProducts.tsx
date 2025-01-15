import React from 'react';
import { Package } from 'lucide-react';

const TopProducts = () => {
  const products = [
    { name: 'Enterprise Server License', sales: 145, revenue: '$29,000', growth: 12.5 },
    { name: 'Cloud Storage Premium', sales: 89, revenue: '$17,800', growth: 8.3 },
    { name: 'Security Suite Pro', sales: 76, revenue: '$15,200', growth: 15.7 },
    { name: 'Network Management Tool', sales: 65, revenue: '$13,000', growth: -2.1 },
    { name: 'Database Solution', sales: 54, revenue: '$10,800', growth: 5.9 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Top Products</h2>
        <button className="text-blue-600 text-sm hover:text-blue-700">View All</button>
      </div>
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">{product.sales} sales</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold">{product.revenue}</p>
              <p className={`text-sm ${product.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.growth >= 0 ? '+' : ''}{product.growth}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;