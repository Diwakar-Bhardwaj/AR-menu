import { MenuService } from '../services/menuService.js';
import mongoose from 'mongoose';

export class MenuController {
  static async getAllMenuItems(req, res) {
    try {
      const { restaurantId } = req.params;
      
      if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({ error: 'Invalid restaurant ID' });
      }

      const menuItems = await MenuService.getAllByRestaurant(restaurantId);
      return res.json(menuItems);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return res.status(500).json({ error: 'Failed to fetch menu items' });
    }
  }

  static async getMenuItemById(req, res) {
    try {
      const { menuItemId } = req.params;
      
      if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
        return res.status(400).json({ error: 'Invalid menu item ID' });
      }

      const menuItem = await MenuService.getById(menuItemId);
      
      if (!menuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
      }

      return res.json(menuItem);
    } catch (error) {
      console.error('Error fetching menu item:', error);
      return res.status(500).json({ error: 'Failed to fetch menu item' });
    }
  }

  static async createMenuItem(req, res) {
    try {
      const { restaurantId } = req.params;
      const { name, price, review, image, category } = req.body;

      if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({ error: 'Invalid restaurant ID' });
      }

      if (!name || !price || !review) {
        return res.status(400).json({ error: 'Name, price, and review are required' });
      }

      const menuItemData = {
        restaurantId,
        name,
        price,
        review,
        image: image || '',
        category: category || 'Main Course'
      };

      const menuItem = await MenuService.create(menuItemData);
      return res.status(201).json(menuItem);
    } catch (error) {
      console.error('Error creating menu item:', error);
      return res.status(500).json({ error: 'Failed to create menu item' });
    }
  }

  static async updateMenuItem(req, res) {
    try {
      const { menuItemId } = req.params;
      const updateData = req.body;

      if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
        return res.status(400).json({ error: 'Invalid menu item ID' });
      }

      const menuItem = await MenuService.update(menuItemId, updateData);
      
      if (!menuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
      }

      return res.json(menuItem);
    } catch (error) {
      console.error('Error updating menu item:', error);
      return res.status(500).json({ error: 'Failed to update menu item' });
    }
  }

  static async deleteMenuItem(req, res) {
    try {
      const { menuItemId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
        return res.status(400).json({ error: 'Invalid menu item ID' });
      }

      const menuItem = await MenuService.delete(menuItemId);
      
      if (!menuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
      }

      return res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
      console.error('Error deleting menu item:', error);
      return res.status(500).json({ error: 'Failed to delete menu item' });
    }
  }

  static async searchMenuItems(req, res) {
    try {
      const { restaurantId } = req.params;
      const { q } = req.query;

      if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
        return res.status(400).json({ error: 'Invalid restaurant ID' });
      }

      if (!q) {
        return res.status(400).json({ error: 'Search query is required' });
      }

      const menuItems = await MenuService.searchByRestaurant(restaurantId, q);
      return res.json(menuItems);
    } catch (error) {
      console.error('Error searching menu items:', error);
      return res.status(500).json({ error: 'Failed to search menu items' });
    }
  }

  static async toggleAvailability(req, res) {
    try {
      const { menuItemId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(menuItemId)) {
        return res.status(400).json({ error: 'Invalid menu item ID' });
      }

      const menuItem = await MenuService.toggleAvailability(menuItemId);
      
      if (!menuItem) {
        return res.status(404).json({ error: 'Menu item not found' });
      }

      return res.json(menuItem);
    } catch (error) {
      console.error('Error toggling availability:', error);
      return res.status(500).json({ error: 'Failed to toggle availability' });
    }
  }
}





