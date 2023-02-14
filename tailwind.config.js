/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#3B3737',
        'secondary-color': '#555050',
        'monocrom-color': '#F5F5F5',
        'success-color': '#5ABF41',
        'danger-color': '#CA3144',
        'warning-color': '#EDE642',
      },
      borderRadius: {
        'radius-10px': '10px',
        'radius-20px': '20px',
        'radius-100px': '100px',
      },
      spacing: {
        '10px': '10px',
        '20px': '20px',
        '30px': '30px',
      },
      fontSize: {
        '30px': '30px',
        '20px': '20px',
        '18px': '18px',
        '14px': '14px',
        '12px': '12px',
      },
      boxShadow: {
        'primary-box-shadow': '0px 4px 10px rgba(85, 80, 80, 0.3)',
        'secondary-box-shadow': '4px 4px 10px rgba(59, 55, 55, 0.1)',
      },
      minWidth: {
        '150px': '150px',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
