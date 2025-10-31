// app/products/page.tsx
"use client";
import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/config";
import ProductCard from "../../components/ProductCard";
import { FiSearch, FiFilter } from "react-icons/fi";
import { Product, Filters } from "../../types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [filters, setFilters] = useState<Filters>({
    category: "",
    brand: "",
    priceRange: [0, 5000],
    condition: "",
    size: "",
  });

  const categories: string[] = ["men", "women", "kids", "used"];
  const brands: string[] = [
    "Nike",
    "Adidas",
    "Gucci",
    "Zara",
    "H&M",
    "Puma",
    "Levi's",
  ];
  const conditions: string[] = ["new", "used-good", "used-fair"];
  const sizes: string[] = ["S", "M", "L", "XL", "XXL"];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, filters, searchTerm]);

  const fetchProducts = async (): Promise<void> => {
    try {
      const productsRef = collection(db, "products");
      const q = query(productsRef, where("status", "==", "active"));
      const querySnapshot = await getDocs(q);

      const productsData: Product[] = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Product)
      );

      setProducts(productsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const filterProducts = (): void => {
    let filtered: Product[] = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Brand filter
    if (filters.brand) {
      filtered = filtered.filter((product) => product.brand === filters.brand);
    }

    // Price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Condition filter
    if (filters.condition) {
      filtered = filtered.filter(
        (product) => product.condition === filters.condition
      );
    }

    // Size filter
    if (filters.size && filtered.length > 0) {
      filtered = filtered.filter((product) => {
        const stock =
          product.sizes?.[filters.size as keyof typeof product.sizes];
        return (stock || 0) > 0;
      });
    }
    setFilteredProducts(filtered);
  };

  const handleFilterChange = (key: keyof Filters, value: any): void => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = (): void => {
    setFilters({
      category: "",
      brand: "",
      priceRange: [0, 5000],
      condition: "",
      size: "",
    });
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search and Filter Bar */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-64">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex gap-4 w-full md:w-auto">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FiFilter />
                Filters
              </button>

              <button
                onClick={clearFilters}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <FiltersSection
                filters={filters}
                onFilterChange={handleFilterChange}
                categories={categories}
                brands={brands}
                conditions={conditions}
                sizes={sizes}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                {filters.category
                  ? `${
                      filters.category.charAt(0).toUpperCase() +
                      filters.category.slice(1)
                    } Fashion`
                  : "All Products"}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} products found
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <FiSearch className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Filters Component
interface FiltersSectionProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: any) => void;
  categories: string[];
  brands: string[];
  conditions: string[];
  sizes: string[];
}

function FiltersSection({
  filters,
  onFilterChange,
  categories,
  brands,
  conditions,
  sizes,
}: FiltersSectionProps) {
  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="radio"
                name="category"
                checked={filters.category === category}
                onChange={() => onFilterChange("category", category)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700 capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Brand</h3>
        <select
          value={filters.brand}
          onChange={(e) => onFilterChange("brand", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">
          Price: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="5000"
            step="100"
            value={filters.priceRange[1]}
            onChange={(e) =>
              onFilterChange("priceRange", [
                filters.priceRange[0],
                parseInt(e.target.value),
              ])
            }
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹0</span>
            <span>₹5000</span>
          </div>
        </div>
      </div>

      {/* Condition Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Condition</h3>
        <select
          value={filters.condition}
          onChange={(e) => onFilterChange("condition", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Conditions</option>
          <option value="new">New</option>
          <option value="used-good">Used - Good</option>
          <option value="used-fair">Used - Fair</option>
        </select>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
        <select
          value={filters.size}
          onChange={(e) => onFilterChange("size", e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Sizes</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
