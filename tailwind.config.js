/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'aaa-orange': '#e67e22',
        'aaa-gray': '#2c3e50',
        'aaa-white': '#ffffff',
      },
    },
  },
  plugins: [],
};
