/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        primary: 'hsl(var(--primary))',
        'primary-foreground': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-foreground': 'hsl(var(--secondary-foreground))',
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-foreground': 'hsl(var(--accent-foreground))',
        destructive: 'hsl(var(--destructive))',
        'destructive-foreground': 'hsl(var(--destructive-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        'cosmic-deep': 'hsl(var(--cosmic-deep))',
        'cosmic-void': 'hsl(var(--cosmic-void))',
        'cosmic-ethereal': 'hsl(var(--cosmic-ethereal))',
        'cosmic-golden': 'hsl(var(--cosmic-golden))',
        'cosmic-silver': 'hsl(var(--cosmic-silver))',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
        hebrew: ['var(--font-hebrew)'],
        mystical: ['var(--font-mystical)'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      animation: {
        'hebrew-glow': 'hebrew-glow 4s ease-in-out infinite alternate',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fractal-grow': 'fractal-grow 2s ease-out infinite',
      },
      keyframes: {
        'hebrew-glow': {
          'from': { 
            textShadow: '0 0 15px var(--cosmic-golden), 0 0 25px var(--cosmic-golden), 0 0 35px var(--cosmic-golden), 0 0 45px var(--cosmic-golden)' 
          },
          'to': { 
            textShadow: '0 0 25px var(--cosmic-golden), 0 0 35px var(--cosmic-golden), 0 0 50px var(--cosmic-golden), 0 0 60px var(--cosmic-golden)' 
          }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'fractal-grow': {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '0.7' },
          '50%': { transform: 'scale(1.1) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '0.7' }
        }
      }
    },
  },
  plugins: [],
}
