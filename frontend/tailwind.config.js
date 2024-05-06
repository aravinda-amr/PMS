/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      white: "#ffffff",
      black: "#000000",
      box: "#CCCCCC",

      "dark-blue": "#2152A4 ",
      "dark-blue-2": "#2152A4  ",
      "blue-button": "#25456A",
      "light-blue": "#F5F5F5",
      "text-blue": "#D2DFEF",

      signup1: "#4FAAE3",
      signup2: "#0B3047",

      login1: "#9AD59F",
      login2: "#1E4822",
      login3: "#52B75B",

      delete: "#A0153E",
      deleteH: "#D24545",

      update: "#C0D6E8",
      updateH: "#8BAACF",
      success: "#115D33",

      greenn: "#809e87",
    },
    fontFamily: {
      jakarta: ["Plus Jakarta Sans", "sans-serif"],
    },
    extend: {
      spacing: {
        128: "420px",
      },
      width: {
        custom: "32rem",
      },
      screens: {
        xl: "1920px",
      },
    },
  },
  plugins: [],
};
