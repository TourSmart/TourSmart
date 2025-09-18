import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-56 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
          {product.category}
        </span>
        <h3 className="text-2xl font-bold mt-2 text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-2 text-sm flex-grow">{product.description}</p>
        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-teal-500 text-white font-bold py-2 px-4 rounded-full transition-transform duration-300 hover:bg-teal-600 active:scale-95 flex items-center space-x-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;