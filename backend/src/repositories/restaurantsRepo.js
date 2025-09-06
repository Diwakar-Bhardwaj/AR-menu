import Restaurant from '../models/Restaurant.js';

export async function getAll() {
  return await Restaurant.find().sort({ createdAt: -1 });
}

export async function getBySlug(slug) {
  return await Restaurant.findOne({ slug });
}

export async function create(restaurantData) {
  const restaurant = new Restaurant(restaurantData);
  return await restaurant.save();
}

export async function existsBySlug(slug) {
  const count = await Restaurant.countDocuments({ slug });
  return count > 0;
}



