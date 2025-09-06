const API_BASE_URL = 'http://localhost:4000/api';

export class MenuService {
  static async getMenuItems(restaurantId) {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/restaurants/${restaurantId}`);
      if (!response.ok) throw new Error('Failed to fetch menu items');
      return await response.json();
    } catch (error) {
      console.error('Error fetching menu items:', error);
      throw error;
    }
  }

  static async createMenuItem(restaurantId, menuItemData) {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/restaurants/${restaurantId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(menuItemData)
      });
      if (!response.ok) throw new Error('Failed to create menu item');
      return await response.json();
    } catch (error) {
      console.error('Error creating menu item:', error);
      throw error;
    }
  }

  static async updateMenuItem(menuItemId, updateData) {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/${menuItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      if (!response.ok) throw new Error('Failed to update menu item');
      return await response.json();
    } catch (error) {
      console.error('Error updating menu item:', error);
      throw error;
    }
  }

  static async deleteMenuItem(menuItemId) {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/${menuItemId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete menu item');
      return await response.json();
    } catch (error) {
      console.error('Error deleting menu item:', error);
      throw error;
    }
  }

  static async searchMenuItems(restaurantId, searchTerm) {
    try {
      const response = await fetch(`${API_BASE_URL}/menu/restaurants/${restaurantId}/search?q=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Failed to search menu items');
      return await response.json();
    } catch (error) {
      console.error('Error searching menu items:', error);
      throw error;
    }
  }
}
