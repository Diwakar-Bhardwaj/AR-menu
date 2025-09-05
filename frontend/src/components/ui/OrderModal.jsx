import React, { useState } from 'react';

const OrderModal = ({ isOpen, onClose, selectedItem, onOrder }) => {
  const [customerName, setCustomerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !selectedItem) return;
    onOrder(customerName, selectedItem);
    setCustomerName("");
    onClose();
  };

  const handleClose = () => {
    setCustomerName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative animate-fade-in-down">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={handleClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">Place Your Order</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
            placeholder="Your Name"
            className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none"
            required
          />
          <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-3">
            <img 
              src={selectedItem?.image} 
              alt={selectedItem?.name} 
              className="w-16 h-16 object-cover rounded" 
            />
            <div>
              <div className="font-bold text-gray-800">{selectedItem?.name}</div>
              <div className="text-orange-600 font-semibold">{selectedItem?.price}</div>
            </div>
          </div>
          <button 
            type="submit" 
            className="bg-green-500 text-white font-bold py-2 rounded-lg shadow hover:bg-green-600 transition"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
