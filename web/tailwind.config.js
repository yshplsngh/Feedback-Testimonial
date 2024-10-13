/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-dark': '#0d1117',
        accent: '#27272a',
        whitish: '#f4f4f5',
        indigo: '#5c6ac4',
        orange: '#fe640b',
        'indigo-dark': '#202e78',
      },
      typography: {
        DEFAULT: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' },
          },
        },
      },
    },
    fontFamily: {
      sans: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
    },
    animation: {
      // Modal
      'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      'fade-in': 'fade-in 0.2s ease-out forwards',
      // Popover, Tooltip
      'slide-up-fade': 'slide-up-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-right-fade': 'slide-right-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-down-fade': 'slide-down-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      'slide-left-fade': 'slide-left-fade 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      // Navigation menu
      'enter-from-right': 'enter-from-right 0.25s ease',
      'enter-from-left': 'enter-from-left 0.25s ease',
      'exit-to-right': 'exit-to-right 0.25s ease',
      'exit-to-left': 'exit-to-left 0.25s ease',
      'scale-in-content': 'scale-in-content 0.2s ease',
      'scale-out-content': 'scale-out-content 0.2s ease',
      // Accordion
      'accordion-down': 'accordion-down 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      'accordion-up': 'accordion-up 300ms cubic-bezier(0.87, 0, 0.13, 1)',
      // Custom wiggle animation
      wiggle: 'wiggle 0.75s infinite',
      // Custom spinner animation (for loading-spinner)
      spinner: 'spinner 1.2s linear infinite',
      // Custom blink animation (for loading-dots)
      blink: 'blink 1.4s infinite both',
    },
    keyframes: {
      // Modal
      'scale-in': {
        '0%': { transform: 'scale(0.95)' },
        '100%': { transform: 'scale(1)' },
      },
      'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      // Popover, Tooltip
      'slide-up-fade': {
        '0%': { opacity: '0', transform: 'translateY(2px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      'slide-right-fade': {
        '0%': { opacity: '0', transform: 'translateX(-2px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      'slide-down-fade': {
        '0%': { opacity: '0', transform: 'translateY(-2px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      'slide-left-fade': {
        '0%': { opacity: '0', transform: 'translateX(2px)' },
        '100%': { opacity: '1', transform: 'translateX(0)' },
      },
      // Navigation menu
      'enter-from-right': {
        '0%': { transform: 'translateX(200px)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      'enter-from-left': {
        '0%': { transform: 'translateX(-200px)', opacity: '0' },
        '100%': { transform: 'translateX(0)', opacity: '1' },
      },
      'exit-to-right': {
        '0%': { transform: 'translateX(0)', opacity: '1' },
        '100%': { transform: 'translateX(200px)', opacity: '0' },
      },
      'exit-to-left': {
        '0%': { transform: 'translateX(0)', opacity: '1' },
        '100%': { transform: 'translateX(-200px)', opacity: '0' },
      },
      'scale-in-content': {
        '0%': { transform: 'rotateX(-30deg) scale(0.9)', opacity: '0' },
        '100%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' },
      },
      'scale-out-content': {
        '0%': { transform: 'rotateX(0deg) scale(1)', opacity: '1' },
        '100%': { transform: 'rotateX(-10deg) scale(0.95)', opacity: '0' },
      },
      // Accordion
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' },
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' },
      },
      // Custom wiggle animation
      wiggle: {
        '0%, 100%': {
          transform: 'translateX(0%)',
          transformOrigin: '50% 50%',
        },
        '15%': { transform: 'translateX(-4px) rotate(-4deg)' },
        '30%': { transform: 'translateX(6px) rotate(4deg)' },
        '45%': { transform: 'translateX(-6px) rotate(-2.4deg)' },
        '60%': { transform: 'translateX(2px) rotate(1.6deg)' },
        '75%': { transform: 'translateX(-1px) rotate(-0.8deg)' },
      },
      // Custom spinner animation (for loading-spinner)
      spinner: {
        '0%': {
          opacity: '1',
        },
        '100%': {
          opacity: '0',
        },
      },
      // Custom blink animation (for loading-dots)
      blink: {
        '0%': {
          opacity: '0.2',
        },
        '20%': {
          opacity: '1',
        },
        '100%': {
          opacity: '0.2',
        },
      },
    },
  },
  plugins: [],
};
