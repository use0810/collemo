<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
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
import Json from '/src/collemo-conf.json';
import { computed, defineComponent, provide, ref } from 'vue';
import MyButton from 'src/components/Button.vue';
import MySetting from 'src/components/Config.vue';
import MyItem from 'src/components/Item.vue';

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
    provide('pageInfo', pageInfo);
    provide('nowJson', nowJson);
    provide('updatePage',  updatePage);
  
    return {
      items,
    };
  },
});
</script>
