/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        parchment: '#F8F6F0',
        warm: '#F2EFE8',
        ink: '#0A0908',
        'ink-mid': '#3D3B38',
        'ink-light': '#7A7773',
        gold: '#C4900A',
        border: '#E2DED6',
        'border-md': '#C8C4BC',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Helvetica Neue', 'Arial', 'sans-serif'],
      },
      maxWidth: { content: '1080px' },
    },
  },
  plugins: [],
};
