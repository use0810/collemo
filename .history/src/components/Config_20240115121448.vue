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
      <h1 class="midashi"> ファイル削除 </h1>

      
        <p>ボタン</p>
   

      <h1 class="midashi"> その他設定（未設置） </h1>
  
      <!-- <ion-item lines="none">
        <ion-label line=noline>A1</ion-label>
      </ion-item> -->

    </ion-content>
  </ion-modal>
</template>
<script>
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, IonItemGroup ,IonItem, IonItemDivider, IonLabel} from '@ionic/vue';
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
    IonLabel
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