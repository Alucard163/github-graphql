import { defineStore } from 'pinia'
import { GET_USER } from '@/graphql/user'
import { apolloClient } from '@/graphql/apolloClient'
import { UserState } from '@/stores/types/userTypes'

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};
export const useUserStore = defineStore({
  id: 'user',
  state: () => (initialState),
  getters: {
    getUser: (state) => {
      return state.user
    },
    getLoading: (state) => {
      return state.loading
    },
    getError: (state) => {
      return state.error
    }
  },
  actions: {
    async getUserData() {
      this.user = null
      this.loading = true
      try {
        const response = await apolloClient.query({
          query: GET_USER,
        });
        this.user = response.data?.viewer;
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
    },

  },
  persist: true,
})