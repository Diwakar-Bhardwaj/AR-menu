import express from 'express';
import cors from 'cors';
import qrRouter from './routes/qr.js';
import restaurantsRouter from './routes/restaurants.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ ok: true }));
app.use('/api/qr', qrRouter);
app.use('/api/restaurants', restaurantsRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});


