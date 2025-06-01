const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../backend/static/dist'),
    filename: '[name].js',
    publicPath: '/static/dist/'
  },
  plugins: [
    new BundleTracker({
        path: path.resolve(__dirname, '../backend'),
        filename: 'webpack-stats.json'
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};