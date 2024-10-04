/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'base-green': '#317023',
        'hover-green': '#b2a741',
        'hover-gold': '#dbc76f',
        'base-brown': '#613a12',
      },
      height: {
        'screen-minus-nav': 'calc(100vh - 2.5rem)',
      }
    },
  },
  plugins: [],
}

