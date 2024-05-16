/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors:{
        "primaryColor":"#008489",
        "primaryDarkColor":"#002729",
        "primaryTint":"#00c9d1",
        "bg-200":"#e8e5d8",
        "bg-300":"#F0EEE5",
        "bgaccent":"#9BBABB",
        "font-color-100": "#0f0f0d",
        "font-color-200":"#2b281d",
        "font-color-300":"#3f3c2e",
        "font-accent":"#4D4733",
        "bg-minimal":"hsl(46 28.3% 82% / 1)",
        "darkWithBrown" :"#342b32",
        "olivGreen":"#31352E",
        "oliv": "#778A35",
        "sageGreen" : "#D1E2C4"
      }
    },
    
  },
  plugins: [],
}

