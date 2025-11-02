// app/admin/products/[id]/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/config';
import { Product } from '@/types';
import { FiSave, FiArrowLeft, FiTrash2 } from 'react-icons/fi';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    category: 'men',
    brand: '',
    condition: 'new',
    status: 'active',
    sizes: {
      S: '',
      M: '', 
      L: '',
      XL: '',
      XXL: ''
    }
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const productDoc = await getDoc(doc(db, 'products', productId));
      
      if (productDoc.exists()) {
        const productData = productDoc.data() as Product;
        
        setFormData({
          name: productData.name || '',
          description: productData.description || '',
          price: productData.price.toString() || '',
          originalPrice: productData.originalPrice?.toString() || '',
          category: productData.category || 'men',
          brand: productData.brand || '',
          condition: productData.condition || 'new',
          status: productData.status || 'active',
          sizes: {
            S: productData.sizes?.S?.toString() || '',
            M: productData.sizes?.M?.toString() || '',
            L: productData.sizes?.L?.toString() || '',
            XL: productData.sizes?.XL?.toString() || '',
            XXL: productData.sizes?.XXL?.toString() || ''
          }
        });
      } else {
        alert('Product not found!');
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Error loading product details.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeChange = (size: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Convert sizes to numbers and filter out empty values
      const sizes: any = {};
      Object.entries(formData.sizes).forEach(([size, quantity]) => {
        if (quantity && !isNaN(Number(quantity))) {
          sizes[size] = Number(quantity);
        }
      });

      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: formData.originalPrice ? Number(formData.originalPrice) : null,
        category: formData.category,
        brand: formData.brand,
        condition: formData.condition,
        status: formData.status,
        sizes: sizes,
        updatedAt: new Date()
      };

      await updateDoc(doc(db, 'products', productId), productData);
      
      alert('Product updated successfully!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error updating product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        await updateDoc(doc(db, 'products', productId), {
          status: 'inactive'
        });
        
        alert('Product deleted successfully!');
        router.push('/admin/products');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="space-y-6">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
            <p className="text-gray-600">Update product information</p>
          </div>
        </div>
        
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors"
        >
          <FiTrash2 className="w-4 h-4" />
          Delete Product
        </button>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A46F] focus:border-transparent"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <input
                  type="text"
                  name="brand"
                  required
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A46F] focus:border-transparent"
                  placeholder="Enter brand name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A46F] focus:border-transparent"
                >
                  <option value="men">Men's Fashion</option>
                  <option value="women">Women's Wear</option>
                  <option value="kids">Kids Collection</option>
                  <option value="used">Used Clothes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  name="condition"
                  required
                  value={formData.condition}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A46F] focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="used-good">Used - Good</option>
                  <option value="used-fair">Used - Fair</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A46F] focus:border-transparent"
                placeholder="Enter product description"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selling Price (Rs.) *
                </label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A46F] focus:border-transparent"
                  placeholder="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (Rs.)
                </label>
                <input
                  type="number"
                  name="originalPrice"
                  min="0"
                  value={formData.originalPrice}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A46F] focus:border-transparent"
                  placeholder="0"
                />
                <p className="text-sm text-gray-500 mt-1">Leave empty if no discount</p>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Inventory</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <div key={size}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size {size}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.sizes[size as keyof typeof formData.sizes]}
                    onChange={(e) => handleSizeChange(size, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A46F] focus:border-transparent"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Status</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Status
              </label>
              <select
                name="status"
                required
                value={formData.status}
                onChange={handleChange}
                className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C8A46F] focus:border-transparent"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#C8A46F] hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <FiSave className="w-5 h-5" />
              {saving ? 'Updating Product...' : 'Update Product'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/admin/products')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}