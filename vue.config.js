const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
module.exports = {
  publicPath: "./",
  assetsDir: 'static',
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  lintOnSave: false, // 是否开启eslint保存检测
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/utils'),
          to: path.resolve(__dirname, 'dd-ui-library/utils'),
          ignore: ".*"
        }
      ])
    ]
  }
}