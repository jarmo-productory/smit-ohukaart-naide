import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'ria-blue': '#005AA3',
        'ria-blue-dark': '#004277',
        'ria-success': '#067A42',
      },
    },
  },
  plugins: [],
};

export default config;
