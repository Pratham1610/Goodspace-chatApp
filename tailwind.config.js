/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundImage: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
  
}

