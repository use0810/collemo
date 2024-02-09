import { Directory, Filesystem } from '@capacitor/filesystem';

export default {
  async getImgPath(filePath){
    const result = await Filesystem.getUri({
      path: filePath,
      directory: Directory.Cache,
    });
    return result.uri;
  },
  async getFileList(){
    try {
      const result = await Filesystem.readdir({
        path: '',
        directory: Directory.Data,
      });
      const copy = result.files.slice();
      const timeSort = copy.sort((a, b) => {return b.mtime - a.mtime;});
      // return timeSort.filter(FileInfo => FileInfo.name.endsWith('.json'));
      return timeSort;
    } catch (error) {
      console.error('FileLoad Error:', error);
    }
  },
  async writeCache(filePath, fileData){
    try {
      await Filesystem.writeFile({
          path: filePath,
          data: fileData,
          directory: Directory.Cache,
        });
        console.log('finish')
    } catch (error) {
      console.error('FileWrite Error:', error);
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