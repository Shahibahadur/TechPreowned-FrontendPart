import React from 'react';

const Categories = () => {
  const categories = [
    {
      name: 'Business Laptops',
      count: 42,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Gaming Laptops',
      count: 28,
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Ultrabooks',
      count: 35,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      name: 'Budget Laptops',
      count: 56,
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect laptop for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden group">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-48 object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
                <h3 className="text-white text-xl font-bold">{category.name}</h3>
                <p className="text-white">{category.count} products</p>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 transition duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;