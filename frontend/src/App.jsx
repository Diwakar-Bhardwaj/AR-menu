import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import RestaurantLogin from './pages/RestaurantLogin';
import { AppProvider } from './context/AppContext';
import { MenuProvider } from './context/MenuContext';
import HomePage from './pages/HomePage';
import Restaurant from './pages/Restaurant';
import CustomerOrders from './pages/CustomerOrders';
import ItemDetails from './pages/ItemDetails';
import About from './pages/About';
import RegisterRestaurant from './pages/RegisterRestaurant';
import RegisterRestaurantView from './pages/RegisterRestaurantView';
// Wrapper component to get restaurantId from params
const RestaurantWithProvider = () => {
  const { restaurantId } = useParams();
  return (
    <MenuProvider restaurantId={restaurantId}>
      <Restaurant />
    </MenuProvider>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantWithProvider />} />
          <Route path="/orders" element={<CustomerOrders />} />
          <Route path="/item-details" element={<ItemDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/register-restaurant" element={<RegisterRestaurant />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/register-restaurant/:slug" element={<RegisterRestaurantView />} />
            <Route path="/login-restaurant" element={<RestaurantLogin />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;