# Backend Translation Service

## Setup

1. Install dependencies:
   ```sh
   cd backend
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env` and set your keys:
     ```env
     GOOGLE_API_KEY=your_google_key_here
     LIBRETRANSLATE_URL=https://libretranslate.com
     ```
   - If no Google key, LibreTranslate will be used by default.

3. Run the server:
   ```sh
   npm run dev
   ```
   Server runs on port 5000 by default.

## Endpoints

- `GET /api/locales/:lng`  
  Returns translation JSON for requested language. If not cached, auto-generates and caches it. Query param `?skipTranslate=true` returns English source.

- `POST /api/locales/:lng/edit`  
  Body: `{ key, value }` — Updates a translation key for a language and saves to cache file.

## Data Structure

- Source English: `data/source/en.json`  
  Example keys: welcome, order, price, review, contact, menu.pizza, menu.burger, menu.mangoShake
  - `_doNotTranslate`: array of keys to never auto-translate (e.g., menu item names)
- Cached translations: `data/translations/{lang}.json`

## Tradeoffs & Recommendations

- **Auto-translation is best-effort:** Machine translation may be inaccurate, especially for menu items or brand names. Use `_doNotTranslate` to protect such keys.
- **Admin review:** After initial auto-translation, use the `/edit` endpoint (or admin UI) to correct translations. This ensures quality and cultural appropriateness.
- **No DB:** All translations are file-cached for simplicity and transparency.
- **Batching:** Google Translate batches requests; LibreTranslate is throttled to avoid rate limits.

## Workflow

1. Add/edit English keys in `data/source/en.json`.
2. Request `/api/locales/:lng` from frontend or browser. This will auto-generate and cache translations.
3. Review and correct translations using `/api/locales/:lng/edit` (see admin UI example in frontend docs).

---

For frontend integration and admin UI, see the main project README or frontend docs.

## Connecting to a Database (Optional)

This backend is file-based by default, but you can connect to a database (e.g., MongoDB, PostgreSQL, MySQL) if you want to store translations or source keys in a DB instead of JSON files.

### Steps to Connect to a Database

1. **Install a DB client library**
   - For MongoDB: `npm install mongoose`
   - For PostgreSQL: `npm install pg`
   - For MySQL: `npm install mysql2`

2. **Add DB connection code**
   - Create a new file, e.g., `backend/db.js`, to handle DB connection and export the client/connection.
   - Example for MongoDB:
     ```js
     // backend/db.js
     const mongoose = require('mongoose');
     mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
     module.exports = mongoose;
     ```
   - Add your DB URI to `.env` (e.g., `MONGO_URI=...`)

3. **Change where translations are read/written**
   - Update `controllers/localesController.js`:
     - Replace file read/write logic with DB queries (e.g., use Mongoose models or SQL queries).
     - For example, instead of reading/writing JSON files, fetch and update translations in your DB.
   - You may want to create a `models/Translation.js` (for MongoDB) or use a `translations` table (for SQL DBs).

4. **(Optional) Migrate existing data**
   - Write a script to import existing JSON translations into your DB.

### Where to Change Code
- **controllers/localesController.js**: Replace file system logic with DB logic for reading/writing translations.
- **data/source/en.json**: If you want to store source keys in DB, also update logic here.
- **.env**: Add your DB connection string.

---

If you need a specific DB example, let us know which DB you want to use!

## MongoDB Setup for Restaurant Registration

1. Install MongoDB locally and start the service.
2. In your backend/.env file, add:
   ```env
   MONGO_URI=mongodb://localhost:27017/ar-menu
   ```
3. Install mongoose in backend:
   ```sh
   npm install mongoose
   ```
4. Update backend/src/repositories/restaurantsRepo.js to use mongoose for CRUD operations.
5. The /api/restaurants endpoint will now store and fetch data from MongoDB.
