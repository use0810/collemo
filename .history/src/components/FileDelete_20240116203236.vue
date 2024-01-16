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
              <ion-label>{{ file.name }}</ion-label>
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
    alertController
  },
  setup() {
    const files = ref([]);
    const isOpen = ref(false);
    const setOpen = (open) => {
      isOpen.value = open
      console.log("setOpenがひらかれた")
    };

    const onModalWillPresent =  async() => {
      try {
        const result = await Filesystem.readdir({
          path: '',
          directory: Directory.Data,
        });
        const copy = result.files.slice();
        const timeSort = copy.sort((a, b) => {return b.mtime - a.mtime;});
        files.value = timeSort.filter(FileInfo => FileInfo.name.endsWith('.json'));
      } catch (error) {
        console.error('FilePicker Error:', error);
      }
    };

    const reflection = async(file) => {
      const alert = await alertController.create({
        header: 'A Short Title Is Best',
        subHeader: 'A Sub Header Is Optional',
        message: 'A message should be a short, complete sentence.',
        buttons: ['Action'],
      });
      await alert.onWilDismiss();

      await Filesystem.deleteFile({
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