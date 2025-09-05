import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ModelViewer from '../components/ModelViewerRefactored';
import { useApp } from '../context/AppContext';
import OrderModal from '../components/ui/OrderModal';

const ItemDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addOrder } = useApp();
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  useEffect(() => {
    // Get item data from location state or URL params
    const itemData = location.state?.item;
    console.log('ItemDetails - location.state:', location.state);
    console.log('ItemDetails - itemData:', itemData);
    
    if (itemData) {
      setItem(itemData);
      setLoading(false);
    } else {
      // If no item data, redirect to home
      console.log('ItemDetails - No item data, redirecting to home');
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleOrderNow = () => {
    if (!item) return;
    setOrderModalOpen(true);
  };

  const handleOrder = (customerName, selectedItem) => {
    addOrder(customerName, selectedItem);
  };

  const closeOrderModal = () => {
    setOrderModalOpen(false);
  };

  const getFoodType = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('pizza')) return 'pizza';
    if (lowerName.includes('burger')) return 'burger';
    if (lowerName.includes('sushi')) return 'sushi';
    if (lowerName.includes('salad')) return 'salad';
    if (lowerName.includes('pasta')) return 'pasta';
    if (lowerName.includes('taco')) return 'taco';
    return 'generic';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Item not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {/* Item Name Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 tracking-tight drop-shadow-lg font-serif">
            {item.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* 3D Model Viewer Section */}
          <div className="order-1 lg:order-1">
            <div className="h-96 lg:h-[500px]">
              <ModelViewer 
                modelPath={`/models/${item.name.toLowerCase().replace(/\s+/g, '-')}.glb`}
                foodType={getFoodType(item.name)}
                className="w-full h-full"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Drag to rotate • Scroll to zoom • Click and drag to explore
              </p>
            </div>
          </div>

          {/* Food Details Section */}
          <div className="order-2 lg:order-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
              {/* Price */}
              <div className="text-3xl font-bold text-orange-600 mb-4">
                {item.price}
              </div>

              {/* Review */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600 font-medium">4.5</span>
                <span className="text-gray-400">(128 reviews)</span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.review} A delicious and carefully prepared dish that combines fresh ingredients 
                  with traditional cooking methods to create an unforgettable dining experience.
                </p>
              </div>

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Ingredients</h3>
                <div className="flex flex-wrap gap-2">
                  {['Fresh ingredients', 'Premium spices', 'Organic vegetables', 'Quality meat', 'Herbs'].map((ingredient, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order Button */}
              <button
                onClick={handleOrderNow}
                className="w-full bg-green-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-600 transition transform hover:scale-105 text-lg"
              >
                Order Now - {item.price}
              </button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Prep Time:</span> 15-20 min
                  </div>
                  <div>
                    <span className="font-medium">Serves:</span> 1-2 people
                  </div>
                  <div>
                    <span className="font-medium">Calories:</span> ~450 cal
                  </div>
                  <div>
                    <span className="font-medium">Spice Level:</span> Mild
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Menu Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
          >
            ← Back to Menu
          </button>
        </div>
      </main>

      <Footer />
      <OrderModal
        isOpen={orderModalOpen}
        onClose={closeOrderModal}
        selectedItem={item}
        onOrder={handleOrder}
      />
    </div>
  );
};

export default ItemDetails;
