// app/cart/page.tsx
"use client";
import { FiMinus, FiPlus, FiTrash2, FiShoppingBag } from "react-icons/fi";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FiShoppingBag className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">Add some products to your cart</p>
          <Link
            href="/products"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex gap-4">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{item.brand}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>Size: {item.size}</span>
                      <span>Condition: {item.condition}</span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-gray-900">
                          Rs.{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-red-600 hover:text-red-800 p-2"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rs.{getCartTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Rs.{getCartTotal() > 999 ? 0 : 99}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Rs.{(getCartTotal() * 0.18).toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>
                      Rs.
                      {(
                        getCartTotal() +
                        (getCartTotal() > 999 ? 0 : 99) +
                        getCartTotal() * 0.18
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold text-center block transition-colors"
              >
                Proceed to Checkout
              </Link>

              {getCartTotal() < 999 && (
                <p className="text-sm text-center text-gray-600 mt-3">
                  Add Rs.{999 - getCartTotal()} more for free shipping!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
