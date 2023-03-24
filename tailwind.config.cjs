/* eslint-disable no-undef */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,html}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        center: "1fr auto 1fr",
      },
      gridTemplateRows: {
        main: "1fr auto 1fr",
      },
    },
  },
  darkMode: "class",
  plugins: [require("daisyui")],
};
