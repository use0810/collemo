import path from 'path';

export default {
  mode: 'development',
  entry: './src/main.ts',
  output: {
    path: path.resolve('./src/dist'),
    filename: 'bundle.js',
  },
};