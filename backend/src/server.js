import express from 'express';
import cors from 'cors';
import qrRouter from './routes/qr.js';
import restaurantsRouter from './routes/restaurants.js';
import localesRouter from './routes/locales.js';
import menuRouter from './routes/menu.js';
import connectDB from './config/database.js';
import { config } from './config/env.js';
import { logger } from './middleware/logger.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger);

// Connect to MongoDB
connectDB();

// Routes
app.get('/health', (req, res) => res.json({ ok: true }));

// Test menu endpoint
app.get('/api/test-menu/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const MenuItem = (await import('./models/MenuItem.js')).default;
    const menuItems = await MenuItem.find({ restaurantId });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.use('/api/qr', qrRouter);
app.use('/api/locales', localesRouter);
app.use('/api/menu', menuRouter);
app.use('/api/restaurants', restaurantsRouter);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Backend running on http://localhost:${config.PORT}`);
  console.log(`Environment: ${config.NODE_ENV}`);
});


