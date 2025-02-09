/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['Dancing Script', 'cursive'],
        playfair: ['Playfair Display', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      colors: {
        romance: {
          100: '#fff1f2',
          200: '#ffe4e6',
          300: '#fecdd3',
          400: '#fda4af',
          500: '#ff758c',
          600: '#ff7eb3',
          700: '#b666d2',
        },
      },
    },
  },
  plugins: [],
};
