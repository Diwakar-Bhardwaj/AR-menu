import { QRService } from '../services/qrService.js';

export class QRController {
  static async generateQR(req, res) {
    try {
      const { websiteUrl, restaurantId, tableNumber } = req.body || {};
      
      if (!websiteUrl || !restaurantId || !tableNumber) {
        return res.status(400).json({ 
          error: 'websiteUrl, restaurantId, and tableNumber are required' 
        });
      }

      const payload = {
        websiteUrl,
        restaurantId,
        tableNumber
      };

      const dataUrl = await QRService.generateQRCode(JSON.stringify(payload));
      return res.json({ dataUrl, payload });
    } catch (err) {
      console.error('QR generation error:', err);
      return res.status(500).json({ error: 'Failed to generate QR' });
    }
  }
}





