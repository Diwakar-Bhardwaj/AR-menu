import { Router } from 'express';
import { QRController } from '../controllers/qrController.js';

const router = Router();

// POST /api/qr
// body: { websiteUrl: string, restaurantId: string, tableNumber: string|number }
router.post('/', QRController.generateQR);

export default router;



