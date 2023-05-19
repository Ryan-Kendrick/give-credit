/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './client/components/*.tsx',
    './public/index.html',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: 'fort-bold',
        subheading: 'fort-book',
        medium: 'mark-medium',
        bold: 'mark-bold',
        xbold: 'mark-black',
      },
      spacing: {
        128: '32rem',
      },
      borderRadius: {
        inner: '.58rem',
      },
    },
  },
  corePlugins: {},
  plugins: [require('flowbite/plugin')],
}
