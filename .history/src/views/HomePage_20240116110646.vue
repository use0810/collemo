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

    <ion-content class="ion-padding">
      <ion-list>
        <item v-for="item in items" :key="item.name" :item-name="item.name" :count="item.count"  @increment="incrementItem(item)" @decrement="decrementItem(item)" />
      </ion-list>
      <!-- ボタンの実装 -->
    </ion-content>
  </ion-page>
</template>

<script >
import Json from '@/collemo-conf.json';
import MyButton from '@/components/Button.vue';
import MySetting from '@/components/Config.vue';
import Item from '@/components/Item.vue';
import { IonAlert, IonButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonToolbar } from '@ionic/vue';
import { defineComponent, provide, ref,computed } from 'vue';

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonContent,
    IonList,
    IonButton,
    IonAlert,
    Item,
    IonButtons,
    MyButton,
    MySetting,
  },
  setup() {
    const pageInfo = ref(Json);
    // const items = computed(() => pageInfo.value.list);
    const items = computed(() => {
      const filteredList = pageInfo.value.list.filter(item => item.valid === "");
      return filteredList;
    });
    const updatePage = (info) => {
      pageInfo.value = info.value;
    }
    provide('pageInfo', pageInfo);
    provide('updatePage',  updatePage);
  

    const incrementItem = (item) => {
      item.count++;
    };

    const decrementItem = (item) => {
      if (item.count > 0) {
        item.count--;
      }
    };
    

    return {
      items,
      incrementItem,
      decrementItem,
    };
  },
});
</script>
