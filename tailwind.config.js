/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },
    //this part of the extend is to play...
    extend: {
      colors: {
        pizza: '#123456',
      },
      fontSize: {
        huge: ['80rem', { lineHeight: '1' }],
      },
      height: {
        //on mobile browsers sometimes the viewport type is not really 100%
        screen: '100dvh',
      },
    },
  },
  plugins: [],
};
