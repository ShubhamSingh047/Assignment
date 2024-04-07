// Import React library
import React from "react";

// Define interface for product props
interface ProductProps {
  product: {
    photo: string;
    productName: string;
    categoryName: string;
    brandName: string;
    cost: number;
  };
}

// Define Product component
const Product: React.FC<ProductProps> = ({ product }) => {
  // Destructure product object
  const { photo, productName, categoryName, brandName, cost } = product;

  // Render product details
  return (
    <div className="max-w-sm rounded overflow-hidden">
      <img className="w-full h-64 object-cover" src={photo} alt={productName} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <p className="text-gray-700 text-base mb-2">Category: {categoryName}</p>
        <p className="text-gray-700 text-base mb-2">Brand: {brandName}</p>
        <p className="text-gray-700 text-base">Price: {cost}</p>
      </div>
    </div>
  );
};

// Export Product component
export default Product;
