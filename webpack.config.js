const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    minify: {
      collapseWhitespace: isProd,
    },
  }),
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[name].[contenthash].css',
  }),
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, 'src/images'),
        to: path.resolve(__dirname, 'dist/images'),
      },
      {
        from: path.resolve(__dirname, 'src/sound'),
        to: path.resolve(__dirname, 'dist/sound'),
      },
    ],
  }),
];

if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new webpack.SourceMapDevToolPlugin({}))
}

module.exports = {
  plugins,
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } },
          'sass-loader'],
      },
      {
        test: /\.(jpg|png|gif|svg|mp3)$/,
        use: ['file-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, './dist'),
    open: true,
    compress: true,
    port: 8080,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
