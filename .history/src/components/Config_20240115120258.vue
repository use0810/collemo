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
      <ion-item-group>
        <ion-item-divider>
          <ion-label> Section A </ion-label>
        </ion-item-divider>
  
        <ion-item>
          <ion-label>A1</ion-label>
        </ion-item>
        <ion-item>
          <ion-label>A2</ion-label>
        </ion-item>
        <ion-item lines="none">
          <ion-label>A3</ion-label>
        </ion-item>
      </ion-item-group>
    </ion-content>
  </ion-modal>
</template>
<script>
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar, IonItemGroup ,IonItem,} from '@ionic/vue';
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
  ion-item {
    --padding-start: 0;
  }

  .cancel {
    color: #3880ff;
  }
</style>