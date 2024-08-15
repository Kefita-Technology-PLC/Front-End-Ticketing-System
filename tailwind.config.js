module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "custom-pink": "#1D8A99",
        "custom-blue": "#",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
