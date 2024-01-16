<script setup>
import {ref defineExporse} from 'vue';
  const ITEM_COLOR_COUNT = ref(3);

  defineExpose({
    ITEM_COLOR_COUNT
  })
</script>