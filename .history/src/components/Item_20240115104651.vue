<template>
  <ion-grid>
    <ion-row class="my-item-group">
      <!-- <ion-col><ion-label>{{ itemName }}</ion-label></ion-col> -->
      <ion-col size="7.5" class="my-item-name">{{ itemName }}</ion-col>
      <ion-col size="1.5" class="my-item-dec"><ion-button fill="clear" @click="decrement">-</ion-button></ion-col>
      <ion-col size="1.5">{{ count }}</ion-col>
      <ion-col size="1.5"><ion-button @click="increment">+</ion-button></ion-col>
      <!-- <ion-col><ion-badge>{{ count }}</ion-badge></ion-col> -->
    </ion-row >

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
  props: ['count', 'itemName'],
  emits: ['increment', 'decrement'],
  setup(props, { emit }) {
    const increment = () => {
      emit('increment');
    };

    const decrement = () => {
      emit('decrement');
    };

    return {
      increment,
      decrement,
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
}

ion-col > ion-button {

}

</style>