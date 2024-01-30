import path from 'path';

export default {
  mode: 'development',
  entry: './src/.js',
  output: {
    path: path.resolve('./src/dist'),
    filename: 'bundle.js',
  },
};