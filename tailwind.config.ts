import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        category1: 'var(--color-category1)',
        category2: 'var(--color-category2)',
        category3: 'var(--color-category3)',
        category4: 'var(--color-category4)',
      },
      screens: {
        xs: '440px',
        xxs: '380px',
        xxxs: '340px',
      },
      fontSize: {
        xxs: '10px',
        xxxs: '8px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'horizontal-shake': {
          '0%, 50%, 100%': {
            transform: 'translateX(0)',
          },
          '25%': {
            transform: 'translateX(-5px)',
          },
          '75%': {
            transform: 'translateX(5px)',
          },
        },
      },
      animation: {
        'horizontal-shake': 'horizontal-shake 0.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
export default config;
