<template>
  <ion-button fill="clear" @click="setOpen(true)">
    <img src="/src/assets/trash.svg" alt="SVG Image">
    <p color="dark">ファイル削除メニューへ</p>
  </ion-button>

  <ion-modal :is-open="isOpen" @ionModalWillPresent="onModalWillPresent" @didDismiss="setOpen(false)">
    <!-- ここからモーダルのヘッダー部分 -->
    <ion-header>
      <ion-toolbar>
        <ion-title>ファイル選択</ion-title>
        <ion-buttons slot="start">
          <ion-button class="cancel" fill="clear" @click="setOpen(false)">キャンセル</ion-button>
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
              <ion-label>{{ file.name.replace('.json', '')}}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-modal>
</template>

<script >
import { Directory, Filesystem } from '@capacitor/filesystem';
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonThumbnail, IonTitle, IonToolbar, alertController } from '@ionic/vue';
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
  },
  setup() {
    const isOkDel = ref(false);
    const files = ref([]);
    const isOpen = ref(false);
    const setOpen = (open) => {
      isOpen.value = open
    };

    const onModalWillPresent =  async() => {
      files.value = await FileManage.getFileList();
    };

    const reflection = async(file) => {
      const alert = await alertController.create({
        header:"消去しますか？",
        subHeader:"※削除したファイルは復元できません",
        buttons: resetButtons,
      });
      await alert.present();
      await alert.onDidDismiss();
      if (isOkDel.value) {
        await Filesystem.deleteFile({
          path: file.name,
          directory: Directory.Data,
        });
        await onModalWillPresent();
        isOkDel.value =false;
      }
    };
    
    const resetButtons = [
      {
      text: 'キャンセル',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        isOkDel.value = true;
      },
    },
  ]
    return {
      isOpen,
      setOpen,
      files,
      onModalWillPresent,
      reflection,
      resetButtons
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