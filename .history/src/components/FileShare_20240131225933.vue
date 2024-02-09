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
  <ion-grid id="to-pic">
    <ion-row class="ion-justify-content-around">
      <ion-row size="6" class="ion-justify-content-around">
        <ion-col size="3"> 1 </ion-col>
        <ion-col size="3"> 2 </ion-col>
      </ion-row>
      <ion-row size="6" class="ion-justify-content-around">
        <ion-col size="3"> 1 </ion-col>
        <ion-col size="3"> 2 </ion-col>
      </ion-row>

    </ion-row>
  </ion-grid>
</template>

<script>
import { Share } from '@capacitor/share';
import { IonButton, IonButtons, IonCard, IonCardContent, IonCol, IonContent, IonGrid, IonHeader, IonItem, IonLabel, IonList, IonModal, IonRow, IonThumbnail, IonTitle, IonToolbar } from '@ionic/vue';
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
      const domObject = document.getElementById('to-pic');
      console.log(domObject)
      const svg = new XMLSerializer().serializeToString(domObject);
      const svgUri = encodeURIComponent(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = svgUri;
    
        console.log('test')
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        const filePath = URL.createObjectURL(new Blob([dataURL], { type: "image/png" }));
        img.src = filePath;
        Share.share({
          title: 'See cool stuff',
          text: 'Really awesome thing you need to see right meow',
          url: filePath,
          dialogTitle: 'Share with buddies',
        });
        URL.revokeObjectURL(filePath); // 処理が終わったらURLを解放
      
      // const dataURL = canvas.toDataURL("image/png");
      // console.log(dataURL)
      // const filePath = URL.createObjectURL(new Blob([dataURL], { type: "image/png" }));
      // console.log(filePath)

      // await Share.share({
      //   title: 'See cool stuff',
      //   text: 'Really awesome thing you need to see right meow',
      //   url: svgUrl,
      //   dialogTitle: 'Share with buddies',
      // });
      // image.src = dataURL;
      // image.save("canvas.png");

      // ctx.drawImage(svg, 0, 0);
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