const path = require('path')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'custom-utils.js',
    library: "customUtils",
    libraryTarget: 'umd'
  },
};
