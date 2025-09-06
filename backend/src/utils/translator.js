import axios from 'axios';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const LIBRETRANSLATE_URL = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com';

async function googleTranslateBatch(texts, source, target) {
  const url = `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`;
  const body = { q: texts, source, target, format: 'text' };
  const { data } = await axios.post(url, body);
  return data.data.translations.map(t => t.translatedText);
}

async function libreTranslateBatch(texts, source, target) {
  const url = `${LIBRETRANSLATE_URL}/translate`;
  const results = [];
  for (const text of texts) {
    try {
      const { data } = await axios.post(url, { q: text, source, target, format: 'text' }, { headers: { 'accept': 'application/json' } });
      results.push(data.translatedText);
      await new Promise(r => setTimeout(r, 200));
    } catch (e) {
      results.push(text);
    }
  }
  return results;
}

export const batchTranslate = async function(texts, source, target) {
  if (!texts.length) return [];
  try {
    if (GOOGLE_API_KEY) {
      return await googleTranslateBatch(texts, source, target);
    } else {
      return await libreTranslateBatch(texts, source, target);
    }
  } catch (e) {
    return texts;
  }
};
