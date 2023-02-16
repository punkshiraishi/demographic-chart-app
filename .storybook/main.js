const istanbul = require('vite-plugin-istanbul');

module.exports = {
  "stories": [
    "../src/**/*.stories.ts"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-coverage",
    {
      name: "@storybook/addon-coverage",
      options: {
        istanbul: {
          include: ["**/components/**"],
        },
      },
    },
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "features": {
    "storyStoreV7": true
  },
  async viteFinal(config) {
    config.plugins.push(istanbul({
      "extension": [
        ".vue"
      ]
    }));
    return config;
  },
}
