import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const AddToCartButton = ({ product }) => {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart(product);
        toast.success(`${product.name} added to cart!`);

        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 2000); // Reset after 2 seconds
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`w-full px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-300 ${
                isAdded
                    ? 'bg-green-500 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
            {isAdded ? 'Added ✓' : 'Add to Cart'}
        </button>
    );
};

export default AddToCartButton; 