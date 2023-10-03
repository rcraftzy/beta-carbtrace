import React from 'react';
import { Container, Grid, Stack, Typography } from '@mui/material';
import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../sections/@dashboard/blog';
// mock
import POSTS from '../_mock/blog';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Reduction' },
  { value: 'popular', label: 'Cheaper' },
  { value: 'oldest', label: 'Return' },
];

export default function ReducePage() {


  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Collaborate
        </Typography>
      </Stack>
      <Typography variant="h5" gutterBottom>
        Recommed for you
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Based in your industry and company location, we recommed the following customers to collaborate with
      </Typography>
      <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <BlogPostsSearch posts={POSTS} />
          <BlogPostsSort options={SORT_OPTIONS} />
        </Stack>

      <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>        

    </Container>
  );
};
