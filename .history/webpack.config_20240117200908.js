import path from 'path';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

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
};