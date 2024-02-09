import { Directory,Filesystem } from '@capacitor/filesystem';

export default {
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
      console.error('FilePicker Error:', error);
    }
  },
  async writeFile(){
    try {
      const result = await Filesystem.writeFile({
          path: nowJson.value,
          data: JSON.stringify(pageInfo.value),
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        });
      });
      const copy = result.files.slice();
      const timeSort = copy.sort((a, b) => {return b.mtime - a.mtime;});
      return timeSort.filter(FileInfo => FileInfo.name.endsWith('.json'));
    } catch (error) {
      console.error('FilePicker Error:', error);
    }
  },

};