// app/home/page.tsx
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "../../lib/config";
import { Product } from "../../types";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import {
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiArrowRight,
  FiStar,
  FiHeart,
} from "react-icons/fi";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("status", "==", "active"), limit(8));

      const querySnapshot = await getDocs(q);
      const productsData: Product[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Product)
      );

      setFeaturedProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to sample data if Firebase fails
      setFeaturedProducts(featuredProductsSample);
    } finally {
      setLoading(false);
    }
  };

  // Garments Categories
  const categories = [
    {
      name: "Men's Fashion",
      icon: "👔",
      count: "200+ Products",
      color: "from-blue-500 to-cyan-500",
      href: "/products?category=men",
    },
    {
      name: "Women's Wear",
      icon: "👗",
      count: "350+ Products",
      color: "from-pink-500 to-rose-500",
      href: "/products?category=women",
    },
    {
      name: "Kids Collection",
      icon: "👶",
      count: "150+ Products",
      color: "from-green-500 to-emerald-500",
      href: "/products?category=kids",
    },
    {
      name: "Used Clothes",
      icon: "🔄",
      count: "100+ Products",
      color: "from-purple-500 to-indigo-500",
      href: "/products?category=used",
    },
  ];

  // Features for garments store
  const features = [
    {
      icon: <FiTruck className="text-2xl" />,
      title: "Free Shipping",
      desc: "On orders over Rs.2000",
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: "Quality Assurance",
      desc: "Premium quality fabrics",
    },
    {
      icon: <FiHeadphones className="text-2xl" />,
      title: "Style Support",
      desc: "Fashion advice 24/7",
    },
    {
      icon: <FiShoppingBag className="text-2xl" />,
      title: "Easy Returns",
      desc: "15-day return policy",
    },
  ];

  // Fallback sample data
  const featuredProductsSample: Product[] = [
    {
      id: "1",
      name: "Premium Cotton T-Shirts",
      description: "High-quality cotton t-shirts",
      price: 500,
      originalPrice: 800,
      images: ["/products/men-tshirts.png"],
      category: "men",
      brand: "Premium Brand",
      condition: "new",
      sizes: { S: 5, M: 8, L: 6, XL: 3 },
      tags: ["cotton", "casual"],
      status: "active",
      rating: 4.5,
      reviewCount: 128,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Designer Summer Dresses",
      description: "Beautiful summer dresses",
      price: 2000,
      originalPrice: 3500,
      images: ["/products/women-dress.png"],
      category: "women",
      brand: "Fashion Co.",
      condition: "new",
      sizes: { S: 4, M: 7, L: 5 },
      tags: ["dress", "summer"],
      status: "active",
      rating: 4.8,
      reviewCount: 89,
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Casual Denim Jeans",
      description: "Comfortable denim jeans",
      price: 1200,
      originalPrice: 1800,
      images: ["/products/jeans.png"],
      category: "men",
      brand: "Denim House",
      condition: "new",
      sizes: { S: 3, M: 6, L: 4, XL: 2 },
      tags: ["jeans", "denim"],
      status: "active",
      rating: 4.3,
      reviewCount: 256,
      createdAt: new Date(),
    },
    {
      id: "4",
      name: "Elegant Kurti Set",
      description: "Traditional kurti set",
      price: 4000,
      originalPrice: 5250,
      images: ["/products/kurti-set.png"],
      category: "women",
      brand: "Ethnic Wear",
      condition: "new",
      sizes: { S: 2, M: 5, L: 3 },
      tags: ["kurti", "traditional"],
      status: "active",
      rating: 4.7,
      reviewCount: 167,
      createdAt: new Date(),
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product, "M", 1);
  };

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-amber-50 via-cream-50 to-orange-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Text Content */}
            <motion.div
              className="lg:w-1/2 mb-12 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
                  Luxury Within Reach
                </span>
              </motion.div>

              <motion.h1
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                BUDGET
                <span className="text-amber-600 block">LUXE</span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Where luxury meets affordability. Discover premium quality
                garments at prices that won't break the bank. Elevate your style
                without compromising your budget.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Link href="/products">
                  <button className="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <FiShoppingBag />
                    Shop Collection
                  </button>
                </Link>
                <Link href="/products?category=used">
                  <button className="border-2 border-gray-800 hover:bg-gray-800 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                    Used Clothes
                    <FiArrowRight />
                  </button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                className="flex gap-4 md:gap-8 mt-8 md:mt-12 flex-wrap"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-gray-900">
                    5000+
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    Customers
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">1000+</div>
                  <div className="text-gray-600">Fashion Items</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-gray-600">Brands</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Image Slider for Garments */}
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden shadow-2xl bg-gray-200">
                <img
                  src={
                    [
                      "https://jadeblue.com/cdn/shop/articles/mens_summer_wear.jpg?v=1714380887&width=1100",
                      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&h=600&fit=crop",
                      "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=1000&h=600&fit=crop",
                    ][currentSlide]
                  }
                  alt="Fashion Collection"
                  className="w-full h-full object-cover"
                />

                {/* Slide Indicators */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {[0, 1, 2].map((index) => (
                    <button
                      key={index}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        currentSlide === index ? "bg-white w-8" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-cream-50 hover:bg-amber-50 transition-all duration-300 group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="bg-black text-white w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Discover fashion for every occasion and everyone
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="group cursor-pointer"
                variants={itemVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={category.href}>
                  <div
                    className={`bg-linear-to-br ${category.color} rounded-2xl p-8 text-white text-center relative overflow-hidden h-48 flex flex-col justify-center items-center`}
                  >
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {category.icon}
                    </div>
                    <h3 className="font-bold text-xl mb-2">{category.name}</h3>
                    <p className="text-white/80">{category.count}</p>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                Trending Now
              </h2>
              <p className="text-gray-600">
                Most loved pieces from our collection
              </p>
            </div>
            <Link href="/products">
              <button className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                View All
                <FiArrowRight />
              </button>
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-200 rounded-2xl p-4"
                >
                  <div className="bg-gray-300 h-60 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featuredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="bg-cream-50 rounded-2xl overflow-hidden group cursor-pointer"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={product.images?.[0] || "/placeholder-product.jpg"}
                        alt={product.name}
                        className="w-full h-60 object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                            {Math.round(
                              ((product.originalPrice - product.price) /
                                product.originalPrice) *
                                100
                            )}
                            % OFF
                          </div>
                        )}
                      <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                        {product.category}
                      </div>
                      <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full transition-colors duration-300">
                        <FiHeart />
                      </button>
                    </div>
                  </Link>

                  <div className="p-6">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-lg mb-2 text-gray-900 hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={
                              i < Math.floor(product.rating)
                                ? "fill-current"
                                : ""
                            }
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 text-sm">
                        ({product.reviewCount})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          Rs.{product.price}
                        </span>
                        {product.originalPrice &&
                          product.originalPrice > product.price && (
                            <span className="text-gray-500 line-through text-sm">
                              Rs.{product.originalPrice}
                            </span>
                          )}
                      </div>
                      <motion.button
                        onClick={() => handleAddToCart(product)}
                        className="bg-black hover:bg-gray-800 text-white p-3 rounded-xl transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiShoppingBag />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-amber-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">
              Join the BUDGET LUXE Family
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get exclusive access to new collections, special discounts, and
              style tips delivered straight to your inbox.
            </p>
            <motion.div
              className="max-w-md mx-auto flex bg-white rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 text-gray-900 focus:outline-none"
              />
              <button className="bg-black hover:bg-gray-800 font-semibold px-8 py-4 transition-colors duration-300">
                Subscribe
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Custom styles for cream color palette */}
      <style jsx global>{`
        .bg-cream-50 {
          background-color: #fef7ee;
        }

        .bg-amber-50 {
          background-color: #fffbeb;
        }
      `}</style>
    </div>
  );
}
