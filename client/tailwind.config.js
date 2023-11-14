/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#131324",
        "light-blue": "#4e0eff",
        "solid-purple": "#997af0",
      },
      backgroundColor: {
        "dark-blue": "#131324",
        "light-blue": "#4e0eff",
        "solid-purple": "#997af0",
      },
    },
  },
  plugins: [],
};
