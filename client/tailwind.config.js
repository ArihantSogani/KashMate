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
      },
      animation: {
        'background-pan': 'backgroundPan 15s ease infinite',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        backgroundPan: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-150px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    }
  },
  plugins: [],
}