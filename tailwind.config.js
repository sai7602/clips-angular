/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: false,
  theme: {
    extend: { opacity: ["disabled"], backgroundColor: ["disabled"] },
  },
  plugins: [],
};
