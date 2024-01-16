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
import ITEM_COLOR_COUNT from '@/modules/MyModule.js';
import { IonItem, IonList, IonToggle } from '@ionic/vue';
import { defineComponent, inject, onMounted, ref, watch } from 'vue';

  export default defineComponent({
    components: { ITEM_COLOR_COUNT, IonItem, IonList, IonToggle },
    setup() {
      const pageInfo = inject('pageInfo');

      const toggleList = ref([
        { name: 'ストラップ', valid: false },
        { name: '翼', valid: false },
        { name: 'ハート', valid: false },
        // 他のtoggleがあれば追加
      ]);

      watch(() => toggleList, (newToggleList, oldItems) => {
      // valid プロパティの変更を検知
      // const changedToggles = toggleList.value.filter(toggle => toggle.valid !== toggleList.value[0].valid);
      console.log("change"+  toggleList)
      //   const filteredList = .value.list.map(item => item.valid === "true");
      //   toggleList.value = toggleList.value.map(item => ({ ...item, valid: filteredList }));
      //   console.log('フィルター'+filteredList)
      });

      // ページが読み込まれるたびに実行
      onMounted(() => {
        console.log(toggleList.value)
        const filteredList = pageInfo.value.list.filter((item,index) => index % ITEM_COLOR_COUNT === 0);
        const validValues = filteredList.map(item => item.valid);
        toggleList.value = toggleList.value.map((item,index) => ({ ...item, valid: validValues[index]  }));
        console.log('フィルター'+JSON.stringify(filteredList))
        console.log('フィルター'+validValues)
        console.log(toggleList.value)
      });

      const handleChange = (toggle) => {
      // console.log('ionChange event fired', event);
      pageInfo.value.list.forEach(item => {
        if (item.name === toggle.name) {
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