const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: "docs",
  publicPath: process.env.NODE_ENV === "production" ? "/vue-2-test/" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/layout/layout.scss";`,
      },
    },
  },
});
