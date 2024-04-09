import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        xl: '1266px',
      },
    },
    extend: {
      zIndex: {
        '0': '0',
        '1': '1'
      }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'gray': '#76787D',
      'white-gray': '#DEDEDD',
      'small-gray': '#E0E0E0',
      'metal': '#E9ECEF',
      'red': '#E31F24',
    },
    fontFamily: {
      'montserrat': ['"Montserrat"', 'sans-serif'],
      'montserrat-bold': ['"Montserrat-bold"', 'sans-serif'],
    }
  },
  plugins: [],
}

