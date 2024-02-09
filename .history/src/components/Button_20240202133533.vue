<template>
  <!-- このページはアプリの主要ボタンと一部モーダルを表示する -->
  <!-- ただしファイル読み込みについてはFileLoad.vueに分割しこのページにて読み込む -->
  <!-- リセットボタンの実装 -->
  <ion-button class="menu-button" id="reset-alert">
    <img src="/src/assets/rotation-arrow-right.svg" alt="SVG Image">
  </ion-button>
  <ion-alert
    trigger="reset-alert"
    header="リセットしますか？"
    :buttons="resetButton"
  ></ion-alert>

  <!-- 読み込みボタンの実装 FileLoad.vueに詳細を分割しインポート-->
  <file-load></file-load>

  <!-- 保存ボタンの実装 -->
  <file-save></file-save>

  <!-- 上書きボタンの実装 -->
  <file-overwrite></file-overwrite>

<div class="now-json">
  <ion-text class="now-json-text" > {{ nowJson.re }} </ion-text>
</div>

</template>

<script>
import { IonAlert, IonButton, IonIcon, IonText, IonToast } from '@ionic/vue';
import { defineComponent, inject } from 'vue';
import FileLoad from '/src/components/FileLoad.vue';
import FileOverwrite from '/src/components/FileOverwrite.vue';
import FileSave from '/src/components/FileSave.vue';
export default defineComponent({
  components: {
    IonButton,
    IonAlert,
    IonToast,
    IonIcon,
    IonText,
    FileLoad,
    FileSave,
    FileOverwrite
  },
  // emits: ['resetButton', 'saveButton', 'saveInputs'],
  props:['items'],
  setup(props) {
    const nowJson = inject('nowJson');
    // 値を全て0にリセットする処理
    const resetButton = [
      {
        text: 'キャンセル',
        role: 'cancel',
      
        handler: () => {
          console.log('キャンセル');
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          for(const item of  props.items){
            item.count = 0;
          }
        },
      },
    ];
    
    return {
      nowJson,
      resetButton,
    };
  }
})
</script>

<style scoped>

.now-json {
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>