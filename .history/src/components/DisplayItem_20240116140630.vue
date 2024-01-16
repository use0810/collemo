<template>
  <ion-list>
    <ion-item  class="toggle-items" v-for="(toggle, index) in toggleList" :key="index">
      <ion-toggle label-placement="start" v-model="toggle.value">
        {{ toggle.label }}
      </ion-toggle>
    </ion-item>
  </ion-list>
</template>

<script>
  import { IonItem, IonList, IonToggle } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

  export default defineComponent({
    components: { IonItem, IonList, IonToggle },
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

<style scoped>

.toggle-items{
  --inner-padding-end: 0px;
  --inner-margin-end: 50px;
}
</style>