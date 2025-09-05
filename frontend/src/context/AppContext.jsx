import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialMenu, saveToLocalStorage, loadFromLocalStorage } from '../utils/menuUtils';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [menu, setMenu] = useState(() => loadFromLocalStorage('menu', initialMenu));
  const [orders, setOrders] = useState(() => loadFromLocalStorage('orders', []));

  // Save to localStorage whenever menu or orders change
  useEffect(() => {
    saveToLocalStorage('menu', menu);
  }, [menu]);

  useEffect(() => {
    saveToLocalStorage('orders', orders);
  }, [orders]);

  const addOrder = (customer, item) => {
    setOrders(prevOrders => [...prevOrders, { customer, item }]);
  };

  const removeOrder = (index) => {
    setOrders(prevOrders => prevOrders.filter((_, i) => i !== index));
  };

  const updateMenu = (newMenu) => {
    setMenu(newMenu);
  };

  const addMenuItem = (item) => {
    setMenu(prevMenu => [...prevMenu, item]);
  };

  const updateMenuItem = (index, item) => {
    setMenu(prevMenu => {
      const newMenu = [...prevMenu];
      newMenu[index] = item;
      return newMenu;
    });
  };

  const removeMenuItem = (index) => {
    setMenu(prevMenu => prevMenu.filter((_, i) => i !== index));
  };

  const value = {
    menu,
    orders,
    addOrder,
    removeOrder,
    updateMenu,
    addMenuItem,
    updateMenuItem,
    removeMenuItem,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
