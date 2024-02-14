/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    colors: {
      // Background
      "background-300": "var(--background-300)",
      "background-400": "var(--background-400)",
      "background-500": "var(--background-500)",
      "background-600": "var(--background-600)",

      // Text
      "text-300": "var(--text-300)",
      "text-400": "var(--text-400)",
      "text-500": "var(--text-500)",
      "text-600": "var(--text-600)",
      "text-700": "var(--text-700)",

      // Primary
      "primary-300": "var(--primary-300)",
      "primary-400": "var(--primary-400)",
      "primary-500": "var(--primary-500)",
      "primary-600": "var(--primary-600)",
      "primary-700": "var(--primary-700)",
      
      // Secondary
      "secondary-300": "var(--secondary-300)",
      "secondary-400": "var(--secondary-400)",
      "secondary-500": "var(--secondary-500)",
      "secondary-600": "var(--secondary-600)",
      "secondary-700": "var(--secondary-700)",

      // Accent
      "accent-300": "var(--accent-300)",
      "accent-400": "var(--accent-400)",
      "accent-500": "var(--accent-500)",
      "accent-600": "var(--accent-600)",
      "accent-700": "var(--accent-700)",

      // Cancel
      "cancel-500": "var(--cancel-500)",

      // White
      "white-500": "var(--white-500)",
      "white-600": "var(--white-600)",
      "white-700": "var(--white-700)",
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

