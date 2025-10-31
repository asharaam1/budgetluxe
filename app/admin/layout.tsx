// app/admin/layout.tsx
'use client';
import { useAdmin } from '../../hooks/useAdmin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push('/');
    }
  }, [isAdmin, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8A46F] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p>You don't have permission to access the admin panel.</p>
          </div>
          <button 
            onClick={() => router.push('/')}
            className="bg-[#C8A46F] hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Super Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => router.push('/')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                View Store
              </button>
              <button 
                onClick={() => router.push('/auth/login')}
                className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {children}
    </div>
  );
}