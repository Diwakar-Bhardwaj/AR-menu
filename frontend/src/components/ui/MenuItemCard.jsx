import React from 'react';

const MenuItemCard = ({ item, onOrder, onViewDetails }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform duration-200 hover:scale-105 hover:shadow-2xl group relative">
      <div 
        className="w-full h-40 mb-4 overflow-hidden rounded-xl flex items-center justify-center cursor-pointer"
        onClick={() => onViewDetails(item)}
      >
        <img
          src={item.image || `https://source.unsplash.com/400x300/?food,${encodeURIComponent(item.name)}`}
          alt={item.name}
          className="object-cover w-full h-full rounded-xl transition-transform duration-200 group-hover:scale-110"
        />
      </div>
      <h2 className="text-lg font-bold mb-1 text-gray-800 text-center">{item.name}</h2>
      <div className="text-orange-600 font-semibold text-lg mb-2">{item.price}</div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm text-gray-500">{item.review}</span>
      </div>
      <button
        className="w-full bg-green-500 text-white font-bold py-2 rounded-lg shadow hover:bg-green-600 transition"
        onClick={() => onOrder(item)}
      >
        Order
      </button>
    </div>
  );
};

export default MenuItemCard;
