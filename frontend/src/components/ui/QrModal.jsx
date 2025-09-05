import React, { useState } from 'react';

const QrModal = ({ isOpen, onClose }) => {
  const [websiteUrl, setWebsiteUrl] = useState('https://example.com');
  const [restaurantId, setRestaurantId] = useState('resto-123');
  const [tableNumber, setTableNumber] = useState('1');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const generateQr = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setQrDataUrl('');
    try {
      const res = await fetch('http://localhost:4000/api/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ websiteUrl, restaurantId, tableNumber })
      });
      if (!res.ok) throw new Error('Request failed');
      const json = await res.json();
      setQrDataUrl(json.dataUrl);
    } catch (err) {
      setError('Failed to generate QR. Is backend running on port 4000?');
    } finally {
      setLoading(false);
    }
  };

  const downloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `qr-${restaurantId}-t${tableNumber}.png`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative animate-fade-in-down">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-orange-600 text-center">Generate Table QR</h2>
        <form onSubmit={generateQr} className="flex flex-col gap-3">
          <div>
            <label className="block text-gray-700 mb-1">Website URL</label>
            <input value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Restaurant ID</label>
            <input value={restaurantId} onChange={e => setRestaurantId(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none" />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Table Number</label>
            <input value={tableNumber} onChange={e => setTableNumber(e.target.value)} required className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none" />
          </div>
          <button type="submit" className="bg-orange-500 text-white font-bold py-2 rounded-lg shadow hover:bg-orange-600 transition" disabled={loading}>
            {loading ? 'Generating...' : 'Generate QR'}
          </button>
        </form>
        {error && <div className="mt-3 text-red-500 text-sm text-center">{error}</div>}
        {qrDataUrl && (
          <div className="mt-4 flex flex-col items-center gap-2">
            <img src={qrDataUrl} alt="QR" className="w-48 h-48" />
            <button onClick={downloadQr} className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-600 transition">
              Download PNG
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QrModal;


