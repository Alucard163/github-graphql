<template>
  <footer :class=$style.footer>
    <div>
      <span>Developed by </span>
      <a
        href="https://github.com/Alucard163"
        target="_blank"
        rel="noreferrer"
      >
        Alucard163
      </a>
    </div>
    <div>
      <span>The original website: </span>
      <a href="https://github.com/" target="_blank" rel="noreferrer">
        GitHub
      </a>
    </div>
    <div :class=$style.logo>
      <span :class='$style.github'>© GitHubApp - 2023</span>
      <RouterLink :to="ROUTE_URL.HOME">
        <img
          :src="logo"
          alt="logo2"
          :class='$style.img'
        />
      </RouterLink>
    </div>
  </footer>
</template>

<script setup lang='ts'>
import { RouterLink } from 'vue-router'
import { ROUTE_URL } from '@/router/routes'

import logo from '@/assets/img/logo2.png'

</script>

<style module>
.footer {
  margin-top: 30px;
  padding: 0 20px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #576067;
  font-size: 15px;
  border-radius: 6px;
  z-index: 10;
  flex: 0 0 auto;

  a {
    color: #f3aa4e;
  }
}

.github {
  margin-right: 10px;
  vertical-align: 50%;
}

.img {
  width: 35px;
}
</style>