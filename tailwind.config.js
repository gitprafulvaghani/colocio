/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var'],
      },
      colors: {
        facebook: {
          light: {
            grey: '#65676B',
            light: {
              grey: '#F0F2F5',
            },
          },
        },
        red_accent: '#FF4040',
        green_accent: '#02AB46',
        font_dark: '#111827',
        white: '#ffffff',
        blue: {
          primary: '#0d64e8',
          light: '#589AFF',
          bglight: '#E4EFFF',
          dark: {
            blue: '#0024a4',
            soft: '#d8e7ff',
          },
        },
        slate: {
          primary: '#5E7BB3',
          dark: '#273668',
          soft: '#E9EFF8',
          light: '#9FB8DE',
        },
        custom: {
          gray: {
            200: 'rgba(193, 201, 208, 1)',
            600: 'rgba(80, 86, 105, 1)',
          },
        },
      },
      backgroundImage: {
        'custom-gradient':
          'radial-gradient(122.75% 122.75% at 50% -32.89%, #0024A4 0%, #0A58DB 69.79%, #0D64E8 91.67%)',
        'mesh-gradient': `radial-gradient(at 26% 37%, hsla(218, 35%, 53%, 0.5) 0px, transparent 50%), radial-gradient(at 79% 25%, hsla(216, 48%, 74%, 0.25) 0px, transparent 50%), radial-gradient(at 22% 79%, hsla(216, 100%, 67%, 0.25) 0px, transparent 50%), radial-gradient(at 19% 21%, hsla(218, 35%, 53%, 0.25) 0px, transparent 50%), linear-gradient(to top right, var(--blue-blue), var(--blue-dark-blue))`,
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), 'flowbite/plugin'],
};
