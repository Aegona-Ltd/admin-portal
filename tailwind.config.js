module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true
  },
  experimental: {
    darkModeVariant: true
  },
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      mobile: '375px',
      tablet: '768px',
      laptop: '1024px'
    },
    fontSize: {
      '2sl': '8px',
      '1sl': '10px',
      base: '12px',
      sl: '14px',
      xl: '16px',
      '1xl': '18px',
      '1.5xl': '20px',
      '2xl': '24px',
      '3xl': '34px',
      '4xl': '36px'
    },

    boxShadow: {
      btn: '3px 5px 8px #00000017',
      primary: '3px 5px 8px #00000017',
      box: '0px 4px 8px rgba(0, 0, 0, 0.08)'
    },
    extend: {
      colors: {
        // set up theme colors

        purple: {
          DF: '#804BDF'
        },
        borderCl: {
          dashed: '#DDD6C5'
        }
      },
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '1xl': '5px',
        '4xl': '2rem'
      },
      boxShadow: {
        rainbow:
          '0 0 0 10px #ff0000,0 0 0 20px #ff7700,0 0 0 30px #FFDD00,0 0 0 40px #00FF00,0 0 0 50px #0000FF,0 0 0 60px #C77DF3,0 0 0 70px #8A2BE2'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
