// components/home/UsedClothesSection.tsx
'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../../app/firebase/config';
import { Product } from '../../types';
import UsedProductCard from '../UsedProductCard';
import Link from 'next/link';
import { FiArrowRight, FiShield, FiStar } from 'react-icons/fi';

export default function UsedClothesSection() {
  const [usedProducts, setUsedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsedProducts();
  }, []);

  const fetchUsedProducts = async () => {
    try {
      const productsRef = collection(db, 'products');
      const q = query(
        productsRef, 
        where('category', '==', 'used'),
        where('status', '==', 'active'),
        limit(8)
      );
      
      const querySnapshot = await getDocs(q);
      const productsData: Product[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      
      setUsedProducts(productsData);
    } catch (error) {
      console.error('Error fetching used products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 h-80 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <FiShield className="w-4 h-4" />
            Authentic Used Items
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Used Fashion
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover authentic branded items at unbelievable prices. 
            Every product is quality-checked and verified.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiShield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Authenticity Guaranteed</h3>
            <p className="text-gray-600">Every item is verified for brand authenticity</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiStar className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Quality Checked</h3>
            <p className="text-gray-600">Thorough inspection for condition and quality</p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold text-lg mb-2">Amazing Savings</h3>
            <p className="text-gray-600">Save up to 70% compared to retail prices</p>
          </div>
        </div>

        {/* Products Grid */}
        {usedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {usedProducts.map(product => (
                <UsedProductCard key={product.id} product={product} />
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/products?category=used"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View All Used Items
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No used products available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}