/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.html",
    "./js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          desktop: '#191a1d',
          window: '#222222',
          header: '#272727',
          input: '#171717',
          border: '#2e2e2e',
          hover: '#2d2e32',
          subtle: '#333338'
        },
        accent: {
          green: '#8ab88c',
          blue: '#7ea4b8',
          amber: '#dca561',
          purple: '#c678dd',
          red: '#e06c75'
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"DejaVu Sans Mono"', '"SF Mono"', 'monospace'],
        sans: ['"Inter"', '"DejaVu Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif']
      }
    }
  },
  plugins: []
}
