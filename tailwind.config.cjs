/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,html}', './public/**/*.html'],
  theme: {
    extend: {
      colors: {
        watcher: {
          navy: '#0A0A40',
          deep: '#060624',
          blue: '#1DA9E4',
          cyan: '#38E1FF',
          red: '#FF1E2D',
          magenta: '#E600E6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Kufi Arabic', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Noto Naskh Arabic', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
