# Database Connection Guide

This guide explains how to connect your AR Menu backend to various databases for production use.

## Current Setup
- **File-based storage**: JSON files in `data/` directory
- **Restaurants**: `data/restaurants.json`
- **Translations**: `data/translations/{lang}.json`

## Database Options

### 1. MongoDB (Recommended for NoSQL)

#### Installation
```bash
npm install mongoose
```

#### Connection Setup
Create `backend/src/db/mongodb.js`:
```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

#### Models
Create `backend/src/models/Restaurant.js`:
```javascript
import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  cuisine: { type: String, required: true },
  website: { type: String, default: '' },
  slug: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Restaurant', restaurantSchema);
```

Create `backend/src/models/Translation.js`:
```javascript
import mongoose from 'mongoose';

const translationSchema = new mongoose.Schema({
  language: { type: String, required: true },
  key: { type: String, required: true },
  value: { type: String, required: true },
  doNotTranslate: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Translation', translationSchema);
```

#### Environment Variables
Add to `.env`:
```env
MONGO_URI=mongodb://localhost:27017/ar-menu
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ar-menu
```

### 2. PostgreSQL (Recommended for SQL)

#### Installation
```bash
npm install pg
```

#### Connection Setup
Create `backend/src/db/postgresql.js`:
```javascript
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

export default pool;
```

#### Database Schema
Create `backend/sql/schema.sql`:
```sql
-- Restaurants table
CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  owner VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  cuisine VARCHAR(100) NOT NULL,
  website VARCHAR(255) DEFAULT '',
  slug VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Translations table
CREATE TABLE translations (
  id SERIAL PRIMARY KEY,
  language VARCHAR(10) NOT NULL,
  key VARCHAR(255) NOT NULL,
  value TEXT NOT NULL,
  do_not_translate BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(language, key)
);

-- Indexes for better performance
CREATE INDEX idx_restaurants_slug ON restaurants(slug);
CREATE INDEX idx_translations_lang_key ON translations(language, key);
```

#### Environment Variables
Add to `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ar_menu
DB_USER=your_username
DB_PASSWORD=your_password
```

### 3. MySQL

#### Installation
```bash
npm install mysql2
```

#### Connection Setup
Create `backend/src/db/mysql.js`:
```javascript
import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

export default connection;
```

## Migration Strategy

### Step 1: Choose Your Database
1. **MongoDB**: Best for flexible schemas, JSON-like data
2. **PostgreSQL**: Best for complex queries, ACID compliance
3. **MySQL**: Best for simple applications, wide hosting support

### Step 2: Update Repository Files

#### For MongoDB
Replace `backend/src/repositories/restaurantsRepo.js`:
```javascript
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
```

#### For PostgreSQL
```javascript
import pool from '../db/postgresql.js';

export async function getAll() {
  const result = await pool.query('SELECT * FROM restaurants ORDER BY created_at DESC');
  return result.rows;
}

export async function getBySlug(slug) {
  const result = await pool.query('SELECT * FROM restaurants WHERE slug = $1', [slug]);
  return result.rows[0] || null;
}

export async function create(restaurantData) {
  const { name, owner, email, phone, address, city, cuisine, website, slug } = restaurantData;
  const result = await pool.query(
    'INSERT INTO restaurants (name, owner, email, phone, address, city, cuisine, website, slug) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
    [name, owner, email, phone, address, city, cuisine, website, slug]
  );
  return result.rows[0];
}

export async function existsBySlug(slug) {
  const result = await pool.query('SELECT COUNT(*) FROM restaurants WHERE slug = $1', [slug]);
  return parseInt(result.rows[0].count) > 0;
}
```

### Step 3: Update Translation Controller

#### For MongoDB
```javascript
import Translation from '../models/Translation.js';

export const getLocale = async (req, res) => {
  const { lng } = req.params;
  const skipTranslate = req.query.skipTranslate === 'true';
  
  if (lng === 'en' || skipTranslate) {
    const translations = await Translation.find({ language: 'en' });
    const result = {};
    translations.forEach(t => {
      result[t.key] = t.value;
    });
    return res.json(result);
  }
  
  // Check if translations exist
  let translations = await Translation.find({ language: lng });
  
  if (translations.length === 0) {
    // Auto-generate translations
    const enTranslations = await Translation.find({ language: 'en' });
    const toTranslate = enTranslations.filter(t => !t.doNotTranslate);
    
    // Use your translation service here
    const translatedValues = await translator.batchTranslate(
      toTranslate.map(t => t.value),
      'en',
      lng
    );
    
    // Save new translations
    const newTranslations = toTranslate.map((t, idx) => ({
      language: lng,
      key: t.key,
      value: translatedValues[idx],
      doNotTranslate: t.doNotTranslate
    }));
    
    await Translation.insertMany(newTranslations);
    translations = await Translation.find({ language: lng });
  }
  
  const result = {};
  translations.forEach(t => {
    result[t.key] = t.value;
  });
  
  return res.json(result);
};
```

### Step 4: Data Migration Script

Create `backend/scripts/migrate-to-db.js`:
```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your database connection and models
import connectDB from '../src/db/mongodb.js'; // or postgresql.js
import Restaurant from '../src/models/Restaurant.js';
import Translation from '../src/models/Translation.js';

async function migrateData() {
  try {
    await connectDB();
    
    // Migrate restaurants
    const restaurantsPath = path.join(__dirname, '../data/restaurants.json');
    if (fs.existsSync(restaurantsPath)) {
      const restaurantsData = JSON.parse(fs.readFileSync(restaurantsPath, 'utf-8'));
      await Restaurant.insertMany(restaurantsData.restaurants);
      console.log('Restaurants migrated successfully');
    }
    
    // Migrate translations
    const translationsDir = path.join(__dirname, '../data/translations');
    if (fs.existsSync(translationsDir)) {
      const files = fs.readdirSync(translationsDir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const lang = file.replace('.json', '');
          const translationsData = JSON.parse(fs.readFileSync(path.join(translationsDir, file), 'utf-8'));
          
          const translations = Object.entries(translationsData).map(([key, value]) => ({
            language: lang,
            key,
            value,
            doNotTranslate: false
          }));
          
          await Translation.insertMany(translations);
          console.log(`Translations for ${lang} migrated successfully`);
        }
      }
    }
    
    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();
```

## Production Considerations

### 1. Connection Pooling
- **MongoDB**: Use connection pooling with mongoose
- **PostgreSQL**: Use pg-pool for connection management
- **MySQL**: Use mysql2 connection pooling

### 2. Environment Variables
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ar_menu
DB_USER=your_username
DB_PASSWORD=your_password

# MongoDB
MONGO_URI=mongodb://localhost:27017/ar-menu

# Redis (for caching)
REDIS_URL=redis://localhost:6379
```

### 3. Error Handling
- Implement proper error handling for database connections
- Add retry logic for failed connections
- Use transactions for critical operations

### 4. Performance
- Add database indexes for frequently queried fields
- Implement caching with Redis
- Use connection pooling
- Monitor query performance

## Quick Start Commands

### MongoDB
```bash
# Install
npm install mongoose

# Start MongoDB
mongod

# Run migration
node scripts/migrate-to-db.js
```

### PostgreSQL
```bash
# Install
npm install pg

# Create database
createdb ar_menu

# Run schema
psql ar_menu < sql/schema.sql

# Run migration
node scripts/migrate-to-db.js
```

### MySQL
```bash
# Install
npm install mysql2

# Create database
mysql -u root -p -e "CREATE DATABASE ar_menu;"

# Run schema
mysql -u root -p ar_menu < sql/schema.sql

# Run migration
node scripts/migrate-to-db.js
```

## Support

For database-specific issues:
- **MongoDB**: [Mongoose Documentation](https://mongoosejs.com/)
- **PostgreSQL**: [pg Documentation](https://node-postgres.com/)
- **MySQL**: [mysql2 Documentation](https://github.com/sidorares/node-mysql2)
