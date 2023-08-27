<template>
  <div :class="`${$style.link} ${ props.class }`">
    <a
      v-if="isExternalLink"
      :class="$style.link"
      :href="$props.url"
    >
      {{ text }}
    </a>
    <RouterLink v-else :to="url">
      {{ props.text }}
    </RouterLink>
  </div>
</template>

<script setup lang='ts'>
import { defineProps, computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps<{
  class?: string;
  url: string;
  text: string;
}>()

const isExternalLink = computed(
  () => props.url.startsWith('http')
)
</script>

<style lang='scss' module>
.link {
  a {
    padding: 6px;
    border: 2px solid #f3aa4e;
    border-radius: 6px;
    background-color: #19191936;
    color: #9b8d8d;

    &:hover {
      padding: 2px;
      border: 4px solid #f3a94ebf;
      background-color: #191919;
      color: #595757;
    }

    &:active {
      color: #9b61b9;
    }
  }
}
</style>