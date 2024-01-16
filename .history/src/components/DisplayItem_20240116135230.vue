<template>
  <ion-list>
    <ion-item v-for="(toggle, index) in toggleList" :key="index">
      {{ toggle.label }}
      <ion-toggle v-model="toggle.value"></ion-toggle>
    </ion-item>
  </ion-list>
</template>

<script>
  import { IonItem,IonList, IonToggle } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

  export default defineComponent({
    components: { IonItem, IonList, IonToggle, IonLabel },
    setup() {
      const toggleList = ref([
        { label: 'ストラップ', value: true },
        { label: '翼', value: false },
        { label: 'ハート', value: true },
        // 他のtoggleがあれば追加
      ]);

      return {
        toggleList,
      }
    }
  });
</script>