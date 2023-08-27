<template>
  <div :class="`${$style.pagination}  ${props.active && $style.active} `">
    {{ props.elem }}
  </div>
</template>

<script setup lang='ts'>
const props = defineProps<{
  elem: number;
  active: boolean;
}>()
</script>

<style lang='scss' module>
.pagination {
  font-size: 20px;

  &:hover {
    transition: 0.3s;
    scale: 1.3;
  }

  &:active {
    transition: 0.01s;
    scale: 1;
  }
}

.active {
  color: #e785b3;
}
</style>