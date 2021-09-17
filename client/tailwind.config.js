module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: { // https://www.tailwindshades.com/
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
        cusblue: {
          50: '#F5F7F8',
          100: '#E6EAED',
          200: '#C8D2D8',
          300: '#AAB9C3',
          400: '#8CA1AE',
          500: '#6E8899',
          600: '#586E7C',
          700: '#42535F',
          800: '#2D3941',
          900: '#181F23',
        },
        cusgreen: {
          50: '#E1EFB4',
          100: '#D9EB9F',
          200: '#C9E275',
          300: '#B8D94B',
          400: '#A2C72A',
          500: '#809D21',
          600: '#5E7318',
          700: '#3B490F',
          800: '#191F06',
          900: '#000000',
        },
        cusyellow: {
          50: '#FBF2E1',
          100: '#F8E8CB',
          200: '#F2D39E',
          300: '#ECBF71',
          400: '#E6AB44',
          500: '#DA951D',
          600: '#AD7617',
          700: '#805711',
          800: '#53390B',
          900: '#261A05',
        },
      }
    },
  },
  // height: theme => ({
  //   auto: 'auto',
  //   ...theme('spacing'),
  //   full: '100%',
  //   screen: 'calc(var(--vh) * 100)',
  // }),
  // minHeight: theme => ({
  //   '0': '0',
  //   ...theme('spacing'),
  //   full: '100%',
  //   screen: 'calc(var(--vh) * 100)',
  // }),
  variants: { 
    extend: {}, 
  },
  plugins: [],
}
