import React from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const products = [
    {
      id: 1,
      name: 'MacBook Pro 2020',
      condition: 'Refurbished',
      rating: 4.8,
      reviews: 124,
      price: '120,000',
      originalPrice: '180,000',
      warranty: '1 Year',
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Dell XPS 15',
      condition: 'Used - Like New',
      rating: 4.5,
      reviews: 89,
      price: '95,000',
      originalPrice: '150,000',
      warranty: '6 Months',
      image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'HP Spectre x360',
      condition: 'Refurbished',
      rating: 4.7,
      reviews: 67,
      price: '85,000',
      originalPrice: '130,000',
      warranty: '1 Year',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f1725e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      name: 'Lenovo ThinkPad X1',
      condition: 'Used - Good',
      rating: 4.3,
      reviews: 42,
      price: '75,000',
      originalPrice: '110,000',
      warranty: '3 Months',
      image: 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quality checked and professionally refurbished laptops with warranty
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;