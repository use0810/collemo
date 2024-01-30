import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { VueLoaderPlugin } from "vue-loader";

export default {
  mode: 'development',
  entry: './src/router/index.ts',
  output: {
    path: path.resolve('./src/dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      // './router'をエイリアス名'@router'に設定
      '@router': './src/router',
    },
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
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
  ]
};