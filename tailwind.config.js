/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "primary": "#5CB823",
      "secondary": "#4D7D2F",
      "tertiary": "#045A5B",
      "quaternary": "#043A39",
    },
    extend: {
      fontFamily: {
        "inter": ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
