// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_APP_GOOGLE_MAP_KEY: process.env.NEXT_APP_GOOGLE_MAP_KEY,
    NEXT_APP_API_KEY: process.env.NEXT_APP_API_KEY
  },

  output: 'standalone',
  images: { domains: ['pana-tree-planting-test-be.aegona.work'] },
  experimental: {
    esmExternals: false,
    jsconfigPaths: false // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
