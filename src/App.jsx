import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient';
import RepoList from './components/RepoList';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RepoList />
    </ApolloProvider>
  );
};

export default App;
