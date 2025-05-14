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
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('dark', '&:is(.dark *)') // suporte mais flexível ao dark:
    }),
  ],
}
