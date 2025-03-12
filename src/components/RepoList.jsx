import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { Container, Typography, Card, CardContent, CircularProgress } from "@mui/material";

import RepoDetails from './RepoDetails';
import CreateRepoForm from './CreateRepoForm';

const RepoList = () => {
  const { loading, error, data, refetch } = useQuery(GET_REPOSITORIES);
  const [selectedRepo, setSelectedRepo] = useState(null);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  if (selectedRepo) {
    return <RepoDetails repo={selectedRepo} onBack={() => setSelectedRepo(null)} />;
  }

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
        My GitHub Repositories
      </Typography>

      {/* Create Repository Form */}
      <CreateRepoForm onRepoCreated={refetch} style={{ marginBottom: '16px', padding: '10px', boxShadow: '2px 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }} />

      {/* List of Repositories */}
      {data.viewer.repositories.nodes.map((repo) => (
        <Card
          key={repo.id}
          onClick={() => setSelectedRepo(repo)}
          style={{ marginBottom: '16px', padding: '10px', boxShadow: '2px 4px 10px rgba(0,0,0,0.1)', cursor: 'pointer' }}
        >
          <CardContent>
            <Typography variant="h6" style={{ fontWeight: 'bold', color: '#1976D2' }}>
              {repo.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ marginBottom: '8px' }}>
              {repo.description || 'No description available'}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Last updated: {new Date(repo.updatedAt).toLocaleDateString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default RepoList;
