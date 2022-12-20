/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html",
  "./src/**/*.{js, vue}"],
  theme: {
    extend: {
      fontFamily: {
        'libre': ['Libre Bodoni'],
        'garamond': ['EB Garamond'],
        'bodoni': ['Bodoni Moda'],
        'oswald': ['Oswald']
      }
    },
  },
  plugins: [],
}
