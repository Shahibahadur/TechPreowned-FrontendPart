import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <div className="text-xl font-bold">
                <a href="/">Logo</a>
            </div>
            <ul className="flex space-x-4">
                <li><a href="/" className="hover:text-gray-400">Home</a></li>
                <li><a href="/products" className="hover:text-gray-400">Products</a></li>
                <li><a href="/login" className="hover:text-gray-400">Login</a></li>
                <li><a href="/signin" className="hover:text-gray-400">Sign In</a></li>
            </ul>
            <div className="flex items-center space-x-2">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="px-2 py-1 rounded-md text-black"
                />
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md">
                    Search
                </button>
            </div>
        </nav>
    );
};

export default Navbar;