<template>
  <header class='header'>
    <div class='logo'>
      <RouterLink :to=ROUTE_URL.HOME>
        <img :src="logo" alt="logo" />
        <span>GitHubApp</span>
      </RouterLink>
    </div>
    <CustomInput />
    <nav class='nav'>
      <template v-for='route in routes' :key='route.path'>
        <CustomLink :to='route.routeParams' :text='route.text' />
      </template>
      <CustomLink :to="{ path: 'https://github.com/' }" text="GitHub Main Page" />
    </nav>
  </header>
</template>

<script setup lang='ts'>
import { RouterLink } from 'vue-router'
import { ROUTE_URL } from '@/router/routes'
import { storeToRefs } from 'pinia'
import { useRepositoriesStore } from '@/stores'

import logo from '@/assets/img/logo.png'

import CustomLink from '@/components/UI/CustomLink/CustomLink.vue'
import CustomInput from '@/components/UI/CustomInput/CustomInput.vue'


const { pageNumberRepositories } = storeToRefs(useRepositoriesStore())

const routes = [
  { routeParams: { path: ROUTE_URL.HOME }, text: 'Home' },
  { routeParams: {
    path: ROUTE_URL.REPOSITORIES,
    query: { pageNumber: pageNumberRepositories.value }},
    text: 'My repositories'
  }
]
</script>

<style lang='scss'>
.header {
  padding: 20px;
  height: 80px;
  border-radius: 6px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
}

.logo {
  a {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  img {
    width: 60px;
  }

  span {
    font-size: 18px;
    color: #fff;
  }
}

.nav {
  color: #fff;
  display: flex;
  gap: 50px;
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;

  a {
    display: inline-block;
    padding: 0 1rem;
    border-left: 1px solid var(--color-border);
  }

  a:first-of-type {
    border: 0;
  }
}

.btn {
  cursor: pointer;
  border: 2px solid #f3aa4e;
  border-radius: 6px;
  background-color: #19191936;
  font-size: 19px;
  color: #fff;

  &:hover {
    background-color: #191919;
    color: #595757;
    transform: scale(1.1);
  }

  &:active {
    color: #9b61b9;
    transform: scale(0.9);
  }
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>