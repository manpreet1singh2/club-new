import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}', '*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    extend: {
      colors: {
        night: {
          50: '#f5f7ff',
          100: '#e8ecff',
          200: '#c7d0ff',
          300: '#96abff',
          400: '#5f79ff',
          500: '#3554ff',
          600: '#243fd1',
          700: '#1f309d',
          800: '#1b266d',
          900: '#0b1024'
        },
        velvet: {
          50: '#fff0f7',
          100: '#ffdceb',
          200: '#ffbfd9',
          300: '#ff91bf',
          400: '#ff5da0',
          500: '#f83184',
          600: '#d81b6c',
          700: '#ae1458',
          800: '#88124a',
          900: '#570c2f'
        }
      },
      boxShadow: {
        glow: '0 24px 80px rgba(53, 84, 255, 0.24)',
        panel: '0 18px 60px rgba(11, 16, 36, 0.45)'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: []
};

export default config;
