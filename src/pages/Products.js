import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/ProductCard';
import { useNavigate, useLocation } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Get category from URL query parameter
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get('category');

  const [filter, setFilter] = useState(categoryFromUrl || 'all');
  const [sort, setSort] = useState('featured');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // If the category from URL changes, update the filter
    const newCategory = queryParams.get('category');
    if (newCategory) {
      setFilter(newCategory);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:8080/api/products');
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by category and search term
  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === 'all' || product.category?.toLowerCase() === filter.toLowerCase();
    const matchesSearch = !searchTerm || 
      product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case 'price-low':
        return Number(a.price) - Number(b.price);
      case 'price-high':
        return Number(b.price) - Number(a.price);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name':
        return (a.name || '').localeCompare(b.name || '');
      case 'brand':
        return (a.brand || '').localeCompare(b.brand || '');
      default:
        return a.id - b.id;
    }
  });

  // Get unique categories for filter buttons
  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading products...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">All Products</h1>
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p className="text-red-600 text-lg">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our collection of quality laptops</p>
          {!isAuthenticated && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800 text-sm">
                <strong>Login Required:</strong> Please login or register to add items to cart and access all features.
              </p>
            </div>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search products, brands, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button 
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full transition ${
                  filter === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
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
                <option value="name">Name</option>
                <option value="brand">Brand</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              {sortedProducts.length} of {products.length} products
            </div>
          </div>
        </div>
        
        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="text-gray-600 text-lg">
              {searchTerm ? `No products found for "${searchTerm}"` : 'No products available'}
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-2 text-blue-600 hover:text-blue-800"
              >
                Clear search
              </button>
            )}
          </div>
        )}
        
        {/* Load More Button */}
        {sortedProducts.length > 0 && (
          <div className="flex justify-center mt-10">
            <button 
              className={`px-6 py-3 rounded-md font-medium transition ${
                isAuthenticated 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
              disabled={!isAuthenticated}
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login');
                }
                // Add load more logic here
              }}
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;