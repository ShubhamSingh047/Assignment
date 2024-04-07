import React from "react";

interface ProductProps {
  product: {
    photo: string;
    productName: string;
    categoryName: string;
    brandName: string;
    cost: number;
  };
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { photo, productName, categoryName, brandName, cost } = product;
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

export default Product;
