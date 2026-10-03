/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#F7F9FF',
          100: '#EFF3FF',
          200: '#E2E9FF',
          300: '#CDD8FA',
          border: '#E1E7F5',
          darkBorder: '#C8D2EA',
        },
        navy: {
          950: '#111D49',
          900: '#1C3274',
          800: '#2349B8',
          700: '#315CD4',
          600: '#4B73E6',
        },
        campus: {
          blue: '#315BDF',
          blueHover: '#2448C0',
          terracotta: '#315BDF',
          terracottaDark: '#2448C0',
          teal: '#315BDF',
          tealLight: '#EEF3FF',
          amber: '#D97706',
          amberLight: '#FEF3C7',
          charcoal: '#1A202C',
          muted: '#5A6578',
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"DM Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(12, 35, 64, 0.04), 0 1px 2px rgba(12, 35, 64, 0.03)',
        'card': '0 2px 6px -1px rgba(12, 35, 64, 0.06), 0 1px 3px -1px rgba(12, 35, 64, 0.04)',
        'card-hover': '0 8px 18px -4px rgba(12, 35, 64, 0.1), 0 3px 6px -2px rgba(12, 35, 64, 0.05)',
        'notice': '2px 3px 0px 0px rgba(12, 35, 64, 0.15)',
        'stamp': 'inset 0 0 0 1px rgba(200, 75, 49, 0.2)',
      }
    },
  },
  plugins: [],
};
