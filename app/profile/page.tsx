// app/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/config';
import Link from 'next/link';

interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  photoURL?: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchUserProfile();
  }, [user, router]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      
      if (!user?.uid) {
        console.error('No user UID found');
        return;
      }

      // Fetch additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'e-users', user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const profileData: UserProfile = {
          uid: user.uid,
          displayName: userData.displayName || user.displayName || '',
          email: userData.email || user.email || '',
          phoneNumber: userData.phoneNumber || user.phoneNumber || '',
          address: userData.address || '',
          photoURL: userData.photoURL || user.photoURL || '',
          createdAt: userData.createdAt || new Date().toISOString(),
        };
        
        setProfile(profileData);
        setFormData({
          displayName: profileData.displayName,
          email: profileData.email,
          phoneNumber: profileData.phoneNumber || '',
          address: profileData.address || '',
        });
      } else {
        // If no user document exists, create basic profile from auth data
        const basicProfile: UserProfile = {
          uid: user.uid,
          displayName: user.displayName || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          address: '',
          photoURL: user.photoURL || '',
          createdAt: new Date().toISOString(),
        };
        
        setProfile(basicProfile);
        setFormData({
          displayName: basicProfile.displayName,
          email: basicProfile.email,
          phoneNumber: basicProfile.phoneNumber || '',
          address: basicProfile.address || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user?.uid) {
        alert('No user found');
        return;
      }

      // Update in Firestore
      await updateDoc(doc(db, 'users', user.uid), {
        displayName: formData.displayName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        updatedAt: new Date().toISOString(),
      });

      // Refresh profile data
      await fetchUserProfile();
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Failed to load profile</p>
          <button
            onClick={fetchUserProfile}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
              <p className="text-gray-600 mt-1">Manage your account information</p>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to Home
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="displayName"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
                        disabled
                        title="Email cannot be changed"
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Full Name</label>
                      <p className="mt-1 text-sm text-gray-900">{profile.displayName || 'Not set'}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-500">Email Address</label>
                      <p className="mt-1 text-sm text-gray-900">{profile.email}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                    <p className="mt-1 text-sm text-gray-900">{profile.phoneNumber || 'Not set'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Address</label>
                    <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{profile.address || 'Not set'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">User ID</label>
                    <p className="mt-1 text-sm text-gray-900 font-mono">{profile.uid}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500">Member Since</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(profile.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Photo */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h3>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  {profile.photoURL ? (
                    <img 
                      src={profile.photoURL} 
                      alt="Profile" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl text-gray-600">
                      {profile.displayName ? profile.displayName.charAt(0).toUpperCase() : 'U'}
                    </span>
                  )}
                </div>
                <div>
                  <button className="text-sm text-blue-600 hover:text-blue-700">
                    Change Photo
                  </button>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-700">Active</span>
              </div>
              <div className="mt-2">
                <span className="text-sm text-gray-500">Email verified: </span>
                <span className="text-sm text-green-600">Yes</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Change Password
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Privacy Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors">
                  Download Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}