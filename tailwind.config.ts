import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import scrollbar from 'tailwind-scrollbar'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          350: '#c1cad8',
          850: '#172034'
        },
        amber: {
          250: '#fddc73'
        }
      },
      spacing: {
        '4.5': '1.125rem'
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        'fade-in': 'fade-in 0.2s ease-out'
      }
    }
  },
  plugins: [typography, scrollbar]
} satisfies Config
