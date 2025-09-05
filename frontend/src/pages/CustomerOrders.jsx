import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";

const CustomerOrders = () => {
  const { orders, removeOrder } = useApp();
  const handleToggleCompleted = idx => {
    // For now, we'll just remove the order when toggled
    // You can extend this to add a completed state if needed
    removeOrder(idx);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar navLinks={["Home", "Menu", "Contact"]} />
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 flex flex-col items-center gap-8">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-8 text-center font-serif">Customer Orders</h1>
        <div className="w-full max-w-2xl">
          {orders.length === 0 ? (
            <div className="text-center text-gray-400">No orders yet.</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {orders.map((order, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
                  <img
                    src={order.item.image || `https://source.unsplash.com/400x300/?food,${encodeURIComponent(order.item.name)}`}
                    alt={order.item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-orange-600">{order.item.name}</div>
                    <div className="text-gray-700 font-medium">{order.item.price}</div>
                    <div className="text-gray-500 text-sm">Ordered by: <span className="font-semibold">{order.customer}</span></div>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg font-bold shadow transition-colors text-white ${order.completed ? 'bg-green-600 hover:bg-green-700' : 'bg-red-500 hover:bg-red-600'}`}
                    onClick={() => handleToggleCompleted(idx)}
                  >
                    {order.completed ? 'Completed' : 'Mark Completed'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerOrders;
