/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  
  theme: {
    extend: {
     colors: {
      primary:"#f97316",
      secondary:"#64748b"
     },
  
    },
  },
  plugins: [],
}

