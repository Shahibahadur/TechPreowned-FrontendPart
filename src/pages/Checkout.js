import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const Checkout = () => {
    const { cart, cartTotal } = useCart();
    const [esewaParams, setEsewaParams] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (cartTotal > 0) {
            const initiatePayment = async () => {
                try {
                    const response = await axios.post('http://localhost:8080/api/payment/esewa/initiate', {
                        amount: cartTotal
                    });
                    setEsewaParams(response.data);
                } catch (err) {
                    setError('Failed to initiate payment. Please try again.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            initiatePayment();
        } else {
            setLoading(false);
        }
    }, [cartTotal]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
    };

    if (loading) {
        return <div className="text-center py-10">Preparing your order for checkout...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }
    
    if (cart.length === 0) {
        return <div className="text-center py-10">Your cart is empty.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Review Your Order</h1>
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between items-center border-b py-2">
                                <span>{item.name} x {item.quantity}</span>
                                <span>{formatPrice(item.price * item.quantity)}</span>
                            </div>
                        ))}
                        <div className="flex justify-between font-bold text-lg mt-4">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                    </div>

                    {/* Payment */}
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Payment</h2>
                        <p className="text-gray-600 mb-6">
                            You will be redirected to eSewa to complete your payment securely.
                        </p>
                        {esewaParams ? (
                            <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
                                {Object.keys(esewaParams).map(key => (
                                    <input type="hidden" key={key} name={key} value={esewaParams[key]} />
                                ))}
                                <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors">
                                    Pay with eSewa
                                </button>
                            </form>
                        ) : (
                            <p>Could not load eSewa payment options.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout; 