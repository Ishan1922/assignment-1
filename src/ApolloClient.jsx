import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const GITHUB_TOKEN = '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';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
