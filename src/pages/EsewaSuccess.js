import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';

const EsewaSuccess = () => {
    const location = useLocation();
    const { clearCart } = useCart();
    const [verificationStatus, setVerificationStatus] = useState('Verifying Payment...');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyPayment = async () => {
            const params = new URLSearchParams(location.search);
            const data = params.get('data');

            if (data) {
                try {
                    const decodedData = JSON.parse(atob(data));
                    
                    if (decodedData.transaction_uuid && decodedData.total_amount) {
                        const response = await axios.get(`http://localhost:8080/api/payment/esewa/verify`, {
                            params: {
                                uuid: decodedData.transaction_uuid,
                                amount: decodedData.total_amount
                            }
                        });

                        if (response.data.status === 'COMPLETE') {
                            setVerificationStatus('Payment Verified & Successful!');
                            clearCart();
                        } else {
                            setVerificationStatus(`Payment Status: ${response.data.status}`);
                            setError('The payment was not completed successfully by the vendor.');
                        }
                    } else {
                        throw new Error('Invalid eSewa response data.');
                    }

                } catch (err) {
                    console.error("Error processing eSewa response:", err);
                    setVerificationStatus('Verification Failed');
                    setError(err.response?.data?.message || 'There was an error processing the payment response.');
                }
            } else {
                setVerificationStatus('Verification Failed');
                setError('No data received from eSewa.');
            }
            setIsLoading(false);
        };

        verifyPayment();
    }, [location, clearCart]);

    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Status</h1>
                {isLoading ? (
                     <p className="text-lg font-semibold mb-4">Verifying Payment...</p>
                ) : (
                    <>
                        <p className="text-lg font-semibold mb-4">{verificationStatus}</p>
                        {error && <p className="text-red-500 mb-6">{error}</p>}
                    </>
                )}
                <Link to="/" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors mt-4 inline-block">
                    Return to Homepage
                </Link>
            </div>
        </div>
    );
};

export default EsewaSuccess; 