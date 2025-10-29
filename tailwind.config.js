module.exports = {
  darkMode: "class", // <-- pakai 'class' supaya kita kontrol via .dark
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0ea5e9",
          dark: "#38bdf8",
        },
      },
    },
  },
  plugins: [],
};
