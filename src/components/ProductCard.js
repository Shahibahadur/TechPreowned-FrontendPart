import React from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';

const ProductCard = ({ product }) => {
  const defaultImage = "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";

  // Function to get product image URL
  const getProductImageUrl = (imageUrl) => {
    if (!imageUrl) return defaultImage;
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it's a relative path starting with /api/, construct the full URL
    if (imageUrl.startsWith('/api/')) {
      return `http://localhost:8080${imageUrl}`;
    }
    
    // If it's just a filename, construct the URL using category
    if (product.category) {
      return `http://localhost:8080/api/images/${product.category.toLowerCase()}/${imageUrl}`;
    }
    
    // Fallback to default image
    return defaultImage;
  };

  // Function to format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Function to get condition badge color
  const getConditionColor = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'fair':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 flex flex-col">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative pb-2/3 h-48">
          <img 
            src={getProductImageUrl(product.imageUrl)}
            alt={product.name} 
            className="absolute h-full w-full object-cover"
            onError={(e) => {
              console.log(`Failed to load image for ${product.name}: ${product.imageUrl}`);
              e.target.src = defaultImage;
            }}
          />
          {/* Condition badge */}
          <div className="absolute top-2 right-2">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${getConditionColor(product.productCondition)}`}>
              {product.productCondition || product.condition || 'Used'}
            </span>
          </div>
          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
      
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="block">
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-blue-600 transition">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
          </div>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            {product.rating?.toFixed(1) || '0.0'} ({product.reviews || 0} reviews)
          </span>
        </div>
        
        {/* Description */}
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-grow">
            {product.description}
          </p>
        )}
        
        {/* Price & Add to Cart */}
        <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <div className="w-1/2">
            <AddToCartButton product={product} />
          </div>
        </div>
        
        {/* Additional Details */}
        <div className="text-sm text-gray-600 space-y-1">
          {product.warranty && (
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {product.warranty}
            </p>
          )}
          {product.brand && (
            <p className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              Brand: {product.brand}
            </p>
          )}
        </div>
        
        {/* View Details Link */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Link 
            to={`/products/${product.id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;