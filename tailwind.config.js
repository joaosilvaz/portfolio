// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        mdplus: '760px',
        xlmid: '1300px',
        xlcustom: '1000px',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(90deg, #945dd6, #6978d1 55%, #13adc7)',
        'card': 'linear-gradient(90deg, #a97ee3, #8595e0 55%, #3cc4d8)',
        'gradient-light': 'linear-gradient(90deg, #a97ee3, #8595e0 55%, #3cc4d8)',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('dark', '&:is(.dark *)') // suporte mais flexível ao dark:
    }),
  ],
}
