import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';

export default {

  // cacheフォルダのファイルの完全パスを取得
  async getImgPath(filePath){
    const result = await Filesystem.getUri({
      path: filePath,
      directory: Directory.Cache,
    });
    return result.uri;
  },
  // Dataフォルダのファイル一覧（Json）取得
  async getFileList(){
    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Data,
      });
      const copy = result.files.slice();
      const timeSort = copy.sort((a, b) => {return b.mtime - a.mtime;});
      return timeSort.filter(FileInfo => FileInfo.name.endsWith('.json'));
    } catch (error) {
      console.error('FileLoad Error:', error);
    }
  },
  async readFile(filePath){
    try {
    const contents = await Filesystem.readFile({
        path: filePath,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });
      return JSON.parse(contents.data);
    } catch (error) {
      console.error('FileRead Error:', error);
    }
  },

  async deleteFile(filePath){
    try {
      await Filesystem.deleteFile({
        path: filePath,
        directory: Directory.Data,
      });
    } catch (error) {
      console.error('FileDlete Error:', error);
    }
  },

};