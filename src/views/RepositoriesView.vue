<template>
  <section :class="$style.section">
    <h2>Repositories page</h2>
    <div :class="$style.info">
      <p>Total number of repositories: {{ repositories && repositories.totalCount ? repositories.totalCount : 0 }}</p>
      <p>Total disk usage: {{ repositories && repositories.totalDiskUsage ? repositories.totalDiskUsage : 0 }}</p>
    </div>
    <template v-if='repositories && listRepo'>
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
            :stargazer-count='repo.stargazerCount'
          />
        </template>
      </div>
      <Paginator
        :sumRepo="repositories.totalCount"
        :searchParams="searchParams"
        :current-page='pageNumberRepositories'
        @set-page-number="handleSetPageNumber"
        @set-search-params="handleSetSearchParams"
        location="myRepo"
      />
    </template>
  </section>
</template>

<script setup lang='ts'>
import RepoCard from '@/components/UI/RepoCard/RepoCard.vue'
import Paginator from '@/components/UI/Pagination/Paginator.vue'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'
import { useRepositoriesStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { RepositoriesNodes, RepositoriesState } from '@/stores/types/repositoriesTypes'
import { ROUTE_URL } from '@/router/routes'

const router = useRouter();
const searchParams = ref('')
const {
  getRepositoriesList,
  getSearchRepositories,
  getPageNumber
} = useRepositoriesStore()
const store = useRepositoriesStore()

const {
  repositories,
  pageNumberRepositories,
  searchValue,
  searchRepo,
} = storeToRefs(useRepositoriesStore())

const nodes = computed(() => repositories.value?.nodes);

const listRepo:RepositoriesNodes[] | undefined = computed(() => {
  let listRepoData
  if (nodes.value) {
    listRepoData = [...nodes.value]
      .reverse()
      .slice(
        (pageNumberRepositories.value - 1) * 10,
        (pageNumberRepositories.value - 1) * 10 + 10
      );
  }
  return listRepoData;
})

const handleSetPageNumber = (num: number) => {
  getPageNumber(num);
  store.$persist();
  router.push({ path: ROUTE_URL.REPOSITORIES, query: {
      pageNumber: pageNumberRepositories.value
    } })
}

const handleSetSearchParams = (data: string) => {
  searchParams.value = data;
  store.$patch((state: RepositoriesState) => {
      state.searchValue = searchParams.value
  })
}

</script>

<style lang='scss' module>
.section {
  font-family: "Courier New", Courier, monospace;
  position: relative;

  h2 {
    text-align: center;
    font-size: 40px;
    color: transparent;
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