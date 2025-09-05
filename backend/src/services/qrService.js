import QRCode from 'qrcode';

export async function generateQrPngDataUrl(text) {
  // Returns a data URL (PNG) that can be used directly in <img src="..." />
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: 'M',
    scale: 8,
    margin: 2,
    type: 'image/png'
  });
}


