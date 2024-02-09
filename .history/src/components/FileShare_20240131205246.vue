<template>
  <ion-button fill="clear" @click="setOpen(true)">
    <img src="/src/assets/trash.svg" alt="SVG Image">
    <p color="dark">ファイル削除メニューへ</p>
  </ion-button>

  <ion-modal :is-open="isOpen" @ionModalWillPresent="onModalWillPresent" @didDismiss="setOpen(false)">
    <!-- ここからモーダルのヘッダー部分 -->
    <ion-header>
      <ion-toolbar>
        <ion-title>ファイル送信画面</ion-title>
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
                <img src="/src/assets/trash.svg" alt="SVG Image" />
              </ion-thumbnail>
              <ion-label>{{ file.name }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-modal>
  <ion-grid>
    <ion-row class="ion-justify-content-around">
      <ion-col>
        <ion-col size="3"> 1 </ion-col>
        <ion-col size="3"> 2 </ion-col>
      </ion-col>
      <ion-col size="3"> 3 </ion-col>
      <ion-col size="3"> 4 </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { Share } from '@capacitor/share';
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonThumbnail, IonTitle, IonToolbar,IonGrid, IonRow, IonCol } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
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

    const onModalWillPresent =  async() => {
      files.value = await FileManage.getFileList();
    };
    const reflection = async(file) => {
      await Share.share({
        title: 'See cool stuff',
        text: 'Really awesome thing you need to see right meow',
        url: 'http://ionicframework.com/',
        dialogTitle: 'Share with buddies',
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