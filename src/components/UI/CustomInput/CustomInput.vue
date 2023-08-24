<template>
  <form
    :class=$style.form
    @submit.prevent="getSearchRepo"
  >
    <div :class=$style.icon>
      <img :src="search" alt="" />
    </div>
    <div :class=$style.input>
      <input
        type="search"
        name="search"
        placeholder="Search for repositories..."
        autoComplete="off"
        @input="handleSearch"
        v-model="searchValue"
      />
    </div>
    <div
      v-if="searchValue"
      :class=$style.box
    >
      <template v-for='repo in nodes' :key="repo.id">
        <RepoCardSmall
          :id="repo.id"
          :ownerAvatar="repo.owner.avatarUrl"
          :title="repo.name"
          @click="searchValue = ''"
        />
      </template>
    </div>
  </form>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/router/routes'
import search from '@/assets/img/icon-search.png'
import RepoCardSmall from '@/components/UI/RepoCardSmall/RepoCardSmall.vue'
import { useSearchStore } from '@/stores'
import { storeToRefs } from 'pinia'

const {
  getSearchRepositories,
  getPageNumberSearch,
  getQuickSearch,
  getSearchValue,
} = useSearchStore();
const { searchRepo, pageNumberSearch } = storeToRefs(useSearchStore())

const nodes = computed(() => searchRepo.value?.nodes);
const getSearchRepo = () => {
  getPageNumberSearch(1)
  getSearchRepositories(searchValue.value, 100, false);
  searchValue.value = '';
  router.push({ path: ROUTES.SEARCH, query: {
    search: getSearchValue,
    pageNumber: pageNumberSearch.value
  } })
};

const router = useRouter();
const searchValue = ref<string>('');

const handleSearch = () => {
  getQuickSearch(searchValue.value);
};
</script>


<style lang='scss' module>
.form {
  display: flex;
  align-items: center;
  background: #5957573c;
  margin: 0 2rem 0 0;
  border-radius: 6px;
  height: 27px;
  padding: 7px 10px;
  column-gap: 16px;
  width: 300px;
  position: relative;
}

.icon {
  margin-bottom: 3px;
  width: 13px;
  height: 13px;

  img {
    width: 13px;
    height: 100%;
  }
}

.input {
  flex-grow: 1;

  input {
    outline: none;
    width: 100%;
    border: none;
    background: none;
    font-size: 15px;
    line-height: 14px;
    color: #f3aa4e;
  }
}

.box {
  position: absolute;
  top: 120%;
  width: 100%;
  left: 0;
  max-height: 300px;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  background: #151414;
  border-radius: 8px;
  z-index: 9;
}

.box::-webkit-scrollbar {
  display: none;
}
</style>