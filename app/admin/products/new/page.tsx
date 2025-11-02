// app/admin/products/new/page.tsx - Updated with Image Upload
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/config";
import { useImageUpload } from "@/hooks/useImageUpload";
import { FiSave, FiArrowLeft, FiUpload, FiX, FiImage } from "react-icons/fi";

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadMultipleImages, uploading: imageUploading } = useImageUpload();

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "men",
    brand: "",
    condition: "new",
    status: "active",
    sizes: {
      S: "",
      M: "",
      L: "",
      XL: "",
      XXL: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedUrls = await uploadMultipleImages(Array.from(files));
    setImages((prev) => [...prev, ...uploadedUrls]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSizeChange = (size: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Please upload at least one product image");
      return;
    }

    setLoading(true);

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
        originalPrice: formData.originalPrice
          ? Number(formData.originalPrice)
          : null,
        category: formData.category,
        brand: formData.brand,
        condition: formData.condition,
        status: formData.status,
        sizes: sizes,
        images: images, // Use uploaded images
        tags: [],
        rating: 0,
        reviewCount: 0,
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "products"), productData);

      alert("Product added successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600">Create a new product listing</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Product Images
            </h2>

            <div className="space-y-4">
              {/* Image Preview Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#C8A46F] transition-colors">
                <FiImage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag & drop images here or click to browse
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Recommended: 800x800px, JPG/PNG format
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="bg-[#C8A46F] hover:bg-yellow-600 text-white px-6 py-2 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <FiUpload className="w-4 h-4" />
                  {imageUploading ? "Uploading..." : "Choose Images"}
                </label>
              </div>

              {images.length === 0 && !imageUploading && (
                <p className="text-sm text-red-600 text-center">
                  At least one product image is required
                </p>
              )}
            </div>
          </div>

          {/* Rest of the form remains the same */}
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Basic Information
            </h2>

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
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Pricing
            </h2>

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
                <p className="text-sm text-gray-500 mt-1">
                  Leave empty if no discount
                </p>
              </div>
            </div>
          </div>

          {/* Inventory */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Inventory
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
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
              disabled={loading || imageUploading || images.length === 0}
              className="bg-[#C8A46F] hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <FiSave className="w-5 h-5" />
              {loading ? "Adding Product..." : "Add Product"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/products")}
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
