/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A1A2F',
          light: '#162A44',
          dark: '#050D18',
        },
        ice: {
          DEFAULT: '#3AAFA9',
          light: '#DEF2F1',
          dark: '#2B7A78',
        },
        neutral: {
          offwhite: '#F4F4F4',
          coolgray: '#A1A1A1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}