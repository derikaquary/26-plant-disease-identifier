/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        tips1: "url('/caring_plants.jpeg')",
        tips2: "url('/caring_plants2.jpeg')",
        tips3: "url('/plant_disease.jpeg')",
      },
    },
  },

  plugins: [],
};
