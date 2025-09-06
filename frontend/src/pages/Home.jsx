import React from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div>
      <LanguageSwitcher />
      <h1>{t('welcome')}</h1>
      <button>{t('order')}</button>
      <div>{t('price')}: $10</div>
      <div>{t('review')}</div>
      <div>{t('contact')}</div>
      <h2>Menu</h2>
      <ul>
        <li>{t('menu.pizza')}</li>
        <li>{t('menu.burger')}</li>
        <li>{t('menu.mangoShake')}</li>
      </ul>
    </div>
  );
}
