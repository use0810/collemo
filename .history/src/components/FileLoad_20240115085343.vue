<template>
  <ion-button  @click="setOpen(true)">
    <img src="/src/assets/arrow-down-to-bracket.svg" alt="SVG Image">
  </ion-button>

  <ion-modal :is-open="isOpen" @ionModalWillPresent="onModalWillPresent">
    <!-- ここからモーダルのヘッダー部分 -->
    <ion-header>
      <ion-toolbar>
        <ion-title>ファイル選択</ion-title>
        <ion-buttons slot="start">
          <ion-button class="cancel" fill="clear" @click="setOpen(false)">キャンセル</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <!-- ここからファイル一覧の表示 -->
    <ion-content class="ion-padding">
      <ion-card>
        <ion-card-content>
          <ion-list>
            <ion-item v-for="file of files" :key="file.name" @click="reflection(file)">
              <ion-thumbnail slot="start">
                <img src="/src/assets/list-file.svg" alt="SVG Image" />
              </ion-thumbnail>
              <ion-label>{{ file.name }}</ion-label>
            </ion-item>

            <ion-item>
              <ion-thumbnail slot="start">
                <img src="/src/assets/trash.svg" alt="SVG Image" />
              </ion-thumbnail>
              <ion-label>Item</ion-label>
            </ion-item>

            <ion-item>
              <ion-thumbnail slot="start">
                <img src="/src/assets/trash.svg" alt="SVG Image" />
              </ion-thumbnail>
              <ion-label>Item</ion-label>
            </ion-item>

            <ion-item lines="none">
              <ion-thumbnail slot="start">
                <img src="/src/assets/trash.svg" alt="SVG Image" />
              </ion-thumbnail>
              <ion-label>Item</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-modal>
</template>

<script >
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonThumbnail, IonTitle, IonToolbar } from '@ionic/vue';
import { defineComponent, ref ,inject} from 'vue';
export default defineComponent({
  components: {
    IonButton,
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonContent,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel
  },
  setup() {
    const files = ref([]);
    const isOpen = ref(false);
    const {pageInfo, updatePage} = inject('pageInfo');
    // const pageInfo = inject('pageInfo');

    const setOpen = (open) => (isOpen.value = open);

    const onModalWillPresent =  async() => {
      try {
        const result = await Filesystem.readdir({
          path: '',
          directory: Directory.Data,
        });
        console.log(result);
        files.value = result.files.filter(FileInfo => FileInfo.name.endsWith('.json')).reverse();
      } catch (error) {
        console.error('FilePicker Error:', error);
      }
    };

    const reflection = async(file) => {
      console.log("読み込むfileの中身" + JSON.stringify(file));
      console.log(file.name)
      const result = await readFile(file.name);
      console.log(result.value);
      console.log(result)
      // updatePage(file);
    };
    

  const readFile = async (uri) => {
  const contents = await Filesystem.readFile({
      path: uri,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    console.log("contentsの中身"+contents);
    console.log("contens.dataの中身"+contents.data) // 
    // console.log("contents.value"+ contents.value)  //undefined
    // console.log("contents.list"+ contents.list)  //undefined
    // console.log("contens.data.list"+contents.data.list)  undefined
    // console.log("contens.data.list"+contents.data.list)  
   // console.log("contens.data.valu？"+contents.data.value);  //undefined
    // console.log("listは取得できる？"+contents.data._rawvalue); //undefined
    return JSON.parse(contents.data)._rawvalue;
  };
    return {
      isOpen,
      setOpen,
      files,
      onModalWillPresent,
      reflection,
      readFile
    };
  }
})

</script>

<style scoped>
  ion-item {
    --padding-start: 0;
  }

  .cancel {
    color: #3880ff;
  
  }
</style>