import { Router } from 'express';
import { RestaurantController } from '../controllers/restaurantController.js';

const router = Router();

// POST /api/restaurants
router.post('/', RestaurantController.createRestaurant);

// GET /api/restaurants
router.get('/', RestaurantController.getAllRestaurants);

// GET /api/restaurants/:slug
router.get('/:slug', RestaurantController.getRestaurantBySlug);

export default router;



