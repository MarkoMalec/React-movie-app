import React, { useEffect } from 'react';
import { Container, SimpleGrid } from '@chakra-ui/react';
import MovieReviews from './MovieReviews';
import './UserReview.scss';

const UserReviews = () => {
  return (
    <>
      <Container as="main" mt="3rem">
        <h1>TMDB User reviews</h1>
      </Container>
      <SimpleGrid columns={[1]} spacingX="50px" spacingY="20px">
        <MovieReviews />
      </SimpleGrid>
    </>
  );
};

export default UserReviews;
