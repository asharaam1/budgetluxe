// types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: 'men' | 'women' | 'kids' | 'used';
  brand: string;
  condition: 'new' | 'used-good' | 'used-fair';
  sizes: {
    S?: number;
    M?: number;
    L?: number;
    XL?: number;
    XXL?: number;
  };
  tags: string[];
  status: 'active' | 'inactive';
  rating: number;
  reviewCount: number;
  createdAt: any; // Firestore timestamp
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  brand: string;
  condition: string;
}

export interface Filters {
  category: string;
  brand: string;
  priceRange: [number, number];
  condition: string;
  size: string;
}