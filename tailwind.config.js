/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html",
   "./src/**/*.{ js, vue }"],
  theme: {
    extend: {
      fontFamily: {
        "garamond": ["Eb Garamond"],
        "roboto": ["Roboto"]
      }
    },
  },
  plugins: [],
}
