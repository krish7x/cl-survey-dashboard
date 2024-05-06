import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: ['selector', '[data-mode="light"]'],
  content: [
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-react/lib/**/*.js',
    './pages/**/*.{ts,tsx}',
    './public/**/*.html',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          1: '#EAEAEA',
          2: '#F2F5F8',
          3: '#63686F',
          4: '#25292D',
          5: '#aecbcb40',
          6: '#63686F',
          7: '#4A9CA6',
          8: '#BFBFBF',
          9: '#9062A2',
          10: '#6F42C1',
          11: '#EDEDED',
          12: '#7E3AF2',
          13: '#62686f',
          14: '#008000',
          15: '#cccc00',
          16: '#ff0000',
          17: '#111827',
          18: '#FFA788',
        },
      },
      width: {
        skeleton: '272px',
        'modal-left': '30%',
        'modal-right': '70%',
      },
      display: ['group-hover'],
      height: {
        footer: '82px',
        'template-modal': '80vh',
      },
      keyframes: {
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '15%': { transform: 'rotate(14.0deg)' },
          '30%': { transform: 'rotate(-8.0deg)' },
          '40%': { transform: 'rotate(14.0deg)' },
          '50%': { transform: 'rotate(-4.0deg)' },
          '60%': { transform: 'rotate(10.0deg)' },
          '70%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      animation: {
        wave: 'wave 1.5s infinite',
      },
    },
    transitionDuration: {
      '900': '900ms',
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',

          /* Firefox */
          'scrollbar-width': 'none',

          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    }),
  ],
};
export default config;
