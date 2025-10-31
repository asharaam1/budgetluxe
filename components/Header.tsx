// components/Header.tsx
"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import {
  FiSearch,
  FiShoppingCart,
  FiHeart,
  FiUser,
  FiMenu,
} from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function Header() {
  const { getCartItemsCount } = useCart();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/logo-2.png" alt="Budget Luxe Logo" className="h-8 w-8" />
            <Link
              href="/"
              className="text-xl font-bold tracking-wide text-[#C8A46F]"
            >
              Budget Luxe
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for garments, brands..."
                className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C8A46F]"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Products Link */}
            <Link
              href="/products"
              className="hidden md:block hover:text-[#C8A46F] transition font-medium"
            >
              Products
            </Link>

            {/* Cart with Link */}
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-800 rounded-lg transition"
            >
              <FiShoppingCart className="text-xl" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8A46F] text-gray-900 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* User Account - Updated */}
            <div className="relative group">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition">
                <FiUser className="text-xl" />
              </button>
              <div className="absolute right-0 w-48 bg-white text-gray-900 rounded-lg shadow-xl p-4 hidden group-hover:block z-50">
                {user ? (
                  <>
                    <p className="text-sm text-gray-600 mb-2">
                      Hello, {user.displayName}
                    </p>
                    <Link
                      href="/profile"
                      className="block py-2 hover:text-[#C8A46F] transition"
                    >
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block py-2 hover:text-[#C8A46F] transition"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-2 hover:text-[#C8A46F] transition text-red-600"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block py-2 hover:text-[#C8A46F] transition"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block py-2 hover:text-[#C8A46F] transition"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <FiMenu className="text-xl" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for garments, brands..."
              className="w-full px-4 py-2 pl-10 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C8A46F]"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Categories Navigation */}
        <nav className="hidden md:flex justify-center space-x-8 py-3 border-t border-gray-700">
          <Link
            href="/products?category=men"
            className="hover:text-[#C8A46F] transition font-medium"
          >
            Men's Fashion
          </Link>
          <Link
            href="/products?category=women"
            className="hover:text-[#C8A46F] transition font-medium"
          >
            Women's Wear
          </Link>
          <Link
            href="/products?category=kids"
            className="hover:text-[#C8A46F] transition font-medium"
          >
            Kids Collection
          </Link>
          <Link
            href="/products?category=used"
            className="hover:text-[#C8A46F] transition font-medium text-green-400"
          >
            Used Clothes
          </Link>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 rounded-lg mt-2 p-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/products"
                className="hover:text-[#C8A46F] transition font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link
                href="/products?category=men"
                className="hover:text-[#C8A46F] transition font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Men's Fashion
              </Link>
              <Link
                href="/products?category=women"
                className="hover:text-[#C8A46F] transition font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Women's Wear
              </Link>
              <Link
                href="/products?category=kids"
                className="hover:text-[#C8A46F] transition font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kids Collection
              </Link>
              <Link
                href="/products?category=used"
                className="hover:text-[#C8A46F] transition font-medium py-2 text-green-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Used Clothes
              </Link>
              <div className="border-t border-gray-700 pt-4">
                <Link
                  href="/auth/login"
                  className="block py-2 hover:text-[#C8A46F] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="block py-2 hover:text-[#C8A46F] transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
