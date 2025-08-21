/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}' ],
  darkMode: 'class',
  presets: [ require('nativewind/preset') ],
  theme: {
    extend: {
      fontFamily: {
        silkscreen: [ "Silkscreen_400Regular" ],
        silk: [ "Silkscreen_400Regular" ],
        jac: [ "Jacquard24_400Regular" ],
      },
    },
  },
  plugins: [],
};
