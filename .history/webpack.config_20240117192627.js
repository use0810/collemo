const path = require('path');

module.exports = {
  // エントリーポイントの設定
  entry: `@/src/main.ts`,
  // ファイルの出力設定
  output: {
    // 出力するファイル名
    filename: "bundle.js",
    //  出力先のパス
    path: path.join(__dirname, 'dist')
  }
};