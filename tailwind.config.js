/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cinzel Decorative"', 'serif'],
        body: ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        ocean: {
          deepest: '#020b18',
          deep: '#051830',
          mid: '#0a2e52',
          surface: '#0d4d6e',
          teal: '#0d6e7a',
          foam: '#90E0EF',
        },
        ariel: {
          purple: '#9B59B6',
          tail: '#00B4D8',
          hair: '#CC2200',
        },
        gold: {
          DEFAULT: '#FFD700',
          light: '#FFDF80',
          pale: '#FFF8DC',
        },
        coral: '#FF6B6B',
        seaweed: '#0d7a58',
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'float-alt': 'float-alt 4s ease-in-out infinite',
        rise: 'rise 7s ease-in infinite',
        'shimmer-text': 'shimmer-text 2.5s linear infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        sway: 'sway 2.5s ease-in-out infinite',
        'modal-in': 'modal-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'light-ray': 'light-ray 4s ease-in-out infinite',
        'tap-hint': 'tap-hint 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-14px) rotate(-2deg)' },
          '66%': { transform: 'translateY(-8px) rotate(2deg)' },
        },
        'float-alt': {
          '0%, 100%': { transform: 'translateY(-8px) rotate(3deg)' },
          '50%': { transform: 'translateY(8px) rotate(-3deg)' },
        },
        rise: {
          '0%': { transform: 'translateY(0) scale(0.5)', opacity: '0' },
          '5%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-700px) scale(1.3)', opacity: '0' },
        },
        'shimmer-text': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(0, 230, 255, 0.4), 0 0 30px rgba(0, 180, 216, 0.2)',
          },
          '50%': {
            boxShadow:
              '0 0 30px rgba(0, 230, 255, 0.8), 0 0 60px rgba(0, 180, 216, 0.5), 0 0 90px rgba(155, 89, 182, 0.3)',
          },
        },
        sway: {
          '0%, 100%': { transform: 'skewX(5deg)', transformOrigin: 'bottom' },
          '50%': { transform: 'skewX(-5deg)', transformOrigin: 'bottom' },
        },
        'modal-in': {
          '0%': { transform: 'scale(0.7) translateY(30px)', opacity: '0' },
          '70%': { transform: 'scale(1.03) translateY(-3px)' },
          '100%': { transform: 'scale(1) translateY(0)', opacity: '1' },
        },
        'light-ray': {
          '0%, 100%': { opacity: '0.04' },
          '50%': { opacity: '0.1' },
        },
        'tap-hint': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.6' },
          '50%': { transform: 'scale(1.25)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
