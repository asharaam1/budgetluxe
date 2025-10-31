// app/admin/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/config';
import Link from 'next/link';
import { useAdmin } from '../../hooks/useAdmin';
import { 
  FiShoppingBag, 
  FiUsers, 
  FiDollarSign, 
  FiPackage,
  FiPlus,
  FiArrowRight,
  FiTrendingUp,
  FiAlertCircle
} from 'react-icons/fi';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [recentProducts, setRecentProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAdmin();

  // Only fetch data if user is admin
  useEffect(() => {
    if (isAdmin) {
      fetchDashboardData();
    }
  }, [isAdmin]);

  const fetchDashboardData = async () => {
    try {
      // Products count and recent products
      const productsQuery = query(
        collection(db, 'products'), 
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const productsSnapshot = await getDocs(productsQuery);
      const productsData = productsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Users count
      const usersSnapshot = await getDocs(collection(db, 'users'));

      setStats({
        totalProducts: productsSnapshot.size,
        totalOrders: 0, // You'll add orders later
        totalUsers: usersSnapshot.size,
        totalRevenue: 0
      });
      
      setRecentProducts(productsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'Add New Product',
      description: 'Create a new product listing',
      icon: <FiPlus className="w-6 h-6" />,
      href: '/admin/products/new',
      color: 'bg-green-500'
    },
    {
      title: 'Manage Products',
      description: 'View and edit all products',
      icon: <FiPackage className="w-6 h-6" />,
      href: '/admin/products',
      color: 'bg-blue-500'
    },
    {
      title: 'View Orders',
      description: 'See all customer orders',
      icon: <FiShoppingBag className="w-6 h-6" />,
      href: '/admin/orders',
      color: 'bg-purple-500'
    },
    {
      title: 'Manage Users',
      description: 'View customer accounts',
      icon: <FiUsers className="w-6 h-6" />,
      href: '/admin/users',
      color: 'bg-orange-500'
    }
  ];

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your BUDGET LUXE admin panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <FiPackage className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <FiShoppingBag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <FiUsers className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <FiDollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {quickActions.map((action, index) => (
          <Link
            key={action.title}
            href={action.href}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow border border-gray-200 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${action.color} p-3 rounded-lg text-white`}>
                {action.icon}
              </div>
              <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {action.title}
            </h3>
            <p className="text-gray-600 text-sm">{action.description}</p>
          </Link>
        ))}
      </div>

      {/* Recent Products */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Products</h2>
          <Link 
            href="/admin/products"
            className="text-[#C8A46F] hover:text-yellow-600 font-medium flex items-center gap-2"
          >
            View All
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {recentProducts.length > 0 ? (
          <div className="space-y-4">
            {recentProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img 
                    src={product.images?.[0] || '/placeholder-product.jpg'} 
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">₹{product.price} • {product.category}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  product.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {product.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <FiAlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No products yet</p>
            <Link 
              href="/admin/products/new"
              className="bg-[#C8A46F] hover:bg-yellow-600 text-white px-6 py-2 rounded-lg transition-colors inline-flex items-center gap-2"
            >
              <FiPlus className="w-4 h-4" />
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}