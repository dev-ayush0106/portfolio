/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-primary':  '#0A0A0A',
        'bg-card':     '#141414',
        'bg-surface':  '#1A1A1A',
        'bg-hover':    '#222222',
        // Primary accent — Cyan/Green
        'accent':        '#0CFCA8',
        'accent-hover':  '#0AD891',
        'accent-active': '#08BB77',
        // Text
        'text-heading': '#F5F0E8',
        'text-body':    '#C4BEB4',
        'text-muted':   '#A8A29E',
        // Borders
        'border-default': '#3D3A35',
        'border-subtle':  '#2A2825',
        // Secondary accents
        'amber':    '#FFB347',
        'coral':    '#FF4B6B',
        'lavender': '#A788FA',
        'sky':      '#38BDF8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(12,252,168,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(12,252,168,0.03) 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
