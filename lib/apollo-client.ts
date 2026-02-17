import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { getEnv } from './env';

const httpLink = new HttpLink({
  uri: getEnv('VITE_CMS_API_URL'),
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
