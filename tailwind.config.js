/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{html,js,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6243F8",
        colorPrimary: "#6243F8",
        orangePrimary:"#F2994A",
        yellowPrimary:"#F2C94C",
        greenPrimary:"#6FCF97",
        skyPrimary:"#56CCF2"
      },
      backgroundImage: {
        'gradient-purple': 'linear-gradient(to bottom, #A997FB, #6243F8)',
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}