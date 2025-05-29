import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        th: {
          primary: '#000B19',
          light: '#0B1A2F',
          hover: '#122944',
          blue: '#1E90FF',
          yellow: '#FFD700',
          white: '#ffffff',
          text: '#f5f5f5',
          muted: '#b0b9c4'
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        th: '0 4px 12px rgba(0, 0, 0, 0.15)'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      }
    }
  },
  plugins: []
}
