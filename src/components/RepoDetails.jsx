import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PULL_REQUESTS } from '../graphql/queries';
import { Container, Typography, Card, CardContent, CircularProgress, Button } from "@mui/material";


const RepoDetails = ({ repo, onBack }) => {
  const { loading, error, data } = useQuery(GET_PULL_REQUESTS, {
    variables: { owner: repo.owner.login, name: repo.name },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Pull Requests for {repo.name}
      </Typography>
      <Typography variant="subtitle1">
        <a href={repo.url} target="_blank" rel="noopener noreferrer">
          View Repository on GitHub
        </a>
      </Typography>
      {data.repository.pullRequests.nodes.length === 0 ? (
        <Typography>No Pull Requests found.</Typography>
      ) : (
        data.repository.pullRequests.nodes.map((pr) => (
          <Card key={pr.id} style={{ marginBottom: '10px', padding: '10px', boxShadow: '2px 4px 10px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Typography variant="h6">
                <a href={pr.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: pr.state === 'OPEN' ? 'green' : 'red' }}>
                  {pr.title} ({pr.state})
                </a>
              </Typography>
              <Typography variant="caption" color="textSecondary">
                Created at: {new Date(pr.createdAt).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
      <Button onClick={onBack} variant="contained" color="primary" disabled={loading} style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}>Back</Button>
    </Container>
  );
};

export default RepoDetails;
