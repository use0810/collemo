<template>
  <ion-button fill="clear" @click="setOpen(true)">
    <img src="/src/assets/gear.svg" alt="SVG Image">
  </ion-button>

  <ion-modal :is-open="isOpen">
    <!-- ここからモーダルのヘッダー部分 -->
    <ion-header>
      <ion-toolbar>
        <ion-title>設定</ion-title>
        <ion-buttons slot="start">
          <ion-button class="cancel" fill="clear" @click="setOpen(false)">キャンセル</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- 設定メニューの表示 -->
    <ion-content class="ion-padding">
      <h2 class="midashi"> ファイル削除 </h2>
    
      <file-delete></file-delete>
  
      <h2 class="midashi"> その他設定（未設置） </h2>
  
      <!-- <ion-item lines="none">
        <ion-label line=noline>A1</ion-label>
      </ion-item> -->

    </ion-content>
  </ion-modal>
</template>
<script>
import FileDelete from '@/components/FileDelete.vue';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, IonItemGroup ,IonItem,  IonLabel, IonThumbnail, IonList, IonCard, IonCardContent} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
export default defineComponent({
  components: {
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonItemGroup,
    IonItem,
    IonItemDivider,
    IonLabel,
    IonThumbnail,
    IonList,
    IonCard,
    IonCardContent,
    FileDelete
  },
  setup() {
    const files = ref([]);
    const isOpen = ref(false);
    const setOpen = (open) => (isOpen.value = open);

    const onModalWillPresent =  async() => {
      console.log("modalはひらいとる")
      try {
        const result = await Filesystem.readdir({
          path: '',
          directory: Directory.Data,
        });
        // const timeSort = result.files.sort((a, b) => {return b.mtime - a.mtime;});
        // console.log(result.files.sort((a, b) => {return b.mtime - a.mtime;});)
        // console.log(timeSort)
        files.value = result.files.filter(FileInfo => FileInfo.name.endsWith('.json'));
      } catch (error) {
        console.error('FilePicker Error:', error);
      }
    };

    const reflection = async(file) => {
      console.log(file.name);
      const contents = await Filesystem.deleteFile({
        path: file.name,
        directory: Directory.Data,
      });
      await onModalWillPresent();
    };
    
    
    return {
      isOpen,
      setOpen,
      files,
      onModalWillPresent,
      reflection
    };
  }
})

</script>

<style scoped>

  .cancel {
    color: #3880ff;
  }

  .midashi {
      font-weight: bold;
      border-left: 5px solid #4c9ac0;
      border-bottom: 2px dashed #B4B4B4;
      padding: 0.25em 0 0.3em 0.5em;
  }
</style>