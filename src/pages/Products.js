import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';

const Products = () => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('featured');

  const allProducts = [
    {
      id: 1,
      name: 'MacBook Pro 2020',
      brand: 'Apple',
      condition: 'Refurbished',
      rating: 4.8,
      reviews: 124,
      price: '120,000',
      originalPrice: '180,000',
      warranty: '1 Year',
      category: 'premium',
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      name: 'Dell XPS 15',
      brand: 'Dell',
      condition: 'Used - Like New',
      rating: 4.5,
      reviews: 89,
      price: '95,000',
      originalPrice: '150,000',
      warranty: '6 Months',
      category: 'premium',
      image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      name: 'HP Spectre x360',
      brand: 'HP',
      condition: 'Refurbished',
      rating: 4.7,
      reviews: 67,
      price: '85,000',
      originalPrice: '130,000',
      warranty: '1 Year',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f1725e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      name: 'Lenovo ThinkPad X1',
      brand: 'Lenovo',
      condition: 'Used - Good',
      rating: 4.3,
      reviews: 42,
      price: '75,000',
      originalPrice: '110,000',
      warranty: '3 Months',
      category: 'business',
      image: 'https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      name: 'Asus ROG Zephyrus',
      brand: 'Asus',
      condition: 'Refurbished',
      rating: 4.6,
      reviews: 56,
      price: '140,000',
      originalPrice: '200,000',
      warranty: '1 Year',
      category: 'gaming',
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      name: 'Acer Aspire 5',
      brand: 'Acer',
      condition: 'Used - Fair',
      rating: 4.0,
      reviews: 38,
      price: '55,000',
      originalPrice: '85,000',
      warranty: '3 Months',
      category: 'budget',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredProducts = filter === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === filter);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price-low') return parseInt(a.price.replace(/,/g, '')) - parseInt(b.price.replace(/,/g, ''));
    if (sort === 'price-high') return parseInt(b.price.replace(/,/g, '')) - parseInt(a.price.replace(/,/g, ''));
    if (sort === 'rating') return b.rating - a.rating;
    return a.id - b.id; // default sort by featured (original order)
  });

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('premium')}
              className={`px-4 py-2 rounded-full ${filter === 'premium' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Premium
            </button>
            <button 
              onClick={() => setFilter('business')}
              className={`px-4 py-2 rounded-full ${filter === 'business' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Business
            </button>
            <button 
              onClick={() => setFilter('gaming')}
              className={`px-4 py-2 rounded-full ${filter === 'gaming' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Gaming
            </button>
            <button 
              onClick={() => setFilter('budget')}
              className={`px-4 py-2 rounded-full ${filter === 'budget' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              Budget
            </button>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
            <select 
              id="sort" 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="flex justify-center mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;