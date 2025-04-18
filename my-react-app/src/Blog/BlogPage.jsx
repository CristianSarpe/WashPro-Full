import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Blog from './Blog'; // Importăm Blog pentru a-l folosi aici

const BlogPage = () => {
  return (
    <Container maxWidth="lg">
      <Box className="blog-page">
        <Blog /> {/* Folosim componenta Blog */}
      </Box>
    </Container>
  );
};

export default BlogPage;
