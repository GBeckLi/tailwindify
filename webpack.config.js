const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    index: './index.ts',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
          'shebang-loader'
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|flf)$/,
        use: 'file-loader'
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true,
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
};
