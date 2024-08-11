export default {
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,vue,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#19535F',
        focus: '#19535F',
        background: '#FFFFFF',
        primary_light: '#1ab798',
        secondary: '#0B7A75',
        tertiery: '#EAFCFC',
        brand: {
          light: '#3AB7BF',
          DEFAULT: '#0EA5E9',
          dark: '#0B4A74',
        },
        customGray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
