/* eslint-disable node/no-unpublished-require */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: Object.assign(
      {
        tablet: '640px',
        laptop: '1024px',
        hd: '1280px', // 720p
        figma: '1440px',
        fhd: '1920px', // 1080p
        qhd: '2560px', // 1440p
        uhd: '3840px', // 4k
      },
      defaultTheme
    ),
    fontFamily: {
      sans: ['Semplicita'],
      serif: ['Abhaya Libre'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: {
        DEFAULT: colors.black,
        light: '#242424',
      },
      white: colors.white,
      gray: {
        DEFAULT: '#DBDCE0',
        light: '#EBECEE',
        medium: '#747474',
        dark: '#D5D7DB',
        suva: '#8B8B8B',
        nobel: '#969696',
        silver: '#a2a2a2',
      },
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      beige: {
        DEFAULT: '#DDD0C1',
      },
      offwhite: {
        DEFAULT: '#F2F2F0',
      },
      blue: {
        DEFAULT: colors.blue,
        dark: '#324B6F',
        cyan: '#314a6e',
        light: '#D3DCF1',
      },
      gold: {
        DEFAULT: '#AB7F53',
        light: '#BFA387',
      },
    },
    extend: {
      fontSize: {
        // font sizes in the figma file not found in the default tailwind fonts
        'size-55': '55px',
        'size-48': '48px',
        'size-41': '41px',
        'size-23': '23px',
        'size-21': '21px',
        'size-19': '19px',
        'size-18': '18px',
        'size-15': '15px',
        'size-10': '10px',
      },
      width: {
        'screen-tablet': '640px',
        'screen-laptop': '1024px',
        'screen-hd': '1280px', // 720p
        'screen-figma': '1440px',
        'screen-fhd': '1920px', // 1080p
        'screen-qhd': '2560px', // 1440p
        'screen-uhd': '3840px', // 4k
      },
      dropShadow: {
        card: '0 4px 8px rgba(0, 0, 0, 0.11)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
