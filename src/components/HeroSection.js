import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleShopNow = () => {
    if (isAuthenticated) {
      navigate('/products');
    } else {
      navigate('/login');
    }
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <section className="bg-gray-900 text-white py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Quality Pre-Owned Laptops in Nepal</h1>
          <p className="text-xl text-gray-300 mb-8">
            Get premium refurbished laptops at affordable prices with warranty and free delivery across Nepal.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={handleShopNow}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium transition"
            >
              Shop Now
            </button>
            <button 
              onClick={handleLearnMore}
              className="border-2 border-white hover:bg-gray-800 px-6 py-3 rounded-md text-lg font-medium transition"
            >
              Learn More
            </button>
          </div>
          {!isAuthenticated && (
            <p className="text-sm text-gray-400 mt-4">
              Please login or register to access our products and add items to cart
            </p>
          )}
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
            alt="Premium Laptops" 
            className="rounded-lg shadow-2xl max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;