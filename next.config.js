const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

module.exports = (phase, { defaultConfig }) => {
  const config = {
    ...defaultConfig,

    reactStrictMode: true,
    images: {
      domains: ["images.igdb.com"],
    },
  }

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      ...config,

      webpack(webpack, { isServer }) {
        if (!isServer) {
          const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
          webpack.plugins.push(new ForkTsCheckerWebpackPlugin())
        }
        return webpack
      },
    }
  }

  return config
}
