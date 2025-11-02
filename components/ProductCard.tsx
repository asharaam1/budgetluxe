// components/ProductCard.tsx
"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { FiHeart, FiShoppingCart, FiStar } from "react-icons/fi";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [showSizeModal, setShowSizeModal] = useState<boolean>(false);
  const { addToCart } = useCart();

  const handleAddToCart = (): void => {
    if (product.sizes && Object.keys(product.sizes).length > 0) {
      setShowSizeModal(true);
    } else {
      addToCart(product, "M", 1);
    }
  };

  const handleSizeSelect = (size: string): void => {
    addToCart(product, size, 1);
    setShowSizeModal(false);
  };

  const getConditionText = (condition: string): string => {
    const conditions: { [key: string]: string } = {
      new: "Brand New",
      "used-good": "Used - Good",
      "used-fair": "Used - Fair",
    };
    return conditions[condition] || condition;
  };

  const getConditionColor = (condition: string): string => {
    const colors: { [key: string]: string } = {
      new: "bg-green-100 text-green-800",
      "used-good": "bg-blue-100 text-blue-800",
      "used-fair": "bg-yellow-100 text-yellow-800",
    };
    return colors[condition] || "bg-gray-100 text-gray-800";
  };

  const availableSizes = product.sizes
    ? Object.keys(product.sizes).filter((size) => {
        const sizeKey = size as keyof typeof product.sizes;
        return (
          product.sizes[sizeKey] !== undefined && product.sizes[sizeKey]! > 0
        );
      })
    : [];

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0] || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Condition Badge */}
          <div
            className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(
              product.condition
            )}`}
          >
            {getConditionText(product.condition)}
          </div>

          {/* Discount Badge */}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              {Math.round(
                ((product.originalPrice - product.price) /
                  product.originalPrice) *
                  100
              )}
              % OFF
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
            <button className="bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full transition-colors shadow-sm">
              <FiHeart className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
              {product.name}
            </h3>
            <span className="text-lg font-bold text-gray-900 ml-2">
              Rs.{product.price}
            </span>
          </div>

          {product.originalPrice && product.originalPrice > product.price && (
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-gray-500 line-through">
                Rs.{product.originalPrice}
              </span>
              <span className="text-sm text-red-600 font-medium">
                Save Rs.{product.originalPrice - product.price}
              </span>
            </div>
          )}

          <p className="text-sm text-gray-600 mb-3">{product.brand}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviewCount})
            </span>
          </div>

          {/* Available Sizes */}
          {availableSizes.length > 0 && (
            <div className="flex gap-1 mb-4">
              {availableSizes.map((size) => (
                <span
                  key={size}
                  className="text-xs px-2 py-1 border border-gray-300 rounded"
                >
                  {size}
                </span>
              ))}
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={availableSizes.length === 0}
            className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 text-white py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <FiShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>

      {/* Size Selection Modal */}
      {showSizeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Select Size</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => handleSizeSelect(size)}
                  className="border border-gray-300 py-2 rounded hover:border-gray-900 transition-colors"
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowSizeModal(false)}
              className="w-full border border-gray-300 py-2 rounded hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
