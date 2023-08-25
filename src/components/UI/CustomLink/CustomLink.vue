<template>
  <div class='navLink'>
    <a
      v-if="isExternalLink"
      class="link"
      :href="$props.to"
    >
      {{ text }}
    </a>
    <RouterLink
      v-else
      class="link"
      v-bind="$props"
    >
      {{ text }}
    </RouterLink>
  </div>
</template>

<script lang='ts'>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

export default {
  name: 'CustomLink',

  props: {
    // @ts-ignore
    ...RouterLink.props,
    to: String,
    text: String,
  },

  setup(props) {

    const isExternalLink = computed(
      () => typeof props.to === 'string' && props.to.startsWith('http')
    )

    return { isExternalLink }
  },
}
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