import React from "react";

const Product = ({ product }) => {
  const { photo, productName, categoryName, brandName, cost } = product;
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-100">
      <img className="w-full h-64 object-cover" src={photo} alt={productName} />
      <div className="px-6 py-4 ">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <p className="text-gray-700 text-base mb-2">Category: {categoryName}</p>
        <p className="text-gray-700 text-base mb-2">Brand: {brandName}</p>
        <p className="text-gray-700 text-base">Price: {cost}</p>
      </div>
    </div>
  );
};

export default Product;
