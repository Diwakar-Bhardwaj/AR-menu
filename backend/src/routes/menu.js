import { Router } from 'express';
import { MenuController } from '../controllers/menuController.js';

const router = Router();

// GET /api/menu/restaurants/:restaurantId - Get all menu items for a restaurant
router.get('/restaurants/:restaurantId', MenuController.getAllMenuItems);

// GET /api/menu/restaurants/:restaurantId/search?q=searchTerm - Search menu items
router.get('/restaurants/:restaurantId/search', MenuController.searchMenuItems);

// POST /api/menu/restaurants/:restaurantId - Create new menu item
router.post('/restaurants/:restaurantId', MenuController.createMenuItem);

// GET /api/menu/:menuItemId - Get specific menu item
router.get('/:menuItemId', MenuController.getMenuItemById);

// PUT /api/menu/:menuItemId - Update menu item
router.put('/:menuItemId', MenuController.updateMenuItem);

// DELETE /api/menu/:menuItemId - Delete menu item
router.delete('/:menuItemId', MenuController.deleteMenuItem);

// PATCH /api/menu/:menuItemId/toggle - Toggle menu item availability
router.patch('/:menuItemId/toggle', MenuController.toggleAvailability);

export default router;
