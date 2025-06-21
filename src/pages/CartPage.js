import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const getProductImageUrl = (product) => {
    if (!product.imageUrl) return "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
    if (product.imageUrl.startsWith('http')) return product.imageUrl;
    return `http://localhost:8080/api/images/${product.category.toLowerCase()}/${product.imageUrl}`;
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 mb-4">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold">Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-4">
                        <div className="flex items-center">
                          <img className="h-16 w-16 mr-4 rounded object-cover" src={getProductImageUrl(item)} alt={item.name} />
                          <span className="font-semibold">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4">{formatPrice(item.price)}</td>
                      <td className="py-4">
                        <div className="flex items-center">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="border rounded-md py-1 px-3">-</button>
                          <span className="text-center w-8">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="border rounded-md py-1 px-3">+</button>
                        </div>
                      </td>
                      <td className="py-4">{formatPrice(item.price * item.quantity)}</td>
                      <td className="py-4">
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-right mt-4">
                <button onClick={clearCart} className="text-sm text-red-500 hover:underline">
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <button 
                onClick={handleCheckout} 
                className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-6 w-full hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CartPage; 