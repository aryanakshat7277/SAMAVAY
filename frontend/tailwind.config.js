/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a6f6',
          500: '#0c87eb',
          600: '#006ac7',
          700: '#0054a3',
          800: '#054785',
          900: '#0a3b6d',
          950: '#062648',
        },
        saffron: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        sandstone: {
          50:  '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          400: '#cbd5e1',
          500: '#94a3b8',
        },
        stone: {
          850: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
        tricolor: {
          saffron: '#FF9933',
          white:   '#FFFFFF',
          green:   '#138808',
          navy:    '#000080',
        },
      },
      fontFamily: {
        sans:  ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Cinzel', '"Noto Serif"', 'Georgia', 'Cambria', 'serif'],
        mono:  ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'xs':         '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'subtle':     '0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        'card':       '0 2px 8px -2px rgba(6, 38, 72, 0.08), 0 1px 4px -1px rgba(6, 38, 72, 0.04)',
        'card-hover': '0 12px 24px -6px rgba(6, 38, 72, 0.12), 0 4px 8px -4px rgba(6, 38, 72, 0.06)',
        'gov':        '0 4px 6px -1px rgba(6, 38, 72, 0.10), 0 2px 4px -1px rgba(6, 38, 72, 0.06)',
        'gov-lg':     '0 10px 15px -3px rgba(6, 38, 72, 0.12), 0 4px 6px -2px rgba(6, 38, 72, 0.06)',
        'gov-glow':   '0 0 20px rgba(0, 84, 163, 0.20), 0 0 40px rgba(0, 84, 163, 0.10)',
        'modal':      '0 25px 50px -12px rgba(6, 38, 72, 0.30)',
        'inner-gov':  'inset 0 1px 3px rgba(6, 38, 72, 0.08)',
      },
      borderRadius: {
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      animation: {
        'fade-in':         'fadeIn 300ms ease-out forwards',
        'slide-up':        'slideUp 300ms ease-out forwards',
        'slide-down':      'slideDown 300ms ease-out forwards',
        'slide-in-left':   'slideInLeft 400ms ease-out forwards',
        'slide-in-right':  'slideInRight 400ms ease-out forwards',
        'fade-in-scale':   'fadeInScale 350ms ease-out forwards',
        'pulse-subtle':    'pulseSubtle 3s infinite',
        'border-pulse':    'borderPulse 2s ease-in-out infinite',
        'float-gentle':    'floatGentle 5s ease-in-out infinite',
        'spin-slow':       'spin 4s linear infinite',
        'bounce-gentle':   'bounceGentle 2s ease-in-out infinite',
        'scan':            'scanline 4s linear infinite',
        'progress-fill':   'progressFill 1.2s ease-out forwards',
        'arc-draw':        'arcDraw 1.2s ease-out forwards',
        'tricolor-sweep':  'tricolorSweep 0.8s ease-out forwards',
        'stagger-in':      'staggerIn 0.4s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInScale: {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0.65' },
        },
        borderPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(27, 92, 67, 0)' },
          '50%':       { boxShadow: '0 0 0 4px rgba(27, 92, 67, 0.15)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-6px)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)', animationTimingFunction: 'ease-in-out' },
          '50%':       { transform: 'translateY(-4px)', animationTimingFunction: 'ease-in-out' },
        },
        scanline: {
          '0%':   { transform: 'translateY(-100%)', opacity: '0.04' },
          '100%': { transform: 'translateY(100vh)', opacity: '0.04' },
        },
        progressFill: {
          '0%':   { width: '0%' },
          '100%': { width: 'var(--target-width, 62%)' },
        },
        arcDraw: {
          'from': { strokeDashoffset: '100' },
          'to':   { strokeDashoffset: 'var(--arc-target, 38)' },
        },
        tricolorSweep: {
          '0%':   { width: '0' },
          '100%': { width: '100%' },
        },
        staggerIn: {
          '0%':   { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
      },
      scale: {
        '102': '1.02',
        '103': '1.03',
      },
    },
  },
  plugins: [],
};
