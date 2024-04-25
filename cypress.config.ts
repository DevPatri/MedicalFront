import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
  },

  video: true,

  component: {
    devServer: {
      framework: "vue-cli",
      bundler: "webpack",
    },
  },
});
