/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}' ],

  presets: [ require('nativewind/preset') ],
  theme: {
    extend: {
      fontFamily: {
        silkscreen: [ "Silkscreen_400Regular" ],
      },
    },
  },
  plugins: [],
};
