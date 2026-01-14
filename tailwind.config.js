/**
 * Tailwind configuration generated from PRD design tokens
 */
module.exports = {
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FBFAF6',
        primary: '#2E3D8B',
        accent: '#C94E54',
        footer: '#2E3D8B',
        'gray-text': '#4A5565',
        white: '#FFFFFF',
        'section-light': 'rgba(201,78,84,0.04)',
        stroke: '#D1D5DC',
        'footer-text': '#C9AA70',
      },
      fontFamily: {
        heading: ['"Averia Serif Libre"', 'serif'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      spacing: {
        'base-unit': '8px',
        'section-desktop': '96px',
        'section-mobile': '48px',
        'grid-gap': '32px',
      },
      borderRadius: {
        card: '10px',
        btn: '10px',
        pill: '100px',
      },
    },
  },
  plugins: [],
}
