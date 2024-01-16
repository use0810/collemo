<template>
  <ion-grid>
    <ion-row v-for="item in items" :key="index">
      <!-- <ion-col><ion-label>{{ itemName }}</ion-label></ion-col> -->
      <ion-col size="7.5">{{ item.name }}</ion-col>
      <ion-col size="1.5" ><ion-button size="small" fill="clear" color="dark" @click="decrement">ー</ion-button></ion-col>
      <ion-col size="1.5">{{ count }}</ion-col>
      <ion-col size="1.5"><ion-button size="small" fill="clear" color="dark" @click="increment">＋</ion-button></ion-col>
      <!-- <ion-col><ion-badge>{{ count }}</ion-badge></ion-col> -->
    </ion-row >
    <!-- <ion-row v-if></ion-row> -->

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