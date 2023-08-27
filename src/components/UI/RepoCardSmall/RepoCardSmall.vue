<template>
  <RouterLink
    :to="`/repository/${props.id}`"
    :class=$style.item
  >
    <div :class=$style.image>
      <img :src="props.ownerAvatar" alt="" />
    </div>
    <div :class=$style.title>
      {{ props.title }}
    </div>
  </RouterLink>
</template>

<script setup lang='ts'>
import { RouterLink } from 'vue-router'

const props = defineProps<{
  id: string,
  ownerAvatar: string,
  title: string,
}>()
</script>

<style lang='scss' module>
.item {
  font-size: 13px;
  color: #fff;
  display: flex;
  align-items: center;
  column-gap: 16px;

  &:hover {
    color: #f3aa4e;
    background-color: #ffffff30;
    border-radius: 3px;
  }
}

.image {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: 1px solid #555555;
  overflow: hidden;

  img {
    width: 100%;
  }
}
</style>