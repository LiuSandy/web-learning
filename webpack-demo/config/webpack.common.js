const path = require('path');
const fs = require('fs');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

const getPlugins = configs => {
  const plugins = [
    new CleanWebpackPlugin(),
  ]
  Object.keys(configs.entry).forEach(item => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, '../index.html'),
        filename: `${item}.html`,
        chunks: ['runtime','vendors', item]
      }),
    )
  })

  const dllFiles = fs.readdirSync(path.resolve(__dirname, '../dll'))

  dllFiles.forEach(file => {
    if (/\.dll\.js/.test(file)) {
      plugins.push(new AddAssetHtmlPlugin({
        filepath: path.resolve(__dirname, '../dll', file),
      }))
    }
    if (/\.manifest\.json/.test(file)) {
      plugins.push(
        new webpack.DllReferencePlugin({
          manifest: path.resolve(__dirname, '../dll', file),
        })
      )
    }
  })
  return plugins
}

const configs = {
  entry: {
    index: path.resolve(__dirname, '../src/index.js'),
    lius: path.resolve(__dirname, '../src/lius.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(process.cwd(), 'dist'),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    },
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    }
  },
  performance: false,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true, // style.className
            },
          },
          'less-loader',
        ],
      },
      { test: /\.js|jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
    ],
  },
}

configs.plugins = getPlugins(configs);

module.exports = configs;
