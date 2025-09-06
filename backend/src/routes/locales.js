import { Router } from 'express';
import { TranslationController } from '../controllers/translationController.js';

const router = Router();

// GET /api/locales/:lng
router.get('/:lng', TranslationController.getLocale);

// POST /api/locales/:lng/edit
router.post('/:lng/edit', TranslationController.editLocale);

export default router;
