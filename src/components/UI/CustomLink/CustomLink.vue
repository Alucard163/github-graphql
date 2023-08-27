<template>
  <div class='navLink'>
    <a
      v-if="isExternalLink"
      class="link"
      :href="props.to.path"
    >
      {{ props.text }}
    </a>
    <RouterLink
      v-else
      class="link"
      :to='props.to'
    >
      {{ props.text }}
    </RouterLink>
  </div>
</template>

<script setup lang='ts'>
import { RouterLink } from 'vue-router'
import { computed, Ref } from 'vue'
type routeType = {
  path: string;
  query?: undefined;
} | {
  path: string;
  query?: Record<string, unknown>;
}
const props = defineProps<{
  to: routeType,
  text: String,
}>()

const isExternalLink = computed(
  () => props.to?.path?.startsWith('http')
)
</script>

<style lang='scss'>
.navLink {
  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
}

.link {
  font-size: 19px;
  font-weight: 500;
  color: #fff;
}
</style>