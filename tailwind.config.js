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
        "sageGreen" : "#D1E2C4",
        "leafGreen":"#3a4f27",
        "leafBackground-200":"#eaeaea",
        "leafBackground-300":'#d7d7d6',
        "leafBackground-400":"#a8afa2",
        "leafGreenMinimal":"#718c5c",

      },
       scrollbar: {
        // Define your custom scrollbar styles
        DEFAULT: {
          thumb: 'bg-gray-700 rounded',
          track: 'bg-gray-200',
        },
        thin: {
          width: '2px',
          thumb: 'bg-blue-500 rounded',
          track: 'bg-gray-100',
        },
        'none': {
          'scrollbar-width': 'none', // Firefox
          '&::-webkit-scrollbar': {
            display: 'none', // Safari and Chrome
          },
        },
    },
  }
    
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar'),
    require('@tailwindcss/line-clamp'),
  ],
  daisyui: {
    themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

