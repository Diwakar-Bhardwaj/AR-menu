import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuService } from '../services/menuService.js';

const MenuContext = createContext();

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

export const MenuProvider = ({ children, restaurantId }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMenuItems = async () => {
    if (!restaurantId) return;
    
    setLoading(true);
    setError(null);
    try {
      // For now, use mock data until backend is fixed
      const mockItems = [
        {
          _id: '1',
          name: 'Margherita Pizza',
          price: '$12.99',
          review: 'Classic Italian pizza with fresh basil',
          category: 'Main Course',
          image: 'https://source.unsplash.com/400x300/?pizza'
        },
        {
          _id: '2',
          name: 'Caesar Salad',
          price: '$8.99',
          review: 'Fresh romaine lettuce with caesar dressing',
          category: 'Appetizer',
          image: 'https://source.unsplash.com/400x300/?salad'
        },
        {
          _id: '3',
          name: 'Chocolate Cake',
          price: '$6.99',
          review: 'Rich chocolate cake with vanilla ice cream',
          category: 'Dessert',
          image: 'https://source.unsplash.com/400x300/?cake'
        }
      ];
      setMenuItems(mockItems);
      
      // Try to fetch from API as well
      try {
        const items = await MenuService.getMenuItems(restaurantId);
        if (items && items.length > 0) {
          setMenuItems(items);
        }
      } catch (apiError) {
        console.log('API not available, using mock data');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = async (menuItemData) => {
    try {
      // Create mock item with generated ID
      const newItem = {
        _id: Date.now().toString(),
        ...menuItemData,
        image: menuItemData.image || `https://source.unsplash.com/400x300/?food,${encodeURIComponent(menuItemData.name)}`
      };
      
      // Try API first
      try {
        const apiItem = await MenuService.createMenuItem(restaurantId, menuItemData);
        setMenuItems(prev => [apiItem, ...prev]);
        return apiItem;
      } catch (apiError) {
        // Fallback to mock data
        setMenuItems(prev => [newItem, ...prev]);
        return newItem;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateMenuItem = async (menuItemId, updateData) => {
    try {
      // Try API first
      try {
        const updatedItem = await MenuService.updateMenuItem(menuItemId, updateData);
        setMenuItems(prev => 
          prev.map(item => item._id === menuItemId ? updatedItem : item)
        );
        return updatedItem;
      } catch (apiError) {
        // Fallback to mock data
        const updatedItem = { ...updateData, _id: menuItemId };
        setMenuItems(prev => 
          prev.map(item => item._id === menuItemId ? updatedItem : item)
        );
        return updatedItem;
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteMenuItem = async (menuItemId) => {
    try {
      // Try API first
      try {
        await MenuService.deleteMenuItem(menuItemId);
      } catch (apiError) {
        // Fallback to mock data - just remove from state
      }
      setMenuItems(prev => prev.filter(item => item._id !== menuItemId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const searchMenuItems = async (searchTerm) => {
    if (!searchTerm.trim()) {
      loadMenuItems();
      return;
    }
    
    try {
      // Try API first
      try {
        const results = await MenuService.searchMenuItems(restaurantId, searchTerm);
        setMenuItems(results);
      } catch (apiError) {
        // Fallback to mock data search
        const allItems = [
          {
            _id: '1',
            name: 'Margherita Pizza',
            price: '$12.99',
            review: 'Classic Italian pizza with fresh basil',
            category: 'Main Course',
            image: 'https://source.unsplash.com/400x300/?pizza'
          },
          {
            _id: '2',
            name: 'Caesar Salad',
            price: '$8.99',
            review: 'Fresh romaine lettuce with caesar dressing',
            category: 'Appetizer',
            image: 'https://source.unsplash.com/400x300/?salad'
          },
          {
            _id: '3',
            name: 'Chocolate Cake',
            price: '$6.99',
            review: 'Rich chocolate cake with vanilla ice cream',
            category: 'Dessert',
            image: 'https://source.unsplash.com/400x300/?cake'
          }
        ];
        
        const filtered = allItems.filter(item =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMenuItems(filtered);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, [restaurantId]);

  const value = {
    menuItems,
    loading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    searchMenuItems,
    loadMenuItems
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};
