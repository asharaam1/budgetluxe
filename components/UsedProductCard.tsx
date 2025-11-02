// components/UsedProductCard.tsx
"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  FiHeart,
  FiShoppingCart,
  FiStar,
  FiShield,
  FiClock,
} from "react-icons/fi";
import { Product } from "../types";

interface UsedProductCardProps {
  product: Product;
}

export default function UsedProductCard({ product }: UsedProductCardProps) {
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

  const getConditionDetails = (condition: string) => {
    const details = {
      new: {
        text: "Brand New",
        color: "bg-green-100 text-green-800",
        desc: "Never used with tags",
      },
      "used-good": {
        text: "Used - Good",
        color: "bg-blue-100 text-blue-800",
        desc: "Lightly used, excellent condition",
      },
      "used-fair": {
        text: "Used - Fair",
        color: "bg-yellow-100 text-yellow-800",
        desc: "Visible signs of wear but functional",
      },
    };
    return details[condition as keyof typeof details] || details["used-good"];
  };

  const conditionInfo = getConditionDetails(product.condition);

  const availableSizes = product.sizes
    ? Object.keys(product.sizes).filter((size) => {
        const sizeKey = size as keyof typeof product.sizes;
        return (
          product.sizes[sizeKey] !== undefined && product.sizes[sizeKey]! > 0
        );
      })
    : [];

  // Calculate savings for used items
  const savings = product.originalPrice
    ? product.originalPrice - product.price
    : 0;
  const savingsPercentage = product.originalPrice
    ? Math.round((savings / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group border-2 border-gray-100">
        {/* Product Image with Overlays */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0] || "/placeholder-product.jpg"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Condition Badge */}
          <div
            className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${conditionInfo.color}`}
          >
            {conditionInfo.text}
          </div>

          {/* Savings Badge */}
          {savings > 0 && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Save {savingsPercentage}%
            </div>
          )}

          {/* Authenticity Badge for Premium Brands */}
          {["Gucci", "Nike", "Adidas", "Puma"].includes(product.brand) && (
            <div className="absolute bottom-3 left-3 bg-black text-white px-2 py-1 rounded text-xs flex items-center gap-1">
              <FiShield className="w-3 h-3" />
              Authentic
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
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900 block">
                Rs.{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  Rs.{product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FiClock className="w-3 h-3" />
              <span>6+ months used</span>
            </div>
          </div>

          {/* Condition Description */}
          <div className="mb-3">
            <p className="text-xs text-gray-600">{conditionInfo.desc}</p>
          </div>

          {/* Savings Information */}
          {savings > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-3">
              <p className="text-xs text-green-800 font-medium">
                You save Rs.{savings} compared to new
              </p>
            </div>
          )}

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
            <div className="flex gap-1 mb-4 flex-wrap">
              {availableSizes.map((size) => (
                <span
                  key={size}
                  className="text-xs px-2 py-1 border border-gray-300 rounded bg-white"
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
                  onClick={() => {
                    addToCart(product, size, 1);
                    setShowSizeModal(false);
                  }}
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
