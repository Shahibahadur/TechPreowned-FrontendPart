import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-12 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for the latest deals and offers
        </p>
        <div className="max-w-md mx-auto flex">
          <input 
            type="email" 
            placeholder="Your email address" 
            className="flex-grow px-4 py-3 rounded-l-md text-gray-900 focus:outline-none"
          />
          <button className="bg-blue-800 hover:bg-blue-900 px-6 py-3 rounded-r-md font-medium transition">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;