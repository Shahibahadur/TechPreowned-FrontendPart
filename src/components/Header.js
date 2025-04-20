import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <Link to="/" className="text-2xl font-bold">Tech<span className="text-blue-400">Preowned</span></Link>
        </div>
        
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/products" className="hover:text-blue-400 transition">Products</Link>
          <Link to="/about" className="hover:text-blue-400 transition">About Us</Link>
          <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;