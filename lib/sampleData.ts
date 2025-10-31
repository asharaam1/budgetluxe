// lib/sampleData.ts
import { collection, addDoc } from 'firebase/firestore';
import { db } from './config';

export const sampleProducts = [
  {
    name: "Men's Premium Cotton T-Shirt",
    description: "High-quality cotton t-shirt perfect for casual wear",
    price: 899,
    originalPrice: 1299,
    images: ["/products/tshirt-men.jpg"],
    category: "men",
    brand: "Nike",
    condition: "new",
    sizes: { S: 10, M: 15, L: 8, XL: 5 },
    tags: ["cotton", "casual", "sports"],
    status: "active",
    rating: 4.5,
    reviewCount: 128,
    createdAt: new Date()
  },
  {
    name: "Women's Summer Floral Dress",
    description: "Beautiful floral dress for summer occasions",
    price: 1599,
    originalPrice: 2299,
    images: ["/products/dress-women.jpg"],
    category: "women", 
    brand: "Zara",
    condition: "new",
    sizes: { S: 8, M: 12, L: 6 },
    tags: ["floral", "summer", "elegant"],
    status: "active", 
    rating: 4.3,
    reviewCount: 89,
    createdAt: new Date()
  },
  {
    name: "Used Nike Air Max Shoes",
    description: "Gently used Nike Air Max shoes in excellent condition",
    price: 2999,
    originalPrice: 8999,
    images: ["/products/shoes-used.jpg"],
    category: "used",
    brand: "Nike",
    condition: "used-good",
    sizes: { M: 3, L: 2, XL: 1 },
    tags: ["sneakers", "used", "premium"],
    status: "active",
    rating: 4.7,
    reviewCount: 45,
    createdAt: new Date()
  },
  {
    name: "Kids Denim Jacket",
    description: "Durable denim jacket for kids",
    price: 1299,
    originalPrice: 1999,
    images: ["/products/jacket-kids.jpg"],
    category: "kids",
    brand: "H&M",
    condition: "new",
    sizes: { S: 6, M: 8, L: 4 },
    tags: ["denim", "kids", "jacket"],
    status: "active",
    rating: 4.2,
    reviewCount: 67,
    createdAt: new Date()
  },
  {
    name: "Used Gucci Handbag",
    description: "Authentic Gucci handbag, lightly used",
    price: 15999,
    originalPrice: 45000,
    images: ["/products/handbag-used.jpg"],
    category: "used",
    brand: "Gucci", 
    condition: "used-good",
    sizes: { M: 2 },
    tags: ["luxury", "used", "designer"],
    status: "active",
    rating: 4.8,
    reviewCount: 23,
    createdAt: new Date()
  }
];

export const addSampleProducts = async () => {
  try {
    for (const product of sampleProducts) {
      await addDoc(collection(db, 'products'), product);
      console.log('Product added:', product.name);
    }
    console.log('All sample products added successfully!');
  } catch (error) {
    console.error('Error adding products:', error);
  }
};