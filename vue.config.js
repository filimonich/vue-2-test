const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "docs",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/layout/layout.scss";`,
      },
    },
  },
});
