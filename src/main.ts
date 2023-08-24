import './assets/styles/index.scss'

import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { ApolloClients } from '@vue/apollo-composable'
// @ts-ignore
import { apolloClient } from '@/graphql/apolloClient.ts'

import App from './App.vue'
import router from './router'

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient
    });
  },
  render: () => h(App)
});

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
