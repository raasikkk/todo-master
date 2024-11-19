/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
          xl: "10rem",
        },
        screens: {
          "2xl": "1790px",
        },
      },
    },
  },
  plugins: [],
};
