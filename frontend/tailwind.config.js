 /** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          600: "#5046e4",
          200: "#e0e7ff",
          400: "#5750be",
          100: "#d5d4f6",
          500: "#534be2"
        },
        white: {
          800: "#ffffff",
          700: "#f9fbfc"
        },
        gray: {
          100: "#b1b5b8",
          300: "#62666e"
        }
      }
    },
  },
  plugins: [],
}