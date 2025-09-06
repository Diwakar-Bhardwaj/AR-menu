import { RestaurantService } from '../services/restaurantService.js';

export class RestaurantController {
  static async createRestaurant(req, res) {
    try {
      const { name, owner, email, phone, address, city, cuisine } = req.body || {};
      
      if (!name || !owner || !email || !phone || !address || !city || !cuisine) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const restaurant = await RestaurantService.create({
        name,
        owner,
        email,
        phone,
        address,
        city,
        cuisine
      });

      return res.status(201).json(restaurant);
    } catch (error) {
      console.error('Error creating restaurant:', error);
      return res.status(500).json({ error: 'Failed to create restaurant' });
    }
  }

  static async getRestaurantBySlug(req, res) {
    try {
      const { slug } = req.params;
      const restaurant = await RestaurantService.getBySlug(slug);
      
      if (!restaurant) {
        return res.status(404).json({ error: 'Restaurant not found' });
      }
      
      return res.json(restaurant);
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      return res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
  }

  static async getAllRestaurants(req, res) {
    try {
      const restaurants = await RestaurantService.getAll();
      return res.json(restaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
  }
}





