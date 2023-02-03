/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      'primary-color': '#3B3737',
      'secondary-color': '#555050',
      'monocrom-color': '#F5F5F5',
      'success-color': '#5ABF41',
      'danger-color': '#CA3144',
      'warning-color': '#EDE642',
    },
    extend: {},
    borderRadius: {
      'radius-10px': '10px',
      'radius-20px': '20px',
      'radius-100px': '100px',
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
