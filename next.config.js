const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,

      webpack(config, { isServer }) {
        if (!isServer) {
          const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
          config.plugins.push(new ForkTsCheckerWebpackPlugin())
        }
        return config
      },
    }
  }

  return {
    reactStrictMode: true,
  }
}
