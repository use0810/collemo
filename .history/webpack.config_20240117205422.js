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
      '@': '.src'
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
  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js',
    ],
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
  ]
};