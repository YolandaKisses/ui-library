module.exports = {
  publicPath: "./",
  outputDir: 'docs',
  assetsDir: 'static',
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.md$/,
          use: 'text-loader'
        }
      ]
    }
  },
}