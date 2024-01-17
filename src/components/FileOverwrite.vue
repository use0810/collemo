<template>
  <ion-button @click="fileOverWrite">
    <img src="/src/assets/pencil-paper.svg" alt="SVG Image">
  </ion-button>
  <ion-toast :is-open="isSuccessOpen" message="ファイルを上書きしました" :duration="500" position=middle @didDismiss="setSuccessOpen(false)"></ion-toast>
  <ion-toast :is-open="isFailedOpen" message="ファイルが選択されていません" :duration="1000" position=middle @didDismiss="setFailedOpen(false)" color="danger"></ion-toast>
</template>
<script>
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { IonButton, IonToast } from '@ionic/vue';
import { defineComponent, inject, ref, } from 'vue';
export default defineComponent({
  components: {
    IonButton,
    IonToast
  },
  setup() {
    const pageInfo = inject('pageInfo');
    const isSuccessOpen = ref(false);
    const isFailedOpen = ref(false);
    const setSuccessOpen = (open) => (isSuccessOpen.value = open);
    const setFailedOpen = (open) => (isFailedOpen.value = open);

    const nowJson = inject('nowJson');
    const fileOverWrite = async() => {
      console.log(nowJson.value);
      if (nowJson.value){
        await Filesystem.writeFile({
          path: nowJson.value,
          data: JSON.stringify(pageInfo.value),
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        });
        await Filesystem.rename({
          from: nowJson.value,
          to: "@" + nowJson.value,
          directory: Directory.Data,
        });
        nowJson.value = "@"+ nowJson.value;
        setSuccessOpen(true);
      } else {
        setFailedOpen(true);
      }
    };

    return {
      isSuccessOpen,
      isFailedOpen,
      setSuccessOpen,
      setFailedOpen,
      fileOverWrite
    };
  }
})
</script>