/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#EFE7DC',
      },
      fontFamily: {
        'plex': ['"IBM Plex Sans"', 'sans-serif'], // Agregamos la fuente IBM Plex Sans
      },
    },
  },
  plugins: [],
}
