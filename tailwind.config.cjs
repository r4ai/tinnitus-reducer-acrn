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
  daisyui: {
    themes: ["light", "dark"],
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
};
