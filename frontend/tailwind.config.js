/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  
  theme: {
  extend: {
  animation: {
    'spin-slow': 'spin 40s linear infinite',
    'spin-reverse': 'spin-reverse 60s linear infinite',
    'float-slow': 'float 6s ease-in-out infinite',
    'float-medium': 'float 4s ease-in-out infinite',
    'pulse-slow': 'pulse 3s ease-in-out infinite',
  },
  keyframes: {
    'spin-reverse': {
      '0%': { transform: 'rotate(360deg)' },
      '100%': { transform: 'rotate(0deg)' },
    },
    float: {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-20px)' },
    },
  },
}
  },
  plugins: [],
}

