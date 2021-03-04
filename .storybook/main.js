const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin")

/** @type import("@storybook/core/types").StorybookConfig */
module.exports = {
  stories: ["../**/*.stories.tsx"],
  addons: ["@storybook/addon-essentials"],
  core: {
    builder: "webpack5",
  },

  webpackFinal: (config) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()]

    return config
  },
}
