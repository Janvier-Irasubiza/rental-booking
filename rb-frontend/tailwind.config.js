/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#9333EA',
        accent: '#EC4899',
        background: '#F9FAFB',
        textPrimary: '#1F2937',
        textSecondary: '#6B7280',
      },
    },
  },
  plugins: [],
}

