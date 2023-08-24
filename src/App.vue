<template>
<!--  <header>-->
<!--    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />-->

<!--    <div class="wrapper">-->
<!--      <HelloWorld msg="You did it!" />-->

<!--      <nav>-->
<!--        <RouterLink to="/">Home</RouterLink>-->
<!--        <RouterLink to="/about">About</RouterLink>-->
<!--      </nav>-->
<!--    </div>-->
<!--  </header>-->
  <Header />
  <Main />
  <Footer />
</template>

<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Main from '@/components/Main/Main.vue'
import Footer from '@/components/Footer/Footer.vue'
</script>

<style scoped>

</style>
