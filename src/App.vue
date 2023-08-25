<template>
  <Header />
  <Main />
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Main from '@/components/Main/Main.vue'
import Footer from '@/components/Footer/Footer.vue'
</script>

<style>
a.router-link-exact-active {
  color: var(--color-text);
}

a.router-link-exact-active:hover {
  background-color: transparent;
}
</style>
