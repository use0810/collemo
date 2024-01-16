<template>
  <ion-grid>
    <ion-row v-for="(item, index) in items" :key="index">
      <!-- <ion-col><ion-label>{{ itemName }}</ion-label></ion-col> -->
      <ion-col size="7.5">{{ item.name }}</ion-col>
      <ion-col size="1.5" ><ion-button size="small" fill="clear" color="dark" @click="decrement(item)">ー</ion-button></ion-col>
      <ion-col size="1.5">{{ item.count }}</ion-col>
      <ion-col size="1.5"><ion-button size="small" fill="clear" color="dark" @click="increment(item)">＋</ion-button></ion-col>
      <!-- <ion-col><ion-badge>{{ count }}</ion-badge></ion-col> -->
    </ion-row>
    <!-- <ion-row v-if></ion-row> -->
    <!-- 小計の表示 -->
    <ion-row v-if="(items) % 4 === 0" class="subtotal-row">
      <ion-col size="7.5">Subtotal</ion-col>
      <ion-col size="1.5">{{ calculateSubtotal(index) }}</ion-col>
    </ion-row>


  </ion-grid>
</template>

<script>
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/vue';
import { defineComponent, } from 'vue';

export default defineComponent({
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonButton,
  },
  props: ['items'],
  setup(props) {
    const increment = (item) => {
      item.count++;
    };

    const decrement = (item) => {
      if (item.count > 0) {
        item.count--;
      }
    };

    const calculateSubtotal = (index) => {
      const start = index - (index % 4);
      const end = index;
      const subtotal = items.value.slice(start, end + 1).reduce((sum, item) => sum + item.count, 0);
      return subtotal;
    };

    return {
      increment,
      decrement,
      calculateSubtotal
    };
  },
});
</script>

<style scoped>

ion-row {
  width: 100%;
}

ion-col {
  background-color: #fff;
  border: solid 1px #000;
  color: #000;
  text-align: center;
  display: flex;
  justify-content:center;
  align-items:center;
  padding: 1px;
}

ion-col > ion-button {
  width:100%;
}
button .button-native{
  box-sizing:border-box;
  width:100%;
  --padding-inline-start: unset;
  --padding-inline-end: unset;
}

</style>