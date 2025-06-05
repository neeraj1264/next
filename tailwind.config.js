/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "small-font": "0.9rem", // Custom font size
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["var(--font-lora)", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        lightYellow: "rgb(255, 253, 169)",
        lightpink: "rgba(245, 223, 237, 1)",
        primary: "#2A5C85",
        secondary: "#6BAED9",
        accent: "#FFB347",
        pink: "#CB519E",
        light: "rgb(249, 250, 251)",
        paragraph: "#707070",
        black: "#363636",
        white: "#f7f7f7"
      },
      boxShadow: {
        custom: "0 4px 9px rgba(202, 87, 159, 0.2)",
      },
    },
  },
  plugins: [],
};
