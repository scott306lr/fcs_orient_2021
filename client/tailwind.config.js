module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cusorange: {
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FFFFFF',
          400: '#EDEAE5',
          500: '#D8D1C7',
          600: '#C3B8A9',
          700: '#AEA08B',
          800: '#99876D',
          900: '#7C6D57',
        },
      }
    },
  },
  variants: { 
    extend: {}, 
  },
  plugins: [],
}
