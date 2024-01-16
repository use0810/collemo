<template>
  <ion-grid>
    <ion-row v-for="(item, index) in items" :key="index">
      <!-- <ion-col><ion-label>{{ itemName }}</ion-label></ion-col> -->
      <ion-row>
        <ion-col size="7.5">{{ item.name }}</ion-col>
        <ion-col size="1.5" ><ion-button size="small" fill="clear" color="dark" @click="decrement(item)">ー</ion-button></ion-col>
        <ion-col size="1.5">{{ item.count }}</ion-col>
        <ion-col size="1.5"><ion-button size="small" fill="clear" color="dark" @click="increment(item)">＋</ion-button></ion-col>
      </ion-row>
         <!-- 小計の表示 -->
      <ion-row v-if="(items.indexOf(item) +1) % 4 === 0" class="subtotal-row">
        <ion-col size="7.5">Subtotal</ion-col>
        <ion-col size="4.5">{{ calculateSubtotal(item) }}</ion-col>
      </ion-row>
      <!-- <ion-col><ion-badge>{{ count }}</ion-badge></ion-col> -->
    </ion-row>
    <!-- 総計の表示 -->
    <ion-row class="total-row">
      <ion-col size="7.5">Total</ion-col>
      <ion-col size="4.5">{{ calculateTotal() }}</ion-col>
    </ion-row>
    <!-- <ion-row v-if></ion-row> -->



  </ion-grid>
</template>

<script>
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/vue';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
    IonGrid,
    IonCol,
    IonRow,
    IonButton,
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
      const start = index - (index % 4);
      const end = index;
      const subtotal = items.value.slice(start, end + 1).reduce((sum, item) => sum + item.count, 0);
      return subtotal;
    };

    const calculateTotal = () => {
      return items.value.reduce((sum, item) => sum + item.count, 0);
    };

    return {
      items: computed(() => props.items), 
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
  margin: 5px 0;

}

ion-col {
  background-color: #fff;
  border: solid 1px #000;
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
  position:relative;
}
.subtotal-row::before {
  content: '';
  width: calc(100% - 1px);
  height: calc(100% + 4px);
  border: 1px solid black;
  position:absolute;
  bottom: 1px;
  top: 1px;
}

</style>