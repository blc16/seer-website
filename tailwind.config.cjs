module.exports = {
  content: ['./src/**/*.{astro,html,md,mdx,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0A84FF',
        surface: '#F6F7F9',
        text: '#0E1217',
        muted: '#5B6472',
        success: '#1DB954'
      },
      boxShadow: {
        card: '0 6px 30px rgba(2, 8, 23, 0.06)'
      },
      borderRadius: {
        xl2: '1.25rem'
      }
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      serif: ['"Playfair Display"', 'serif']
    }
  }
};
