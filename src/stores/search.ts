import type { SearchState } from '@/stores/types/searchTypes'
import { defineStore } from 'pinia'
import { apolloClient } from '@/graphql/apolloClient'
import {
  QUICK_SEARCH,
  CURRENT_REPOSITORY,
  SEARCH_REPOSITORIES
} from '@/graphql/searchRepositories'

const initialState: SearchState = {
  searchRepo: null,
  searchValue: "",
  restart: true,
  numCalls: 0,
  pageNumberSearch: 1,
}

export const useSearchStore = defineStore({
  id: 'search',
  state: () => (initialState),
  getters: {
    getSearchRepo: (state: SearchState) => {
      return state.searchRepo
    },
    getSearchValue: (state: SearchState) => {
      return state.searchValue
    },
    getNumCalls: (state: SearchState) => {
      return state.numCalls
    },
    getPageNumber: (state: SearchState) => {
      return state.pageNumberSearch
    }
  },
  actions: {
    async getSearchRepositories (
      searchValue: string,
      quantityRepo: number,
      withoutReboot: boolean
    ) {
      const response = await apolloClient.query({
        query: SEARCH_REPOSITORIES,
        variables: { query: searchValue, last: quantityRepo },
      });
      this.searchRepo = response.data.search;
      this.searchValue = searchValue;
      this.restart = withoutReboot;
      this.numCalls += 1;
    },

    async getQuickSearch(searchValue: string) {
      const response = await apolloClient.query({
        query: QUICK_SEARCH,
        variables: { query: searchValue, first: 10 },
      });
      this.searchRepo = response.data.search
    },

    async getOneRepo(repo: string) {
      const response = await apolloClient.query({
        query: CURRENT_REPOSITORY,
        variables: { id: repo },
      });
      this.searchRepo = response.data.search
    },

    async getPageNumberSearch(num: number) {
      this.pageNumberSearch = num
    },
  },
  persist: true,
})