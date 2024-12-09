/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "2rem",
        },
        screens: {
          xs: "360px", // Custom extra small breakpoint
          sm: "360px",
          md: "768px",
          lg: "1024px",
          xl: "1280px",
          "2xl": "1790px",
        },
      },
    },
  },
  plugins: [],
};
