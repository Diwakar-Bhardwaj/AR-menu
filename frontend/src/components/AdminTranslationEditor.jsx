import React, { useState } from 'react';
import axios from 'axios';

export default function AdminTranslationEditor({ lng }) {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    try {
      await axios.post(`/api/locales/${lng}/edit`, { key, value });
      setStatus('Saved!');
    } catch (err) {
      setStatus('Error saving');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
      <h3>Edit Translation</h3>
      <input
        placeholder="Key (e.g. menu.pizza)"
        value={key}
        onChange={e => setKey(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        placeholder="New Value"
        value={value}
        onChange={e => setValue(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <button type="submit">Save</button>
      <span style={{ marginLeft: 8 }}>{status}</span>
    </form>
  );
}
