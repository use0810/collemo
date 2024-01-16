<template>
  <ion-list>
    <ion-item>
      <ion-toggle>ストラップ</ion-toggle>
    </ion-item>
    <ion-item>
      <ion-toggle>翼</ion-toggle>
    </ion-item>
    <ion-item>
      <ion-toggle>Receive Text Messages</ion-toggle>
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