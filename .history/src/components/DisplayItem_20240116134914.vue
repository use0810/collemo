<template>
  <ion-list>
    <ion-item v-for="(toggle, index) in toggleList" :key="index">
      <ion-label>{{ toggle.label }}</ion-label>
      <ion-toggle v-model="toggle.value"></ion-toggle>
    </ion-item>
  </ion-list>
</template>

<script>
  import { IonItem, IonList, IonToggle } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    components: { IonItem, IonList, IonToggle },
  });
</script>