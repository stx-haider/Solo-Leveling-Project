/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'system-bg': '#05050a',         // Deepest dark background
        'system-panel': '#0c0c16',      // Dark panel background
        'system-border': '#2d1b54',     // Dark purple border
        'system-purple': '#8b5cf6',     // Neon purple text/accents
        'system-blue': '#3b82f6',       // Secondary blue
        'system-gold': '#fbbf24',       // Gold for coins
      },
      fontFamily: {
        'system': ['Rajdhani', 'sans-serif'], // Sci-fi gamer font
        'mono': ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'neon-purple': '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
        'neon-blue': '0 0 10px rgba(59, 130, 246, 0.5)',
      }
    },
  },
  plugins: [],
}