import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo + Brand */}
          <div className="flex items-center space-x-3">
            <img
              src="/logo-2.png" // Replace with your actual logo path
              alt="Budget Luxe Logo"
              className="h-8 w-8"
            />
            <span className="text-xl font-bold tracking-wide text-[#C8A46F]">
              Budget Luxe
            </span>{" "}
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="/" className="hover:text-gray-300 transition">
              Home
            </a>
            <a href="/products" className="hover:text-gray-300 transition">
              Products
            </a>
            <a href="/auth/login" className="hover:text-gray-300 transition">
              Login
            </a>
            <a href="/auth/signup" className="hover:text-gray-300 transition">
              Signup
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
