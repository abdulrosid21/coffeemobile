/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './screens/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'poppins-black': ['Poppins-Black', 'sans-serif'],
        'poppins-reguler': ['Poppins-Reguler', 'sans-serif'],
        'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
        'poppins-bold': ['Poppins-Bold', 'sans-serif'],
      },
    },
    colors: {
      brown: '#6A4029',
      black: '#000000',
      white: '#ffffff',
      yellow: '#FFBA33',
    },
    backgroundImage: {
      banner: "url('./assets/images/wellcome.png')",
    },
  },
  plugins: [],
};
