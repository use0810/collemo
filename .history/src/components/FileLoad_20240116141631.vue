<template>
  <ion-button  @click="setOpen(true)">
    <img src="/src/assets/arrow-down-to-bracket.svg" alt="SVG Image">
  </ion-button>

  <ion-modal :is-open="isOpen" @ionModalWillPresent="onModalWillPresent" @didDismiss="setOpen(false)">
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
          </ion-list>
        </ion-card-content>
      </ion-card>
      <ion-toast :is-open="isToastOpen" message="ファイルを読み込みました" :duration="500" position=middle @didDismiss="setToastOpen(false)"></ion-toast>
    </ion-content>
  </ion-modal>
</template>

<script >
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { IonButton, IonButtons, IonCard, IonCardContent, IonContent, IonHeader, IonItem, IonLabel, IonList, IonModal, IonThumbnail, IonTitle, IonToolbar, IonToast } from '@ionic/vue';
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
    IonLabel,
    IonToast
  },
  setup() {
    const files = ref([]);
    const isOpen = ref(false);
    const isToastOpen = ref(false);
    const pageInfo = inject('pageInfo');
    const updatePage = inject('updatePage');
    const changeData = ref([]);


    const setOpen = (open) => (isOpen.value = open);
    const setToastOpen = (open) => (isToastOpen.value = open);

    const onModalWillPresent =  async() => {
      try {
        const result = await Filesystem.readdir({
          path: '',
          directory: Directory.Data,
        });
        console.log("loadのresultはこんな感じ"+ result)
        const copy = result.files.slice();
        const timeSort = copy.sort((a, b) => {return b.mtime - a.mtime;});
        files.value = timeSort.filter(FileInfo => FileInfo.name.endsWith('.json'));
      } catch (error) {
        console.error('FilePicker Error:', error);
      }
    };

    const reflection = async(file) => {
      const reader = await readFile(file.name);
      changeData.value = reader;
      updatePage(changeData);
      setToastOpen(true);
      setOpen(false);
    };
    

  const readFile = async (fileName) => {
  const contents = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
    return JSON.parse(contents.data);
  };
    return {
      isOpen,
      setOpen,
      isToastOpen,
      setToastOpen,
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