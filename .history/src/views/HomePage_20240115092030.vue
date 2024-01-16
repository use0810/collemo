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
import { defineComponent, provide, ref } from 'vue';

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
    console.log("fileの中身" + JSON.stringify(Json));
    const pageInfo = ref(Json);
    console.log("pageInfor.value"+pageInfo.value)
    console.log("pageInfor.value stringify"+JSON.stringify(pageInfo))
    const updatePage = (info) => {
      console.log("代入する値"+ JSON.stringify(info))
      console.log("代入する値のvalue"+ JSON.stringify(info.value))
      console.log("変更前"+ JSON.stringify(pageInfo))
      console.log("変更前のvalue"+ JSON.stringify(pageInfo.value))
      pageInfo = ref(info);
      console.log("変更後"+ JSON.stringify(pageInfo))
    }
    provide('pageInfo', {pageInfo, updatePage});
    const items = ref(pageInfo.value.list);

    const incrementItem = (item) => {
      item.count++;
      console.log(pageInfo.value)
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
