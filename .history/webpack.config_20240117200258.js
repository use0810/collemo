import path from 'path';

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