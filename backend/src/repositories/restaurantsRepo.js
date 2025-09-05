import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'restaurants.json');

function ensureStore() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, JSON.stringify({ restaurants: [] }, null, 2));
}

export function getAll() {
  ensureStore();
  const raw = fs.readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(raw).restaurants;
}

export function getBySlug(slug) {
  return getAll().find(r => r.slug === slug);
}

export function create(restaurant) {
  ensureStore();
  const db = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  db.restaurants.push(restaurant);
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
  return restaurant;
}

export function existsBySlug(slug) {
  return !!getBySlug(slug);
}


