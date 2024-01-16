<template>
  <ion-grid>
    <ion-row v-for="(item, index) in items" :key="index">
      <!-- <ion-col><ion-label>{{ itemName }}</ion-label></ion-col> -->
      <ion-row>
        <ion-col size="7.5" class="itemlist">{{ item.name }}</ion-col>
        <ion-col size="1.5" ><ion-button size="small" fill="clear" color="dark" @click="decrement(item)">ー</ion-button></ion-col>
        <ion-col size="1.5">{{ item.count }}</ion-col>
        <ion-col size="1.5"><ion-button size="small" fill="clear" color="dark" @click="increment(item)">＋</ion-button></ion-col>
      </ion-row>
        <!-- 小計の表示 -->
      <ion-row v-if="(items.indexOf(item) +1) % ITEM_COLOR_COUNT === 0" class="subtotal-row">
        <ion-col size="7.5">小計</ion-col>
        <ion-col size="4.5">{{ calculateSubtotal(item) }}</ion-col>
      </ion-row>
    </ion-row>
    <!-- 総計の表示 -->
    <ion-row class="total-row">
      <ion-col size="7.5">合計</ion-col>
      <ion-col size="4.5">{{ calculateTotal() }}</ion-col>
    </ion-row>
    <!-- <ion-row v-if></ion-row> -->



  </ion-grid>
</template>

<script>
import ITEM_COLOR_COUNT from '@/modules/MyModule.js';
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/vue';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonButton,
    ITEM_COLOR_COUNT
  },
  props: ['items'],
  setup(props) {

    const items = ref(props.items);
    const increment = (item) => {
      item.count++;

    };

    const decrement = (item) => {
      if (item.count > 0) {
        item.count--;
      }
    };

    const calculateSubtotal = (item) => {
      const index = items.value.indexOf(item);
      const start = index - (index % ITEM_COLOR_COUNT);
      const end = index;
      const subtotal = items.value.slice(start, end + 1).reduce((sum, item) => sum + item.count, 0);
      return subtotal;
    };

    const calculateTotal = () => {
      return items.value.reduce((sum, item) => sum + item.count, 0);
    };

    watch(() => props.items, (newItems, oldItems) => {
      items.value = newItems;
      calculateSubtotal();
      calculateTotal();
    });

    return {
      ITEM_COLOR_COUNT,
      items,
      increment,
      decrement,
      calculateSubtotal,
      calculateTotal
    };
  },
});
</script>

<style scoped>

ion-row {
  width: 100%;
  margin: 2px 0;
}

.itemlist :nth-child(2){
  background-color: red;
}

ion-col {
  background-color: #fff;
  border: solid 1px gray;
  color: #000;
  text-align: center;
  display: flex;
  justify-content:center;
  align-items:center;
}

ion-col > ion-button {
  width:100%;
}

.subtotal-row {
  border: 2px inset gray;
  font-weight: bold;
  margin-bottom: 10px;
}
.total-row {
  border: 3px inset gray;
  font-weight: bold;
  margin-top:5px;
}

</style>