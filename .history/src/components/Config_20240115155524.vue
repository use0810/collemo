<template>
  <ion-button class="custom-alert" fill="clear" @click="setOpenInit(true)">
    <img src="/src/assets/gear.svg" alt="SVG Image">
  </ion-button>

  <ion-modal :is-open="isOpenInit">
    <!-- ここからモーダルのヘッダー部分 -->
    <ion-header>
      <ion-toolbar>
        <ion-title>設定</ion-title>
        <ion-buttons slot="start">
          <ion-button class="cancel" fill="clear" @click="setOpenInit(false)">キャンセル</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- ここからファイル一覧の表示
    <ion-content class="ion-padding">
      <h2 class="midashi"> ファイル削除 </h2>

      
      <ion-button fill="clear"  @click="setOpenSecond(true)">
        <img src="/src/assets/trash.svg" alt="SVG Image">
        <p color="dark">ファイル削除メニューへ</p>
      </ion-button>
    
      <ion-modal :is-open="isOpenSecond" @ionModalWillPresent="onModalWillPresent">
        <!-- ここからモーダルのヘッダー部分 -->
        <ion-header>
          <ion-toolbar>
            <ion-title>ファイル選択</ion-title>
            <ion-buttons slot="start">
              <ion-button class="cancel" fill="clear" @click="setOpenSecond(false)">キャンセル</ion-button>
            </ion-buttons>
          </ion-toolbar>
          <p style="margin:0 auto; text-align: center;color:red">※削除したものは復元できません</p>
        </ion-header>
    
        <!-- ここからファイル一覧の表示 -->
        <ion-content class="ion-padding">
          <ion-card>
            <ion-card-content>
              <ion-list>
                <ion-item v-for="file of files" :key="file.name" @click="reflection(file)">
                  <ion-thumbnail slot="start">
                    <img src="/src/assets/trash.svg" alt="SVG Image" />
                  </ion-thumbnail>
                  <ion-label>{{ file.name }}</ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </ion-content>
      </ion-modal> -->
  
      <h2 class="midashi"> その他設定（未設置） </h2>
  
      <!-- <ion-item lines="none">
        <ion-label line=noline>A1</ion-label>
      </ion-item> -->

    </ion-content>
  </ion-modal>
</template>
<script>
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, IonItemGroup ,IonItem, IonItemDivider, IonLabel, IonThumbnail, IonList, IonCard, IonCardContent} from '@ionic/vue';
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
    IonCardContent
  },
  setup() {
    const files = ref([]);
    const isOpenInit = ref(false);
    const setOpenInit = (open) => {
      isOpenInit.value = open;
      console.log("first");
    }
    const isOpenSecond = ref(false);
    const setOpenSecond = (open) => (isOpenSecond.value = open);

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
      isOpenInit,
      setOpenInit,
      isOpenSecond,
      setOpenSecond,
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