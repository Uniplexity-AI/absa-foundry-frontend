/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enable class-based dark mode
  // content: [],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        'background-soft': 'var(--color-background-soft)',
        'background-muted': 'var(--color-background-muted)',
        border: 'var(--color-border)',
        'border-strong': 'var(--color-border-strong)',
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        brand: {
          primary: 'var(--brand-primary)',
          'primary-hover': 'var(--brand-primary-hover)',
          secondary: 'var(--brand-secondary)',
          'secondary-hover': 'var(--brand-secondary-hover)',
          soft: 'var(--brand-soft)',
          'soft-success': 'var(--brand-soft-success)',
        },
        status: {
          info: 'var(--color-info)',
          success: 'var(--color-success)',
          warning: 'var(--color-warning)',
          error: 'var(--color-error)',
        },
      },
      fontFamily: {
        sans: ['var(--font-family-main)', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-family-main)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
      },
      spacing: {
        panel: '1.5rem',
        'panel-sm': '1rem',
        touch: '2.75rem',
        grid: 'var(--space-grid)',
        'space-1': 'var(--space-1)',
        'space-2': 'var(--space-2)',
        'space-3': 'var(--space-3)',
        'space-4': 'var(--space-4)',
        'space-6': 'var(--space-6)',
        'space-8': 'var(--space-8)',
        'space-10': 'var(--space-10)',
        'space-12': 'var(--space-12)',
        'space-16': 'var(--space-16)',
      },
      borderRadius: {
        none: 'var(--radius-none)',
        sm: 'var(--radius-sm)',
        card: 'var(--radius-card)',
        button: 'var(--radius-button)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        full: 'var(--radius-full)',
      },
      boxShadow: {
        ub: 'var(--shadow-sm)',
        'ub-md': 'var(--shadow-md)',
        'ub-lg': 'var(--shadow-lg)',
      },
      zIndex: {
        shell: '10',
        header: '30',
        backdrop: '40',
        popover: '50',
        modal: '60',
        toast: '70',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        fadeIn: 'fadeIn 1s ease-in forwards',
        'loading-bar': 'loading-bar 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(20px, -20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'loading-bar': {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
