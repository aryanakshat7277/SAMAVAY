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
          50:  '#f2f8f5',
          100: '#e1f0e8',
          200: '#c4e3d3',
          300: '#9acfb8',
          400: '#6ab596',
          500: '#3f8c6d',
          600: '#277355',
          700: '#1b5c43',
          800: '#164a37',
          900: '#113a2c',
          950: '#092119',
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
          50:  '#fdfcfb',
          100: '#faf8f5',
          200: '#f4f0e8',
          300: '#ebe4d8',
          400: '#dfd4c2',
          500: '#cbbea7',
        },
        stone: {
          850: '#201d1b',
          900: '#1c1917',
          950: '#0c0a09',
        },
        tricolor: {
          saffron: '#E65100',
          white:   '#FFFFFF',
          green:   '#1B5E20',
          navy:    '#0D47A1',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"Noto Serif"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono:  ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'xs':         '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'subtle':     '0 1px 3px 0 rgba(28, 25, 23, 0.05), 0 1px 2px 0 rgba(28, 25, 23, 0.03)',
        'card':       '0 2px 5px -1px rgba(9, 33, 25, 0.06), 0 1px 3px -1px rgba(9, 33, 25, 0.03)',
        'card-hover': '0 12px 24px -6px rgba(9, 33, 25, 0.10), 0 4px 8px -4px rgba(9, 33, 25, 0.05)',
        'gov':        '0 4px 6px -1px rgba(17, 58, 44, 0.08), 0 2px 4px -1px rgba(17, 58, 44, 0.04)',
        'gov-lg':     '0 10px 15px -3px rgba(17, 58, 44, 0.10), 0 4px 6px -2px rgba(17, 58, 44, 0.05)',
        'gov-glow':   '0 0 20px rgba(27, 92, 67, 0.15), 0 0 40px rgba(27, 92, 67, 0.08)',
        'modal':      '0 25px 50px -12px rgba(9, 33, 25, 0.28)',
        'inner-gov':  'inset 0 1px 3px rgba(9, 33, 25, 0.08)',
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
