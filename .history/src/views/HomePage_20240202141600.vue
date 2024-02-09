<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start" style="max-width:80%">
          <MyButton :items="items"></MyButton>
        </ion-buttons>
        <ion-buttons slot="end">
          <MySetting></MySetting>
        </ion-buttons>
        
      </ion-toolbar>
    </ion-header>

    <ion-content color="light">

        <!-- <MyItem v-for="item in items" :key="item.name" :item-name="item.name" :count="item.count"  @increment="incrementItem(item)" @decrement="decrementItem(item)" /> -->
        <MyItem :items="items"></MyItem>
    </ion-content>
  </ion-page>
</template>

<script >
import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonToolbar } from '@ionic/vue';
import { computed, defineComponent, ref } from 'vue';
import Json from '/src/collemo-conf.json';
import MyButton from '/src/components/Button.vue';
import MySetting from '/src/components/Config.vue';
import MyItem from '/src/components/Item.vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonButton,
    IonAlert,
    IonButtons,
    MyItem,
    MyButton,
    MySetting,
  },
  setup() {
    const pageInfo = ref(Json);
    // ロードしたファイル名
    const nowJson = ref();
    const items = computed(() => {
      const filteredList = pageInfo.value.list.filter(item => item.valid);
      return filteredList;
    });
    const updatePage = (info) => {
      pageInfo.value = info.value;
    }
    const toggleList = ref([
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
    provide('pageInfo', pageInfo);
    provide('nowJson', nowJson);
    provide('updatePage',  updatePage);
    provide('toggleList', toggleList);
  
    return {
      items,
    };
  },
});
</script>
