import React from 'react';
import { Link } from 'react-router-dom';

const EsewaFailure = () => {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
                <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Failed</h1>
                <p className="text-gray-600 mb-6">
                    Unfortunately, your payment could not be processed. This could be due to cancellation or another issue.
                </p>
                <p className="text-gray-600 mb-6">
                    Please try again or contact support if the problem persists.
                </p>
                <Link to="/cart" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
                    Return to Cart
                </Link>
            </div>
        </div>
    );
};

export default EsewaFailure; 