import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_REPOSITORY } from '../graphql/mutations';
import { Button, TextField, Container, Typography, CircularProgress } from '@mui/material';

const CreateRepoForm = ({ onRepoCreated }) => {
  const [repoName, setRepoName] = useState('');
  const [description, setDescription] = useState('');
  const [createRepo, { loading, error }] = useMutation(CREATE_REPOSITORY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoName) return alert('Repository name is required.');

    try {
      const { data } = await createRepo({ variables: { name: repoName, description } });
      alert(`Repository "${data.createRepository.repository.name}" created successfully!`);
      setRepoName('');
      setDescription('');
      onRepoCreated(); // Refresh repository list
    } catch (err) {
      console.error('Error creating repository:', err);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px', marginBottom: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
      <Typography variant="h5" gutterBottom>
        Create New Repository
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Repository Name"
          variant="outlined"
          fullWidth
          required
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} style={{ marginTop: '10px' }}>
          {loading ? <CircularProgress size={24} /> : 'Create Repository'}
        </Button>
        {error && <Typography color="error" style={{ marginTop: '10px' }}>Error: {error.message}</Typography>}
      </form>
    </Container>
  );
};

export default CreateRepoForm;
