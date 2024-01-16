<template>
  <ion-list>
    <ion-item  class="toggle-items" v-for="(toggle, index) in toggleList" :key="index">
      <ion-toggle label-placement="fixed" v-model="toggle.valid">
        {{ toggle.label }}
      </ion-toggle>
    </ion-item>
  </ion-list>
</template>

<script>
  import { IonItem, IonList, IonToggle } from '@ionic/vue';
  import { defineComponent, ref, inject } from 'vue';

  export default defineComponent({
    components: { IonItem, IonList, IonToggle },
    setup() {
      const pageInfo = inject('pageInfo');

      const readingToggleList = computed(() => {
        const filteredList = pageInfo.value.list.map(item => item.valid === "true");
        console.log('フィルター'+filteredList)
        return filteredList;
    
      });

      const toggleList = ref([
        { label: 'ストラップ', valid: true },
        { label: '翼', valid: false },
        { label: 'ハート', valid: true },
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
}
</style>