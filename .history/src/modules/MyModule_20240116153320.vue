<script setup>
import {ref} from 'vue'
  const ITEM_COLOR_COUNT = ref(3);

  defineExpose({
    ITEM_COLOR_COUNT
  })
</script>