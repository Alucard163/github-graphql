<template>
  <template v-if='!repo'>
    no results
  </template>
  <section v-else :class="$style.section">
    <h2>{{ repo.name }}</h2>
    <div :class="$style.content">
      <div :class="$style.img">
        <img :src="repo.openGraphImageUrl" alt="" />
      </div>
      <div :class="$style.info">
        <div :class="$style.text">
          <h3>Name: {{ repo.name }} </h3>
          <h4>Owner: {{ repo.owner.login }} </h4>
          <p>
            Date of creation: {{ calcDateCreation(repo.createdAt) }}
            <br />
            Last commit date: {{ calcDateCreation(repo.pushedAt) }}
          </p>
          <p />
        </div>
        <div :class="$style.linkGitHub">
          <CustomBtnLink
            :class="$style.link"
            text="Link to owner profile"
            :url="repo.owner.url"
          />
          <CustomBtnLink
            :class="$style.link"
            text="Link to github repository"
            :url="repo.url"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { calcDateCreation } from '../helpers/helpers'
import { CURRENT_REPOSITORY } from '@/graphql/searchRepositories'
import CustomBtnLink from '@/components/UI/CustomBtnLink/CustomBtnLink.vue'
import { useQuery } from '@vue/apollo-composable'
import { useRepositoriesStore, useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute();
// get id from url params
const id = route.params?.id || '';
const { searchRepo } = storeToRefs(useSearchStore())
const { repositories } = storeToRefs(useRepositoriesStore())
const { loading, result, error } = useQuery(CURRENT_REPOSITORY, {
  variables: { id },
});

const repo = computed(() => {
  let repo = repositories.value?.nodes.find((repo) => id === repo.id);
  if (!repo) {
    repo = searchRepo.value?.nodes.find((repo) => id === repo.id);
  }
  if (!repo && !loading && !error) {
    repo = result.value.node;
  }
  return repo;
})
</script>

<style lang='scss' module>
h2 {
  text-align: center;
  font-size: 40px;
  color: transparent;
}

.section {
  font-family: "Courier New", Courier, monospace;
  position: relative;

  h2 {
    text-transform: capitalize;
  }
}

.content {
  padding: 15px;
  height: 500px;
  border-radius: 6px;
  color: beige;
}

.img {
  margin: auto;
  width: 800px;
  height: 400px;
  border-radius: 15px;
  overflow: hidden;

  img {
    width: 100%;
  }
}

.info {
  margin: auto;
  padding: 15px;
  width: 800px;
  display: flex;
  justify-content: space-between;
}

.text {
  h3 {
    font-size: 25px;
  }

  h4 {
    font-size: 18px;
  }
}

.linkGitHub {
  padding-top: 45px;
  width: 50%;
  text-align: right;
}

.link {
  height: 80px;
  text-align: right;

  a {
    font-size: 20px;
  }
}
</style>