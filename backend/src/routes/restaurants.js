import { Router } from 'express';
import { toSlug } from '../services/slugService.js';
import { create, getBySlug, existsBySlug } from '../repositories/restaurantsRepo.js';

const router = Router();

// POST /api/restaurants
router.post('/', (req, res) => {
  const { name, owner, email, phone, address, city, cuisine, website } = req.body || {};
  if (!name || !owner || !email || !phone || !address || !city || !cuisine) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  let baseSlug = toSlug(name);
  if (!baseSlug) baseSlug = 'restaurant';
  let slug = baseSlug;
  let counter = 1;
  while (existsBySlug(slug)) {
    slug = `${baseSlug}-${counter++}`;
  }
  const restaurant = {
    id: `${Date.now()}`,
    slug,
    name,
    owner,
    email,
    phone,
    address,
    city,
    cuisine,
    website: website || ''
  };
  create(restaurant);
  return res.status(201).json(restaurant);
});

// GET /api/restaurants/:slug
router.get('/:slug', (req, res) => {
  const { slug } = req.params;
  const r = getBySlug(slug);
  if (!r) return res.status(404).json({ error: 'Not found' });
  return res.json(r);
});

export default router;


