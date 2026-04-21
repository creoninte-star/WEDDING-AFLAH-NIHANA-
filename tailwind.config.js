/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        envelope: '#F8EEF0',      // Blush Ivory
        paper: '#F8EEF0',         // Blush Ivory (Background)
        'primary-pink': '#D9858F', // Dusty Blush Pink
        'secondary-pink': '#9A4F63', // Rose Mauve
        'dark-accent': '#6F3346',  // Plum Wine
        gold: '#D8C2A0',          // Champagne Gold
        'soft-pink': '#E8A0A6',   // Soft Veil Pink
        textDark: '#6F3346',      // Using Plum Wine for text for high contrast on ivory
        sage: '#D9858F',          // Replacing Sage with the primary dusty pink
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url('https://www.transparenttextures.com/patterns/stardust.png')",
        'paper-texture': "url('https://www.transparenttextures.com/patterns/cream-paper.png')"
      }
    },
  },
  plugins: [],
}
