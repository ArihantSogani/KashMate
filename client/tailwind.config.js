/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        background: "#111827",
        surface: "#1f2937",
        primary: "#14b8a6",
        income: "#4ade80",
        expense: "#f87171",
        "on-surface": "#f9fafb",
        "on-surface-secondary": "#9ca3af"
      }
    }
  },
  plugins: [],
}