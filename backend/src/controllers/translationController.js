import { TranslationService } from '../services/translationService.js';

export class TranslationController {
  static async getLocale(req, res) {
    try {
      const { lng } = req.params;
      const skipTranslate = req.query.skipTranslate === 'true';
      
      const translations = await TranslationService.getLocale(lng, skipTranslate);
      return res.json(translations);
    } catch (error) {
      console.error('Error getting locale:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async editLocale(req, res) {
    try {
      const { lng } = req.params;
      const { key, value } = req.body;
      
      const translations = await TranslationService.editLocale(lng, key, value);
      return res.json({ success: true, translations });
    } catch (error) {
      console.error('Error editing locale:', error);
      return res.status(400).json({ error: error.message });
    }
  }
}





