<template>
  <section :class=$style.section>
    <div :class=$style.content>
      <div :class=$style.avatar>
        <div :class=$style.img>
          <img
            v-if='userData && userData.avatarUrl'
            :src=userData.avatarUrl
            alt="avatar"
          />

          <img
            v-else
            :src="avatar"
            alt="avatar"
          />
        </div>

        <div :class=$style.personalInfo>
          <span>
            <h4 v-if='userData && userData.login'>{{ userData.login }}</h4>
            <h4 v-else>Login</h4>
          </span>
          <span>
            <h4 v-if='userData && userData.name'>{{ userData.name }}</h4>
            <h4 v-else>Name</h4>
          </span>
        </div>

      </div>
      <div :class=$style.info>
        <h3> Welcome.</h3>
        <p>
          This service works using the GitHub GraphQL API. <br />
          The technology stack is Vite, TypeScript, Vue 3, Pinia,
          SCSS, GraphQL.
        </p>
      </div>
    </div>
    <CustomLink
      :class="$style.link"
      :to="{
        path: ROUTE_URL.REPOSITORIES,
        query: { pageNumber: pageNumberRepositories }
      }"
      text="Repositories page"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import avatar from '@/assets/img/avatar.png'
import { ROUTE_URL } from '@/router/routes'
import { useRepositoriesStore, useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'

import CustomLink from '@/components/UI/CustomLink/CustomLink.vue'

const { pageNumberRepositories } = storeToRefs(useRepositoriesStore())
const { getUser } = storeToRefs(useUserStore())
const userData = ref(getUser)

onMounted(() => {
  const { getUserData } = useUserStore()
  const { getRepositoriesList } = useRepositoriesStore()

  getUserData();
  getRepositoriesList(100);
})
</script>

<style lang='scss' module>
.section {
  position: relative;
}

.content {
  margin-top: 80px;
  display: flex;
  align-items: center;
  gap: 18%;
}

.avatar {
  z-index: 5;
}

.img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-color: #f1e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 300px;
  }
}

.personalInfo {
  h4 {
    margin: 20px auto;
    width: fit-content;
    font-size: 20px;
  }

  p {
    margin: auto;
    width: fit-content;
    font-size: 30px;
  }
}

.btn {
  cursor: pointer;
  margin-top: 20px;
  width: 135px;
  border: 2px solid #f3aa4e;
  border-radius: 6px;
  background-color: #19191936;
  font-size: 19px;
  color: #9b8d8d;

  &:hover {
    background-color: #191919;
    color: #595757;
  }

  &:active {
    color: #9b61b9;
  }
}

.info {
  width: 45%;
  text-align: center;
  font-family: "Courier New", Courier, monospace;
  font-size: 40px;

  h3 {
    margin: 0;
    color: transparent;
    animation: animHeader 2s forwards;
  }

  p {
    margin-bottom: 0;
  }
}

.link {
  margin-top: 20%;
  height: 80px;
  text-align: center;

  a {
    font-size: 50px;

    &:hover {
      font-size: 48px;
    }
  }
}
</style>
