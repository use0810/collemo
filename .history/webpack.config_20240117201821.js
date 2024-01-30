import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import VueLoaderPlugin from 'vue-loader/dist/plugin';

export default {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve('./src/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: 'css-loader',
      }
    ],
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
  ]
};