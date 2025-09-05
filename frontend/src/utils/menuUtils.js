// Initial menu data
export const initialMenu = [
  {
    name: 'Margherita Pizza',
    price: '$12.99',
    review: 'Classic and delicious!',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Sushi Platter',
    price: '$18.50',
    review: 'Fresh and tasty.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Cheeseburger',
    price: '$10.00',
    review: 'Juicy and flavorful.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Caesar Salad',
    price: '$8.99',
    review: 'Crisp and refreshing.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Pad Thai',
    price: '$13.25',
    review: 'Authentic Thai taste.',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Tacos',
    price: '$9.50',
    review: 'Spicy and satisfying.',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Pasta Carbonara',
    price: '$14.00',
    review: 'Creamy and rich.',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0723c6e?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Grilled Salmon',
    price: '$16.75',
    review: 'Perfectly cooked.',
    image: 'https://images.unsplash.com/photo-1504674900247-ec6b0b4782e7?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Chicken Biryani',
    price: '$13.99',
    review: 'Aromatic and spicy.',
    image: 'https://images.unsplash.com/photo-1504674900247-1a781979e8c0?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Falafel Wrap',
    price: '$7.99',
    review: 'Healthy and tasty.',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Steak Frites',
    price: '$19.99',
    review: 'Tender and juicy.',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Ramen Bowl',
    price: '$12.50',
    review: 'Warm and comforting.',
    image: 'https://images.unsplash.com/photo-1504674900247-ec6b0b4782e7?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Greek Salad',
    price: '$9.25',
    review: 'Fresh and zesty.',
    image: 'https://images.unsplash.com/photo-1504674900247-1a781979e8c0?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'BBQ Ribs',
    price: '$17.50',
    review: 'Fall-off-the-bone.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Paneer Tikka',
    price: '$11.00',
    review: 'Smoky and flavorful.',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Fish & Chips',
    price: '$13.75',
    review: 'Crispy and golden.',
    image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Veggie Burger',
    price: '$10.50',
    review: 'Hearty and filling.',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Chicken Wings',
    price: '$9.99',
    review: 'Spicy and crispy.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Eggs Benedict',
    price: '$11.75',
    review: 'Rich and creamy.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Chocolate Cake',
    price: '$6.50',
    review: 'Decadent dessert!',
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0723c6e?auto=format&fit=crop&w=400&q=80'
  }
];

// Utility functions
export const getOrderCounts = (orders) => {
  const orderCounts = {};
  orders.forEach(order => {
    const name = order.item.name;
    orderCounts[name] = (orderCounts[name] || 0) + 1;
  });
  return orderCounts;
};

export const sortMenuByOrders = (menu, orderCounts) => {
  return [...menu]
    .map(item => ({
      ...item,
      orderCount: orderCounts[item.name] || 0
    }))
    .sort((a, b) => b.orderCount - a.orderCount);
};

export const saveToLocalStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};
