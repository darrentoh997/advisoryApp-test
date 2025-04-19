/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#071952",
        secondary: "#ffffff",
      },
    },
    container: {
      padding: "2rem",
      "padding-top": "6rem",
      "padding-bottom": "6rem",
      center: true,
    },
  },
  plugins: [],
};
