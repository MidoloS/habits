/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...require("tailwindcss/colors"),
      "slate-400": "#94A3B8",
    },
    fontFamily: {
      heading: ["Montserrat", "sans-serif"],
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
};
