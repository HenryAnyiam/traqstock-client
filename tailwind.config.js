/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      textColor: {
        'base-green': '#317023',
        'hover-green': '#b2a741',
        'hover-gold': '#dbc76f'
      },
      backgroundColor: {
        'base-brown': '#613a12',
        'hover-gold': '#dbc76f',
      }
    },
  },
  plugins: [],
}

