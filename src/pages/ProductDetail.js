import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddToCartButton from '../components/AddToCartButton';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError('Failed to fetch product details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const getProductImageUrl = (imageUrl) => {
        if (!imageUrl) return "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
        if (imageUrl.startsWith('http')) return imageUrl;
        if (product && product.category) {
            return `http://localhost:8080/api/images/${product.category.toLowerCase()}/${imageUrl}`;
        }
        return "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(price);
    };

    if (loading) {
        return <div className="text-center py-10">Loading product...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    if (!product) {
        return <div className="text-center py-10">Product not found.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Product Image */}
                    <div>
                        <img
                            src={getProductImageUrl(product.imageUrl)}
                            alt={product.name}
                            className="w-full h-auto object-cover rounded-lg shadow-md"
                        />
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                        <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
                        
                        <div className="mb-4">
                            <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-lg text-gray-500 line-through ml-3">{formatPrice(product.originalPrice)}</span>
                            )}
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-700">{product.description}</p>
                        </div>
                        
                        <div className="w-full md:w-1/2">
                            <AddToCartButton product={product} />
                        </div>

                        <div className="mt-6 border-t pt-4 text-sm text-gray-600">
                            <p><strong>Category:</strong> {product.category}</p>
                            <p><strong>Condition:</strong> {product.productCondition || product.condition}</p>
                            <p><strong>Warranty:</strong> {product.warranty || 'N/A'}</p>
                            <p><strong>Rating:</strong> {product.rating?.toFixed(1) || '0.0'} ({product.reviews || 0} reviews)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail; 