import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories($first: Int, $after: String) {
    viewer {
      repositories(first: $first, after: $after, orderBy: { field: UPDATED_AT, direction: DESC }) {
        nodes {
          id
          name
          description
          url
          updatedAt
          owner {
            login
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;

export const GET_PULL_REQUESTS = gql`
  query GetPullRequests($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      pullRequests(first: 10, states: [OPEN, CLOSED]) {
        nodes {
          id
          title
          url
          state
          createdAt
        }
      }
    }
  }
`;
