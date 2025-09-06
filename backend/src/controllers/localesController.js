import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { batchTranslate } from '../utils/translator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_PATH = path.join(__dirname, '../../data/source/en.json');
const TRANSLATIONS_DIR = path.join(__dirname, '../../data/translations');

async function ensureTranslationsDir() {
  try { await fs.mkdir(TRANSLATIONS_DIR, { recursive: true }); } catch (e) {}
}
function getDoNotTranslateKeys(source) {
  return source._doNotTranslate || [];
}

export const getLocale = async (req, res) => {
  const { lng } = req.params;
  const skipTranslate = req.query.skipTranslate === 'true';
  await ensureTranslationsDir();
  if (lng === 'en' || skipTranslate) {
    try {
      const enData = await fs.readFile(SOURCE_PATH, 'utf-8');
      const enJson = JSON.parse(enData);
      delete enJson._doNotTranslate;
      return res.json(enJson);
    } catch (err) {
      return res.status(500).json({ error: 'Failed to load English source.' });
    }
  }
  const translationPath = path.join(TRANSLATIONS_DIR, `${lng}.json`);
  try {
    const data = await fs.readFile(translationPath, 'utf-8');
    return res.json(JSON.parse(data));
  } catch (err) {
    try {
      const enData = await fs.readFile(SOURCE_PATH, 'utf-8');
      const enJson = JSON.parse(enData);
      const doNotTranslate = getDoNotTranslateKeys(enJson);
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
      return res.json(result);
    } catch (err2) {
      return res.status(500).json({ error: 'Failed to generate translation.' });
    }
  }
};

export const editLocale = async (req, res) => {
  const { lng } = req.params;
  const { key, value } = req.body;
  if (!key || typeof value !== 'string') {
    return res.status(400).json({ error: 'Missing key or value.' });
  }
  await ensureTranslationsDir();
  const translationPath = path.join(TRANSLATIONS_DIR, `${lng}.json`);
  let translations = {};
  try {
    const data = await fs.readFile(translationPath, 'utf-8');
    translations = JSON.parse(data);
  } catch (err) {}
  translations[key] = value;
  await fs.writeFile(translationPath, JSON.stringify(translations, null, 2), 'utf-8');
  res.json({ success: true, translations });
};
