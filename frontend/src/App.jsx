import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import Restaurant from './pages/Restaurant';
import CustomerOrders from './pages/CustomerOrders';
import ItemDetails from './pages/ItemDetails';
import About from './pages/About';
import RegisterRestaurant from './pages/RegisterRestaurant';
import RegisterRestaurantView from './pages/RegisterRestaurantView';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/item-details" element={<ItemDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/register-restaurant" element={<RegisterRestaurant />} />
          <Route path="/register-restaurant/:slug" element={<RegisterRestaurantView />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;