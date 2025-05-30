/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1E2A78',     // Lacivert
        accent: '#F4C1D9',      // Açık pembe
        background: '#FFFFFF',  // Beyaz
        dark: '#121212',        // Koyu siyah
        neutral: '#B0B0B0',     // Gri
      },
    },
  },
}
