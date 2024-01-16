<template>
  <ion-button class="custom-alert" fill="clear" @click="setOpen(true)">
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

    <!-- ここからファイル一覧の表示 -->
    <ion-content class="ion-padding">
      <h2 class="midashi"> ファイル削除 </h2>

      
      <ion-button  @click="setOpen(true)">
        <img src="/src/assets/arrow-down-to-bracket.svg" alt="SVG Image">
      </ion-button>
    
      <ion-modal :is-open="isOpen" @ionModalWillPresent="onModalWillPresent">
        <!-- ここからモーダルのヘッダー部分 -->
        <ion-header>
          <ion-toolbar>
            <ion-title>ファイル選択</ion-title>
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
                    <img src="/src/assets/list-file.svg" alt="SVG Image" />
                  </ion-thumbnail>
                  <ion-label>{{ file.name }}</ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </ion-content>
      </ion-modal>
  
      <h2 class="midashi"> その他設定（未設置） </h2>
  
      <!-- <ion-item lines="none">
        <ion-label line=noline>A1</ion-label>
      </ion-item> -->

    </ion-content>
  </ion-modal>
</template>
<script>
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, IonItemGroup ,IonItem, IonItemDivider, IonLabel, IonButtons, IonThumbnail, IonModal, IonList, IonCard} from '@ionic/vue';
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
    IonButtons,
    IonThumbnail,
    IonModal,
    IonList,
    IonCard
  },
  setup() {
    const isOpen = ref(false);

    const setOpen = (open) => (isOpen.value = open);
    
    return {
      isOpen,
      setOpen,

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