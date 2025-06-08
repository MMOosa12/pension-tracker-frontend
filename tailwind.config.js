/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // scan all source files
  ],
  darkMode: 'class', // enables class-based dark mode
  theme: {
    extend: {
      colors: {
        purple: '#401D6C',
        pink: '#EC385D',
        peach: '#FF8073',
        tprgray: '#F4F4F5',
        dark: {
          bg: '#1F1F2E',
          card: '#2A2A3C',
          text: '#E4E4E7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
