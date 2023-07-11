/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  target:'ie11',
  theme: {
    colors: {
      primaryDark: "rgb(var(--primary-dark) / <alpha-value>)",
      secondaryDark: "rgb(var(--secondary-dark) / <alpha-value>)",
      primaryPink: "rgb(var(--primary-pink) / <alpha-value>)",
      primaryPurple: "rgb(var(--primary-purple) / <alpha-value>)",
      green: "rgb(var(--primary-green) / <alpha-value>)",
      secondaryGreen: "rgb(var(--secondary-green) / <alpha-value>)",
      white: "rgb(256 256 256 / <alpha-value>)",
    },

    extend: {
      height: {
        128: "44rem",
      },

      keyframes: {
        toastin: {
          "0%": { transform: "translateY(-1000px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },

      animation: {
        toastin: "toastin 1s ease-in-out ",
      },
    },
  },
  plugins: [],
};
