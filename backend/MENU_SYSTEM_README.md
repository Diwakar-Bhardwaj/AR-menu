# Menu Management System

## Overview
Complete menu management system with database storage, linking menus to specific restaurants. Each restaurant has its own unique menu items.

## Database Schema

### Restaurant Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  owner: String (required),
  email: String (required, unique),
  phone: String (required),
  address: String (required),
  city: String (required),
  cuisine: String (required),
  slug: String (required, unique),
  createdAt: Date,
  updatedAt: Date
}
```

### MenuItem Model
```javascript
{
  _id: ObjectId,
  restaurantId: ObjectId (ref: Restaurant, required),
  name: String (required),
  price: String (required),
  review: String (required),
  image: String (default: ''),
  category: String (default: 'Main Course'),
  isAvailable: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

## API Endpoints

### Restaurant Management
- `POST /api/restaurants` - Create new restaurant
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:slug` - Get restaurant by slug

### Menu Management
- `GET /api/restaurants/:restaurantId/menu` - Get all menu items for a restaurant
- `POST /api/restaurants/:restaurantId/menu` - Create new menu item
- `GET /api/menu/:menuItemId` - Get specific menu item
- `PUT /api/menu/:menuItemId` - Update menu item
- `DELETE /api/menu/:menuItemId` - Delete menu item
- `GET /api/restaurants/:restaurantId/menu/search?q=term` - Search menu items
- `PATCH /api/menu/:menuItemId/toggle` - Toggle availability

## Frontend Integration

### MenuContext Provider
```jsx
import { MenuProvider } from './context/MenuContext';

<MenuProvider restaurantId="restaurant_id_here">
  <Restaurant />
</MenuProvider>
```

### Usage in Components
```jsx
import { useMenu } from '../context/MenuContext';

const { 
  menuItems, 
  loading, 
  error, 
  addMenuItem, 
  updateMenuItem, 
  deleteMenuItem, 
  searchMenuItems 
} = useMenu();
```

## Features

### ✅ Restaurant-Specific Menus
- Each restaurant has its own unique menu
- Menu items are linked to restaurant via `restaurantId`
- No cross-restaurant data mixing

### ✅ Complete CRUD Operations
- Create menu items with validation
- Read menu items with filtering
- Update menu items with error handling
- Delete menu items with confirmation

### ✅ Advanced Search
- Search by name, price, review, or category
- Real-time search results
- Case-insensitive matching

### ✅ Category Management
- Menu items can be categorized
- Default category: "Main Course"
- Custom categories supported

### ✅ Image Management
- Image upload support
- Fallback to Unsplash images
- Image preview in forms

### ✅ Availability Toggle
- Mark items as available/unavailable
- API endpoint for toggling status

## Code Organization

### Backend Structure
```
src/
├── config/
│   ├── database.js      # MongoDB connection
│   └── env.js          # Environment config
├── controllers/
│   ├── restaurantController.js
│   ├── menuController.js
│   ├── translationController.js
│   └── qrController.js
├── middleware/
│   ├── errorHandler.js
│   └── logger.js
├── models/
│   ├── Restaurant.js
│   └── MenuItem.js
├── routes/
│   ├── restaurants.js
│   ├── menu.js
│   ├── locales.js
│   └── qr.js
├── services/
│   ├── restaurantService.js
│   ├── menuService.js
│   ├── translationService.js
│   └── qrService.js
└── utils/
    └── translator.js
```

### Frontend Structure
```
src/
├── components/
│   └── ui/
│       └── MenuSearch.jsx
├── context/
│   └── MenuContext.jsx
├── services/
│   └── menuService.js
└── pages/
    └── Restaurant.jsx
```

## Usage Examples

### Creating a Menu Item
```javascript
const menuItemData = {
  name: "Margherita Pizza",
  price: "$12.99",
  review: "Classic Italian pizza with fresh basil",
  image: "https://example.com/pizza.jpg",
  category: "Main Course"
};

await addMenuItem(menuItemData);
```

### Searching Menu Items
```javascript
// Search by any field
await searchMenuItems("pizza");
await searchMenuItems("$12");
await searchMenuItems("Italian");
```

### Updating a Menu Item
```javascript
const updateData = {
  name: "Margherita Pizza Deluxe",
  price: "$14.99"
};

await updateMenuItem(menuItemId, updateData);
```

## Error Handling

### Backend
- Global error handler middleware
- Validation error responses
- Database error handling
- Proper HTTP status codes

### Frontend
- Try-catch blocks for all API calls
- User-friendly error messages
- Loading states
- Error boundaries

## Performance Optimizations

### Database
- Indexed fields for faster queries
- Efficient aggregation pipelines
- Connection pooling

### Frontend
- Context-based state management
- Optimistic updates
- Debounced search
- Image lazy loading

## Security Features

- Input validation
- SQL injection prevention (MongoDB)
- CORS configuration
- Error message sanitization

## Testing

### Backend Testing
```bash
# Test restaurant creation
curl -X POST http://localhost:4000/api/restaurants \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Restaurant","owner":"John Doe","email":"john@test.com","phone":"123-456-7890","address":"123 Main St","city":"Test City","cuisine":"Italian"}'

# Test menu item creation
curl -X POST http://localhost:4000/api/restaurants/RESTAURANT_ID/menu \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Pizza","price":"$10.99","review":"Great pizza","category":"Main Course"}'
```

### Frontend Testing
- Test menu item CRUD operations
- Test search functionality
- Test form validation
- Test error handling

## Deployment Notes

1. **Environment Variables**
   ```env
   MONGO_URI=mongodb://localhost:27017/ar-menu
   PORT=4000
   NODE_ENV=production
   ```

2. **Database Setup**
   - Install MongoDB
   - Create database
   - Set up indexes for performance

3. **Frontend Build**
   ```bash
   npm run build
   ```

## Future Enhancements

- [ ] Menu item ordering/positioning
- [ ] Bulk operations (import/export)
- [ ] Menu analytics
- [ ] Image optimization
- [ ] Caching layer
- [ ] Real-time updates
- [ ] Menu templates
- [ ] Nutritional information
- [ ] Allergen information
- [ ] Menu versioning





