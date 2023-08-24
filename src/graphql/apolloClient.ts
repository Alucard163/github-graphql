// import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
// import { setContext } from "@apollo/client/link/context";
//
// const httpLink = new HttpLink({
//   uri: "https://api.github.com/graphql",
// });
//
// const authLink = setContext((_, { headers }) => {
//   const token = sessionStorage.getItem("token");
//
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   }
// });
//
// export const apolloClient = new ApolloClient({
//   link: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// })

import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  from,
  HttpLink
} from "@apollo/client/core";

const token = import.meta.env.VITE_APP_GITHUB_ACCESS_TOKEN || '';

const additiveLink = from([
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: any) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : null
      }
    }));
    return forward(operation);
  }),
  new HttpLink({ uri: "https://api.github.com/graphql" })
]);

export const apolloClient = new ApolloClient({
  link: additiveLink,
  cache: new InMemoryCache()
});