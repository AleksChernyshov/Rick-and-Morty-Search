/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ["'Press Start 2P'", 'cursive'],
        'vt323': ["'VT323'", 'monospace'],
      },
      colors: {
        'blue-accent': '#00BFFF',
        'grey-700': '#4a4a4a',
        'grey-800': '#3a3a3a',
        'grey-50': '#F8F9FA',
        'grey-border': '#ccc',
      },
    },
  },
  plugins: [],
}