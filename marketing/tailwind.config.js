/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: '#401D6C',
        pink: '#EC385D',
        peach: '#FF8073',
      },
    },
  },
  plugins: [],
}