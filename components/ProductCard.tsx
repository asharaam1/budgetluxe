import React from 'react';

interface Product {
  id: string;
  userId: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  imageUrl: string;
  condition: string;
  sizes: string[];
  approved: boolean;
  createdAt: Date;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleOrder = () => {
    const message = `I want to order ${product.name} by ${product.brand} for $${product.price}. Condition: ${product.condition}. Sizes: ${product.sizes.join(', ')}`;
    const waLink = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
  };

  return (
    <div className="border border-gray-300 p-4 m-2 rounded-lg shadow-md bg-white">
      <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{product.name}</h3>
      <p className="text-gray-600">{product.brand}</p>
      <p className="text-green-600 font-semibold text-xl">${product.price}</p>
      {!product.approved && <span className="bg-red-500 text-white px-2 py-1 text-xs rounded">Unapproved</span>}
      <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-2 w-full" onClick={handleOrder}>Order via WhatsApp</button>
    </div>
  );
};

export default ProductCard;
