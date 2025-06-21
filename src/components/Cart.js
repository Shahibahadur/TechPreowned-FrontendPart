import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between items-center py-2">
                <div>
                  <span className="font-medium">{item.name}</span> x {item.quantity}
                </div>
                <div className="flex items-center gap-2">
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    className="text-red-500 hover:underline ml-2"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart; 