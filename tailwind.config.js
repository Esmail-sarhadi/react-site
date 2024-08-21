// tailwind.config.js
module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [
        'animate-float',
        'animate-float-apple',
        'animate-float-carrot',
        'animate-float-broccoli',
        'animate-float-grapes',
        'animate-emoji-3d',
        'text-shadow-emoji-3d',
        'emoji-3d',
        'food-table',
        'food-row',
        'food-cell'
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        // ... (existing animations)
        'emoji-3d': 'emoji3d 0.3s ease-in-out',
      },
      keyframes: {
        // ... (existing keyframes)
        emoji3d: {
          '0%, 100%': { transform: 'perspective(1000px) rotateY(15deg)' },
          '50%': { transform: 'perspective(1000px) rotateY(-15deg)' },
        },
      },
      fontSize: {
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
    },
  },
  variants: {
    extend: {
      animation: ['hover', 'focus'],
    },
  },
  plugins: [
    function ({ addUtilities, addComponents, e, prefix, config }) {
      const newUtilities = {
        '.emoji-3d': {
          display: 'inline-block',
          transition: 'transform 0.3s ease',
          fontSize: '3rem', // Increased size
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
        },
        '.emoji-3d:hover': {
          transform: 'perspective(1000px) rotateY(-15deg)',
        },
        '.food-table': {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
          gap: '1rem',
        },
        '.food-row': {
          display: 'contents',
        },
        '.food-cell': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '0.5rem',
          textAlign: 'center',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
