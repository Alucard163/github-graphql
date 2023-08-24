<template>
  <section :class="$style.section">
    <h2>Search result: {{ searchValue }}</h2>
    <div :class="$style.info">
      <p>Number of repositories found: {{ searchRepo.repositoryCount }}</p>
    </div>
    <template v-if='searchRepo && listRepo'>
      <div :class="$style.content">
        <template v-for='(repo, index) in listRepo' :key='repo.id'>
          <RepoCard
            :id="repo.id"
            :number="index + 1"
            :title="repo.name"
            :url="repo.url"
            :createdAt="repo.createdAt"
            :pushedAt="repo.pushedAt"
            :ownerName="repo.owner.login"
            :ownerAvatar="repo.owner.avatarUrl"
          />
        </template>
      </div>
      <Paginator
        :sumRepo="searchRepo.repositoryCount"
        :searchParams="searchParams"
        @set-page-number="getPageNumberSearch"
        @set-search-params="handleSetSearchParams"
        :searchValue="searchValue"
        location="search"
      />
    </template>
  </section>
</template>

<script setup lang='ts'>
import { Ref, ref, watch, computed, onMounted } from 'vue'
import { useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { RepositoriesSearch, SearchState } from '@/stores/types/searchTypes'

import RepoCard from '@/components/UI/RepoCard/RepoCard.vue'
import Paginator from '@/components/UI/Pagination/Paginator.vue'

const route = useRoute();
const searchParams = ref('')
const {
  getPageNumberSearch,
  getSearchRepositories,
} = useSearchStore()
const store = useSearchStore()
const {
  searchRepo,
  searchValue,
  pageNumberSearch,
  numCalls,
  restart,
} = storeToRefs(useSearchStore())
const nodes = computed(() => searchRepo.value?.nodes);

const listRepo:Ref<RepositoriesSearch[]> | undefined = computed(() => {
  if (nodes.value) {
    return [...nodes.value].slice(
      (pageNumberSearch.value - 1) * 10,
      (pageNumberSearch.value - 1) * 10 + 10
    );
  }
  return undefined
});

const handleSetSearchParams = (data) => {
  console.log('searchParam', data);
  searchParams.value = (`search=${searchValue.value}&pageNumber=${pageNumberSearch.value}`);
  store.$patch((state: SearchState) => {
      state.searchValue = searchParams.value
  })
  console.log('store state', store.$state)
}

watch(() => numCalls.value, () => {
  searchParams.value = (`search=${searchValue.value}&pageNumber=${pageNumberSearch.value}`);
})

// watch(() => restart.value, () => {
//
// })
onMounted(() => {
  if (restart.value) {
    const pageNumber = Number(route.params?.pageNumber) || 1;
    const search = route.params?.search || '';
    getPageNumberSearch(pageNumber);
    getSearchRepositories(search, 100, false);
  }
})
</script>

<style lang='scss' module>

.section {
  font-family: "Courier New", Courier, monospace;
  position: relative;

  h2 {
    text-align: center;
    font-size: 40px;
    color: #f3aa4e;
  }
}

.info {
  padding-right: 20px;
  text-align: right;
  font-weight: 600;
  font-size: 18px;
  color: #f3aa4e;
  text-shadow: 1px 1px #000, -1px -1px #000, -1px 1px #000, 1px -1px #000,
  -2px -2px 5px #943d9d, 2px 2px 5px #943d9d;
}

.content {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 50px;
}
</style>