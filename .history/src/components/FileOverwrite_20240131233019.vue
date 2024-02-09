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
      if (nowJson.value){
        await Filesystem.writeFile({
          path: nowJson.value,
          data: JSON.stringify(pageInfo.value),
          directory: Directory.Data,
          encoding: Encoding.UTF8,
        });
        console.log(nowJson.value)
        let result = nowJson.value.split("@")[0];
        result = result.split(".json")[0];
        const nowTime = getToday();

        await Filesystem.rename({
          from: nowJson.value,
          to: result + '@' + nowTime +'.json',
          directory: Directory.Data,
        });
        nowJson.value = result + '@' + nowTime + '.json';
        setSuccessOpen(true);
      } else {
        setFailedOpen(true);
      }
    };

    const getToday = () => {
      const now = new Date();
      const options = {
        // year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Tokyo'
      }
      // const result = now.toLocaleString('ja-JP', options).
      // replace(/(\d{4})\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{2})/, '$1年$2月$3日$4時$5分');
      const result = now.toLocaleString('ja-JP', options).
      replace(/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{2})/, '$1月$2日$3:$4');
      return result
    }

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