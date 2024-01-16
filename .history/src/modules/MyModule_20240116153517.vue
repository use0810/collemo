<script>
import {ref ,defineExporse} from 'vue';

export default{
  setup(){
    const ITEM_COLOR_COUNT = ref(3);

    return {
      ITEM_COLOR_COUNT,
    }
  }
}

</script>