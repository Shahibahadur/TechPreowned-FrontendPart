import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

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

    useEffect(() => {
        if (user?.profilePicture) {
            setProfileImage(getProfileImageUrl(user.profilePicture));
        }
    }, [user]);

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-6 mb-6">
                    <div className="relative">
                        {profileImage ? (
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}
                        <div className={`w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-blue-500 ${profileImage ? 'hidden' : ''}`}>
                            <span className="text-4xl text-gray-500">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                        {user?.profilePicture && (
                            <p className="text-sm text-gray-500 mt-1">
                                Profile Picture: {user.profilePicture}
                            </p>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Contact Information</h3>
                            <p className="text-gray-600">Phone: {user?.phone || 'Not provided'}</p>
                            <p className="text-gray-600">Address: {user?.address || 'Not provided'}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">Account Information</h3>
                            <p className="text-gray-600">Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                            <p className="text-gray-600">User ID: {user?.id || 'N/A'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile; 