module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule("scss").oneOfs.store;
    oneOfsMap.forEach(item => {
      item
        .use("sass-resources-loader")
        .loader("sass-resources-loader")
        .options({
          resources: [
            "./src/assets/scss/_vars.scss",
            "./src/assets/scss/_functions.scss"
          ]
        })
        .end();
    });
  },
  productionSourceMap: true,
  css: {
    sourceMap: true
  }
};
