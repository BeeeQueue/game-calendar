module.exports = {
  root: true,
  env: {
    es6: true,
    es2017: true,
    es2020: true,
    es2021: true,
    browser: true,
    node: true,
  },
  extends: [
    "plugin:@beequeue/base",
    "plugin:@beequeue/react",
    "plugin:@beequeue/node",
    "plugin:@beequeue/typescript",
  ],
  rules: {
    "import/no-named-as-default-member": "off",
  },
  overrides: [
    {
      files: ["!pages/**/*.tsx", "**/*.stories.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
}
