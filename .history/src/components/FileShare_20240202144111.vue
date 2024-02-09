<template>
  <ion-button fill="clear" @click="setOpen(true)">
    <img src="/src/assets/share.svg" alt="SVG Image">
    <p color="dark">ファイル共有</p>
  </ion-button>

  <ion-modal :is-open="isOpen" @ionModalWillPresent="onModalWillPresent" @didDismiss="setOpen(false)">
    <!-- ここからモーダルのヘッダー部分 -->
    <ion-header>
      <ion-toolbar>
        <ion-title>ファイル共有画面</ion-title>
        <ion-buttons slot="start">
          <ion-button class="cancel" fill="clear" @click="setOpen(false)">キャンセル</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- ここからファイル一覧の表示 -->
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-content>
          <ion-list>
            <ion-item v-for="file of files" :key="file.name" @click="reflection(file)">
              <ion-thumbnail slot="start">
                <img src="/src/assets/share.svg" alt="SVG Image" />
              </ion-thumbnail>
              <ion-label>{{ file.name.replace('.json', '') }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-modal>
</template>

<script>
import { Share } from '@capacitor/share';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonModal, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent, inject, ref } from 'vue';
import DrawTable from '/src/module/DrawTable.js';
import FileManage from '/src/module/FileManage.js';


export default defineComponent({
  components: {
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol
  },
  setup() {
    const files = ref([]);
    const isOpen = ref(false);
    const setOpen = (open) => {
      isOpen.value = open
    };
    const toggleList = inject('toggleList');

    const onModalWillPresent =  async() => {
      files.value = await FileManage.getFileList();
    };
    const reflection = async(file) => {
      console.log(toggleList.value.map(val => val.valid ))
      const valits = toggleList.value.map(val => val.valid)
      const contents = await FileManage.readFile(file.name);
      const jpeg = await DrawTable.drawTable(contents,file.name);
      const filePath = 'temp.jpg'
      await FileManage.writeCache(filePath, jpeg);
      const dataPath = await FileManage.getImgPath(filePath);
      await Share.share({
        url: dataPath,
      });

    }
    return {
      isOpen,
      setOpen,
      files,
      onModalWillPresent,
      reflection,
  
    };
  }
})

</script>

<style scoped>
  ion-item {
    --padding-start: 0;
  }

  .cancel {
    color: #3880ff;
  
  }
</style>