import path from 'path';

export default {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(''./src/dist),
    filename: 'bundle.js',
  },
};