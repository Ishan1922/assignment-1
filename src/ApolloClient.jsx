import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// const GITHUB_TOKEN = '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';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      Authorization: `Bearer ${import.meta.env.GITHUB_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
