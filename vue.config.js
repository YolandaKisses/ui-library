const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')
function resolve(dir) {  
  return path.join(__dirname, dir)  
}  

module.exports = {
  publicPath: "./",
  assetsDir: 'static',
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  lintOnSave: false, // 是否开启eslint保存检测
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/utils'),
          to: path.resolve(__dirname, 'dd-ui-library/lib/utils'),
          ignore: ".*"
        },
        {
          from: path.resolve(__dirname, 'src/theme-chalk'),
          to: path.resolve(__dirname, 'dd-ui-library/lib/theme-chalk'),
          ignore: ".*"
        },
        {
          from: path.resolve(__dirname, 'src/lib'),
          to: path.resolve(__dirname, 'dd-ui-library/packages'),
          ignore: ".*"
        }
      ])
    ]
  }
}