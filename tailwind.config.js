/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: {
  content: ["./src/**/*.{html,ts}"],
  // },
  safelist: [
    {
      pattern: /bg-(green|red|blue)-(400)/,
    },
  ],
  // darkMode: false,
  theme: {
    extend: { opacity: ["disabled"], backgroundColor: ["disabled"] },
  },
  plugins: [],
};
