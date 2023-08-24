<template>
  <main :class=$style.main>
    <h2
      v-if='error'
      :class=$style.error
    >
      Произошла ошибка
    </h2>
    <h2
      v-else-if='loading'
      :class=$style.loading
    >
      Загрузка...
    </h2>
    <RouterView v-else/>
  </main>
</template>

<script setup lang='ts'>
import { RouterView } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { GET_USER } from '@/graphql/user'

const { loading, error } = useQuery(GET_USER);
</script>

<style module>
.main {
  margin: auto;
  width: 100%;
  flex: 1 0 auto;
}

.error,
.loading {
  margin-top: 60px;
  text-align: center;
  position: relative;
}
</style>