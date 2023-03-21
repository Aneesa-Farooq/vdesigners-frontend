/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        white: "#ffffff",
          Green: "#20c997",
        mediumPink: "#F3677F",
        LightPink: "rgba(243, 55, 86, 0.25)",
        grey: "rgb(74,77,81)",
        lightgrey: "#F4F6F9",
        borderColor: "rgba(0, 0, 0, 0.1)",
        "border-color-focus": "rgba(234, 76, 137, 0.4)",
        blackModal: "rgba(0, 0, 0, 0.3)",
        textGrey: "rgba(74,77,81,0.75)",
        red: "#FF0000",
        // background: "#F3F0F9",
        background: "#f3f4f6",
        navIcons: "#A2A5B9",
        lightBlack: "#42424a",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
