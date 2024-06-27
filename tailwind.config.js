/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#5CB823",
      secondary: "#4D7D2F",
      tertiary: "#045A5B",
      quaternary: "#043A39",
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "skewed-gradient": "linear-gradient(10deg, #398A31 0%, #65B40F 100%)",
      },
    },
  },
  plugins: [],
};
