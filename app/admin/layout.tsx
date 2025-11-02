// app/admin/layout.tsx - Simple version (no redirect)
"use client";
import { useAdmin } from "@/hooks/useAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAdmin, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8A46F] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking admin permissions...</p>
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
          <p className="text-sm text-gray-600 mb-4">
            Your role is being checked. If you believe this is an error, please
            contact the administrator.
          </p>
        </div>
      </div>
    );
  }

  // Render admin panel
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Admin Access ✅
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                View Store
              </button>
            </div>
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
