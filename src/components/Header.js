import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Function to get profile image URL
  const getProfileImageUrl = (profilePicture) => {
    if (!profilePicture) return null;
    
    // If it's already a full URL, return as is
    if (profilePicture.startsWith('http')) {
      return profilePicture;
    }
    
    // If it's a relative path, construct the full URL
    if (profilePicture.startsWith('/api/')) {
      return `http://localhost:8080${profilePicture}`;
    }
    
    // Default fallback - construct full URL from image name
    return `http://localhost:8080/api/auth/profile-picture/${profilePicture}`;
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
          <Link to="/cart" className="p-2 rounded-full hover:bg-gray-700 transition">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>
          {isAuthenticated && user ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={toggleDropdown}
                className="flex items-center space-x-2 hover:bg-gray-700 rounded-full p-1 transition"
              >
                {/* Profile Image */}
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-600 flex items-center justify-center">
                  {user.profilePicture ? (
                    <img
                      src={getProfileImageUrl(user.profilePicture)}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-full flex items-center justify-center text-white text-sm font-semibold ${user.profilePicture ? 'hidden' : ''}`}>
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </div>
                <span className="hidden md:block">{user.name}</span>
                <svg className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Profile</span>
                    </div>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm"
                  >
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Sign Out</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;