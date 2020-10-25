const path = require('path')
const Webpack = require('webpack')
const {
  merge
} = require('webpack-merge')
const commonConfig = require('./webpack.common')

const devConfig = {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 8080,
      open: true, // 是否打开浏览器
      hot: true,
  },
  plugins: [
      new Webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(commonConfig, devConfig)