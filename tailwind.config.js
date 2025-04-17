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
        'grey-50':   '#F8F9FA',
        'grey-700':  '#4a4a4a',
        'grey-800':  '#3a3a3a',
        'grey-border':'#ccc',
        'neon-green':      '#39FF14',
        'neon-green/50':   'rgba(57,255,20,0.5)',
        'dark-bg':         '#111111',
        'white-light':     '#E5E5FF',
        'accent-red':      '#FF6666',
        'accent-red-dark': '#FF4D4D',
      },
      boxShadow: {
        'neon': '0 0 10px rgba(57,255,20,0.3)',
        'neon-xl': '0 0 20px rgba(57,255,20,0.5)',
      },
    },
  },
  plugins: [],
}