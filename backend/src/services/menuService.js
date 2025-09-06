import MenuItem from '../models/MenuItem.js';

export class MenuService {
  static async getAllByRestaurant(restaurantId) {
    return await MenuItem.find({ restaurantId }).sort({ createdAt: -1 });
  }

  static async getById(menuItemId) {
    return await MenuItem.findById(menuItemId);
  }

  static async create(menuItemData) {
    const menuItem = new MenuItem(menuItemData);
    return await menuItem.save();
  }

  static async update(menuItemId, updateData) {
    return await MenuItem.findByIdAndUpdate(
      menuItemId, 
      { ...updateData, updatedAt: new Date() }, 
      { new: true }
    );
  }

  static async delete(menuItemId) {
    return await MenuItem.findByIdAndDelete(menuItemId);
  }

  static async searchByRestaurant(restaurantId, searchTerm) {
    const regex = new RegExp(searchTerm, 'i');
    return await MenuItem.find({
      restaurantId,
      $or: [
        { name: regex },
        { price: regex },
        { review: regex },
        { category: regex }
      ]
    }).sort({ createdAt: -1 });
  }

  static async getByCategory(restaurantId, category) {
    return await MenuItem.find({ 
      restaurantId, 
      category: new RegExp(category, 'i') 
    }).sort({ createdAt: -1 });
  }

  static async toggleAvailability(menuItemId) {
    const menuItem = await MenuItem.findById(menuItemId);
    if (!menuItem) return null;
    
    menuItem.isAvailable = !menuItem.isAvailable;
    menuItem.updatedAt = new Date();
    return await menuItem.save();
  }
}





