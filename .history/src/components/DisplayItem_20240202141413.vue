<template>
  <ion-list>
    <ion-item  class="toggle-items" v-for="(toggle, index) in toggleList" :key="index">
      <ion-toggle label-placement="fixed"  @ionChange="handleChange(toggle)" v-model="toggle.valid">
        {{ toggle.name }}
      </ion-toggle>
    </ion-item>
  </ion-list>
</template>

<script>
import { IonItem, IonList, IonToggle } from '@ionic/vue';
import { defineComponent, inject, onMounted, ref } from 'vue';

  export default defineComponent({
    components: { IonItem, IonList, IonToggle },
    setup() {
      const pageInfo = inject('pageInfo');
      const ITEM_COLOR_COUNT = 11;
      const toggleList = inject('toggleList');
      toggleList.value = ref([
        { name: 'ポス友', valid: false },
        { name: '羽', valid: false },
        { name: 'お守り', valid: false },
        { name: 'クローバー', valid: false },
        { name: 'ブレス', valid: false },
        { name: '大会１', valid: false },
        { name: '大会２', valid: false },
        { name: '大会３', valid: false },
        // 他のtoggleがあれば追加
      ]);

      // ページが読み込まれるたびに実行
      onMounted(() => {
        const filteredList = pageInfo.value.list.filter((item,index) => index % ITEM_COLOR_COUNT === 0);
        const validValues = filteredList.map(item => item.valid);
        toggleList.value = toggleList.value.map((item,index) => ({ ...item, valid: validValues[index]  }));
      });

      const handleChange = (toggle) => {
        pageInfo.value.list.forEach(item => {
          if (item.name.includes(toggle.name)) {
            item.valid = toggle.valid;
          }
        });
      };

      return {
        toggleList,
        handleChange
      }
    }
  });
</script>

<style scoped>

.toggle-items{
  --inner-padding-end: 0px;
}
</style>