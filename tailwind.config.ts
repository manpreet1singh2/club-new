import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}', '*.{js,ts,jsx,tsx,mdx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background, var(--background)))',
          foreground: 'hsl(var(--sidebar-foreground, var(--foreground)))',
          border: 'hsl(var(--sidebar-border, var(--border)))',
          accent: 'hsl(var(--sidebar-accent, var(--muted)))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground, var(--muted-foreground)))',
          ring: 'hsl(var(--sidebar-ring, var(--ring)))'
        },
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
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};

export default config;
