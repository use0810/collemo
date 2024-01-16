<template>
  <ion-button id="save-trigger">
    <img src="/src/assets/up-arrow-from-bracket.svg" alt="SVG Image">
  </ion-button>
  <ion-alert
    trigger="save-trigger"
    header="ファイル名の入力"
    :buttons="saveButton"
    :inputs="saveInputs"
  ></ion-alert>
  <ion-toast  :is-open="isToastOpen" message="ファイルを保存しました" :duration="500" position=middle @didDismiss="setOpen(false)"></ion-toast>
</template>

<script >
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { IonAlert, IonButton, IonToast } from '@ionic/vue';
import { defineComponent, inject, ref } from 'vue';
export default defineComponent({
  components: {
    IonButton,
    IonAlert,
    IonToast
  },
  setup() {
    const pageInfo = inject('pageInfo');
    console.log("ページ情報"+JSON.stringify(pageInfo));
    console.log("ページ情報ばりゅ"+pageInfo.value)
    const isToastOpen = ref(false);
    const saveInputs = [
      {
        id:'fileName',
        placeholder: 'ファイル名',
      },
    ];
    const saveButton = [
      {
        text: 'キャンセル',
        role: 'cancel',
        handler: () => {
          console.log('キャンセル');
        },
      },
      {
        text: '保存',
        role: 'confirm',
        handler: async() => {
          try {
            // 空白の入力なら日付を入れる処理
            fileName.value = (fileName.value || getToday()) + '.json';

            // 既存のファイル群を取得する
            const fileList= await fileListInApp();

            // 重複していた場合
            let count = 0;
            let temp = fileName.value;
            while (fileList.includes(fileName.value)) {
              count++;
              fileName.value = temp.replace('.json', `(${count}).json`);
            }

            if (pageInfo){
              console.log("ページの内容は"+ JSON.stringify(pageInfo) )
              console.log("ページのvalueは"+ pageInfo.value)
              await Filesystem.writeFile({
                path: fileName.value,
                data: JSON.stringify(pageInfo.value),
                directory: Directory.Data,
                encoding: Encoding.UTF8,
              });
              fileName.value ='';
              setOpen(true);
            } else {
              console.log("ファイル情報エラー")
            }
          } catch (error){
            console.log(error);
          }
        },
      },
    ];

    // 呼び出される関数群
    const setOpen = (state) => {
        isToastOpen.value = state;
    };

    const fileListInApp =  async() => {
      try {
        const fileList = await Filesystem.readdir({
          path: '',
          directory: Directory.Data,
        });
        const result = fileList.files.filter(FileInfo => FileInfo.name.endsWith('.json')).map(FileInfo => FileInfo.name);
        return result
      } catch (error) {
        console.error('ファイルリスト取得エラー:', error);
      }
    };

    const getToday = () => {
      const now = new Date();
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Tokyo'
      }
      const result = now.toLocaleString('ja-JP', options).
      replace(/(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{2})/, '$1年$2月$3日$4時$5分');
      return result
    }
    
    
    return {
      isToastOpen,
      saveButton,
      saveInputs,
      setOpen,
    };
  }
})

</script>