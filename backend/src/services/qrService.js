import QRCode from 'qrcode';

export class QRService {
  static async generateQRCode(text, options = {}) {
    const defaultOptions = {
      errorCorrectionLevel: 'M',
      scale: 8,
      margin: 2,
      type: 'image/png'
    };

    return await QRCode.toDataURL(text, { ...defaultOptions, ...options });
  }

  static async generateQRCodeBuffer(text, options = {}) {
    const defaultOptions = {
      errorCorrectionLevel: 'M',
      scale: 8,
      margin: 2
    };

    return await QRCode.toBuffer(text, { ...defaultOptions, ...options });
  }
}