/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primaryColor":"#008489",
        "primaryDarkColor":"#002729",
        "primaryTint":"#329ca0",
        "mybg":"#D9D9D9",
        "bgaccent":"#9BBABB"
      }
    },
    
  },
  plugins: [],
}

