import { RepositoriesState } from '@/stores/types/repositoriesTypes'
import { defineStore } from 'pinia'
import { apolloClient } from '@/graphql/apolloClient'
import { GET_REPOSITORIES } from '@/graphql/repositories'
import { SEARCH_REPOSITORIES } from '@/graphql/searchRepositories'

const initialState: RepositoriesState = {
  repositories: null,
  searchRepo: null,
  searchValue: "",
  pageNumberRepositories: 1,
}

export const useRepositoriesStore = defineStore({
  id: 'repositories',
  state: () => (initialState),
  getters: {
    getRepositories: (state: RepositoriesState) => {
      return state.repositories
    },
    getSearchRepo: (state: RepositoriesState) => {
      return state.searchRepo
    },
    getSearchValue: (state: RepositoriesState) => {
      return state.searchValue
    },
    getPageNumbers: (state: RepositoriesState) => {
      return state.pageNumberRepositories
    }
  },
  actions: {
    // setRepositoriesList(state, action: PayloadAction<Repositories>) {
    //   state.repositories = action.payload;
    // },
    // setSearchRepositoriesList(state, action: PayloadAction<SearchRepo>) {
    //   state.searchRepo = action.payload;
    // },
    // setSearchValue(state, action: PayloadAction<string>) {
    //   state.searchValue = action.payload;
    // },
    //
    // setPageNumber(state, action: PayloadAction<number>) {
    //   state.pageNumberRepositories = action.payload;
    // },
    async getRepositoriesList (quantityRepo: number) {
      const response = await apolloClient.query({
        query: GET_REPOSITORIES,
        variables: { first: quantityRepo },
      });
      this.repositories = response.data.viewer.repositories
    },

    async getSearchRepositories (
      searchValue: string,
      quantityRepo: number
    ) {
      const response = await apolloClient.query({
        query: SEARCH_REPOSITORIES,
        variables: { query: searchValue, last: quantityRepo },
      });
      this.searchRepo = response.data.search;
      this.searchValue = searchValue;
    },

    getPageNumber(num: number) {
      this.pageNumberRepositories = num;
    },
  },
  persist: true,
})