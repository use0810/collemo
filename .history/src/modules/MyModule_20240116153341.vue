<script setup>
import {ref def} from 'vue';
  const ITEM_COLOR_COUNT = ref(3);

  defineExpose({
    ITEM_COLOR_COUNT
  })
</script>