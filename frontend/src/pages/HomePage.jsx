import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MenuItemCard from '../components/ui/MenuItemCard';
import OrderModal from '../components/ui/OrderModal';
import MenuSearch from '../components/ui/MenuSearch';
import { useApp } from '../context/AppContext';
import { getOrderCounts, sortMenuByOrders } from '../utils/menuUtils';

const HomePage = () => {
  const navigate = useNavigate();
  const { menu, orders, addOrder } = useApp();
  const [orderModal, setOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  // Get order counts and sort menu
  const orderCounts = getOrderCounts(orders);
  const sortedMenu = sortMenuByOrders(menu, orderCounts);

  const openOrderModal = (item) => {
    setSelectedItem(item);
    setOrderModal(true);
  };

  const closeOrderModal = () => {
    setOrderModal(false);
    setSelectedItem(null);
  };

  const handleOrder = (customerName, item) => {
    addOrder(customerName, item);
  };

  const viewItemDetails = (item) => {
    console.log('HomePage - Navigating to item details with item:', item);
    navigate('/item-details', { state: { item } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10 font-serif text-orange-600 tracking-tight drop-shadow-lg">
          Our Menu
        </h1>
        <MenuSearch
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search menu..."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {sortedMenu.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.price.toLowerCase().includes(search.toLowerCase()) ||
            item.review.toLowerCase().includes(search.toLowerCase())
          ).length === 0 ? (
            <div className="col-span-full text-center text-gray-400">No menu items found.</div>
          ) : (
            sortedMenu.filter(item =>
              item.name.toLowerCase().includes(search.toLowerCase()) ||
              item.price.toLowerCase().includes(search.toLowerCase()) ||
              item.review.toLowerCase().includes(search.toLowerCase())
            ).map((item, idx) => (
              <MenuItemCard
                key={idx}
                item={item}
                onOrder={openOrderModal}
                onViewDetails={viewItemDetails}
              />
            ))
          )}
        </div>
      </main>
      <Footer />
      <OrderModal
        isOpen={orderModal}
        onClose={closeOrderModal}
        selectedItem={selectedItem}
        onOrder={handleOrder}
      />
    </div>
  );
};

export default HomePage;
