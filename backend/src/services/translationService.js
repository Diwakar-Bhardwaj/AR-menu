import { batchTranslate } from '../utils/translator.js';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_PATH = path.join(__dirname, '../../data/source/en.json');
const TRANSLATIONS_DIR = path.join(__dirname, '../../data/translations');

export class TranslationService {
  static async ensureTranslationsDir() {
    try { 
      await fs.mkdir(TRANSLATIONS_DIR, { recursive: true }); 
    } catch (e) {}
  }

  static getDoNotTranslateKeys(source) {
    return source._doNotTranslate || [];
  }

  static async getLocale(lng, skipTranslate = false) {
    await this.ensureTranslationsDir();
    
    if (lng === 'en' || skipTranslate) {
      try {
        const enData = await fs.readFile(SOURCE_PATH, 'utf-8');
        const enJson = JSON.parse(enData);
        delete enJson._doNotTranslate;
        return enJson;
      } catch (err) {
        throw new Error('Failed to load English source.');
      }
    }

    const translationPath = path.join(TRANSLATIONS_DIR, `${lng}.json`);
    
    try {
      const data = await fs.readFile(translationPath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      // Generate translation
      try {
        const enData = await fs.readFile(SOURCE_PATH, 'utf-8');
        const enJson = JSON.parse(enData);
        const doNotTranslate = this.getDoNotTranslateKeys(enJson);
        const keys = Object.keys(enJson).filter(k => k !== '_doNotTranslate');
        const toTranslate = keys.filter(k => !doNotTranslate.includes(k));
        
        const translations = await batchTranslate(
          toTranslate.map(k => enJson[k]),
          'en',
          lng
        );
        
        const result = {};
        keys.forEach(k => {
          if (doNotTranslate.includes(k)) {
            result[k] = enJson[k];
          } else {
            const idx = toTranslate.indexOf(k);
            result[k] = translations[idx];
          }
        });
        
        await fs.writeFile(translationPath, JSON.stringify(result, null, 2), 'utf-8');
        return result;
      } catch (err2) {
        throw new Error('Failed to generate translation.');
      }
    }
  }

  static async editLocale(lng, key, value) {
    if (!key || typeof value !== 'string') {
      throw new Error('Missing key or value.');
    }
    
    await this.ensureTranslationsDir();
    const translationPath = path.join(TRANSLATIONS_DIR, `${lng}.json`);
    let translations = {};
    
    try {
      const data = await fs.readFile(translationPath, 'utf-8');
      translations = JSON.parse(data);
    } catch (err) {}
    
    translations[key] = value;
    await fs.writeFile(translationPath, JSON.stringify(translations, null, 2), 'utf-8');
    return translations;
  }
}
