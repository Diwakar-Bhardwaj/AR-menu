import React from 'react';

export default function MenuSearch({ value, onChange, placeholder = 'Search menu...' }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none text-sm w-full max-w-xs"
      aria-label={placeholder}
    />
  );
}

