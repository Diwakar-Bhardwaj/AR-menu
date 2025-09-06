import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'fr', label: 'French' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language);
  const handleChange = (code) => {
    i18n.changeLanguage(code).then(() => {
      localStorage.setItem('i18nextLng', code);
      setSelected(code); // force re-render
    });
  };
  return (
    <div style={{ margin: '1rem 0' }}>
      {languages.map(lang => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          disabled={selected === lang.code}
          style={{ marginRight: 8 }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
