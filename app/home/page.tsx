"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiHeadphones,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Categories data
  const categories = [
    {
      name: "Electronics",
      icon: "📱",
      count: "120+ Products",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Fashion",
      icon: "👗",
      count: "300+ Products",
      color: "from-pink-500 to-rose-500",
    },
    {
      name: "Home & Kitchen",
      icon: "🏠",
      count: "80+ Products",
      color: "from-amber-500 to-orange-500",
    },
    {
      name: "Beauty",
      icon: "💄",
      count: "150+ Products",
      color: "from-purple-500 to-indigo-500",
    },
  ];

  // Featured products
  const featuredProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$99.99",
      originalPrice: "$129.99",
      image: "/products/wirels-headPh.png",
      discount: "20% OFF",
      rating: 4.5,
      reviews: 128,
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      price: "$199.99",
      originalPrice: "$249.99",
      image: "/products/watch.png",
      discount: "15% OFF",
      rating: 4.8,
      reviews: 89,
    },
    {
      id: 3,
      name: "Premium Laptop Bag",
      price: "$49.99",
      originalPrice: "$69.99",
      image: "/products/lap-bag.png",
      discount: "10% OFF",
      rating: 4.3,
      reviews: 256,
    },
    {
      id: 4,
      name: "DSLR Camera",
      price: "$599.99",
      originalPrice: "$799.99",
      image: "/products/dslr-cam.png",
      discount: "25% OFF",
      rating: 4.7,
      reviews: 67,
    },
  ];

  // Features
  const features = [
    {
      icon: <FiTruck className="text-2xl" />,
      title: "Free Shipping",
      desc: "On orders over $99",
    },
    {
      icon: <FiShield className="text-2xl" />,
      title: "Secure Payment",
      desc: "100% secure payment",
    },
    {
      icon: <FiHeadphones className="text-2xl" />,
      title: "24/7 Support",
      desc: "Dedicated support",
    },
    {
      icon: <FiShoppingBag className="text-2xl" />,
      title: "Easy Returns",
      desc: "30-day return policy",
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

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-cream-50 to-orange-50 py-20 overflow-hidden">
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
                  New Collection 2024
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Elevate Your
                <span className="text-amber-600 block">Style Game</span>
              </motion.h1>

              <motion.p
                className="text-xl text-gray-600 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Discover premium quality products that blend style with
                functionality. Exclusive launch discounts up to 50% off.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <button className="bg-black hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <FiShoppingBag />
                  Shop Now
                </button>
                <button className="border-2 border-gray-800 hover:bg-gray-800 hover:text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  Explore Collection
                  <FiArrowRight />
                </button>
              </motion.div>
            </motion.div>

            {/* Image Slider */}
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
                {/* Image 1 */}
                <motion.img
                  src="/products/lap-bag.png"
                  alt="Laptop Bag"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === 0 ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Image 2 */}
                <motion.img
                  src="/products/wirels-headPh.png"
                  alt="Wireless Headphones"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === 1 ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                />

                {/* Image 3 */}
                <motion.img
                  src="/products/watch.png"
                  alt="Smart Watch"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: currentSlide === 2 ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
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
              Explore our wide range of product categories
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
                <div
                  className={`bg-gradient-to-br ${category.color} rounded-2xl p-8 text-white text-center relative overflow-hidden h-48 flex flex-col justify-center items-center`}
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{category.name}</h3>
                  <p className="text-white/80">{category.count}</p>

                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
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
                Featured Products
              </h2>
              <p className="text-gray-600">Handpicked items just for you</p>
            </div>
            <button className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
              View All
              <FiArrowRight />
            </button>
          </motion.div>

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
                <div className="relative overflow-hidden">
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-60 object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {product.discount}
                  </div>
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                    Featured
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2 text-gray-900">
                    {product.name}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={
                            i < Math.floor(product.rating) ? "fill-current" : ""
                          }
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {product.price}
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        {product.originalPrice}
                      </span>
                    </div>
                    <motion.button
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Subscribe to our newsletter and get exclusive deals, style tips,
              and early access to new collections.
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
        :root {
          --color-cream-50: #fef7ee;
          --color-cream-100: #fef3c7;
          --color-cream-200: #fde68a;
          --color-cream-300: #fcd34d;
          --color-cream-400: #fbbf24;
          --color-cream-500: #f59e0b;
          --color-cream-600: #d97706;
          --color-cream-700: #b45309;
          --color-cream-800: #92400e;
          --color-cream-900: #78350f;
        }

        .bg-cream-50 {
          background-color: var(--color-cream-50);
        }

        .bg-amber-50 {
          background-color: #fffbeb;
        }
      `}</style>
    </div>
  );
}
