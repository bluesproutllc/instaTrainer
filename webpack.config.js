const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css/,

        // use: [MiniCssExtractPlugin.loader, 'style-loader', 'css-loader', 'sass-loader']
        // },

        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(png|jpg|gif)$/,
        use: ['url-loader'],
      },
    ],
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
