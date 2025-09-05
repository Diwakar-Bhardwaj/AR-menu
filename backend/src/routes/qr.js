import { Router } from 'express';
import { generateQrPngDataUrl } from '../services/qrService.js';

const router = Router();

// POST /api/qr
// body: { websiteUrl: string, restaurantId: string, tableNumber: string|number }
router.post('/', async (req, res) => {
  try {
    const { websiteUrl, restaurantId, tableNumber } = req.body || {};
    if (!websiteUrl || !restaurantId || !tableNumber) {
      return res.status(400).json({ error: 'websiteUrl, restaurantId, and tableNumber are required' });
    }

    const payload = {
      websiteUrl,
      restaurantId,
      tableNumber
    };

    const dataUrl = await generateQrPngDataUrl(JSON.stringify(payload));
    return res.json({ dataUrl, payload });
  } catch (err) {
    console.error('QR generation error:', err);
    return res.status(500).json({ error: 'Failed to generate QR' });
  }
});

export default router;


