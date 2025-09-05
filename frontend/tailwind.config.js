/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5fbff',
          100: '#e6f4ff',
          200: '#cde8ff',
          300: '#a7d4ff',
          400: '#78b9ff',
          500: '#4a9aff',
          600: '#2f79f2',
          700: '#235fd1',
          800: '#214ea6',
          900: '#1f437f',
        }
      }
    },
  },
  plugins: [],
}
