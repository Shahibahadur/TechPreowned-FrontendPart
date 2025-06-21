import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const getProductImageUrl = (product) => {
    if (!product || !product.imageUrl) {
      return ''; // or a placeholder image
    }
    // Assuming product.category is like "Business", "Gaming", etc.
    const categoryPath = product.category.toLowerCase();
    return `http://localhost:8080/api/images/${categoryPath}/${product.imageUrl}`;
  };

  const handleCategoryClick = (categoryName) => {
    if (isAuthenticated) {
      navigate(`/products?category=${categoryName}`);
    } else {
      navigate('/login');
    }
  };

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        const products = response.data;
        
        // Group products by their category
        const productsByCategory = products.reduce((acc, product) => {
          const category = product.category || 'Uncategorized';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});

        // Define the order we want to display categories in
        const predefinedOrder = ['Business', 'Gaming', 'Ultrabooks', 'Budget'];

        const categoryData = predefinedOrder
          .map(name => {
            const categoryProducts = productsByCategory[name] || [];
            if (categoryProducts.length === 0) {
              return null; // Skip categories with no products
            }
            
            // Pick a random product from the category to display its image
            const randomProduct = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
            
            return {
              name: name,
              count: categoryProducts.length,
              image: getProductImageUrl(randomProduct),
            };
          })
          .filter(Boolean); // Filter out any null entries

        setCategories(categoryData);
      } catch (err) {
        console.error("Error fetching products for categories:", err);
        setError('Failed to load category data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-3 text-gray-600">Loading Categories...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect laptop for your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              onKeyPress={(e) => e.key === 'Enter' && handleCategoryClick(category.name)}
              className="relative rounded-lg overflow-hidden group block shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              role="button"
              tabIndex="0"
            >
              <div className="h-56 w-full">
                {category.image ? (
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition duration-500 ease-in-out group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-white text-2xl font-bold">{category.name} Laptops</h3>
                <p className="text-white mt-2 bg-black bg-opacity-40 px-3 py-1 rounded-full text-sm font-medium">{category.count} products</p>
              </div>
              <div className="absolute inset-0 border-4 border-transparent group-hover:border-blue-500 rounded-lg transition-all duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;