// tailwind.config.js

// No need for TypeScript type imports or annotations in a .js file
// import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,jsx,mdx}', // Changed 'ts' and 'tsx' to 'jsx'
    './components/**/*.{js,jsx,mdx}', // Changed 'ts' and 'tsx' to 'jsx'
    './app/**/*.{js,jsx,mdx}', // Changed 'ts' and 'tsx' to 'jsx'
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};

module.exports = config;