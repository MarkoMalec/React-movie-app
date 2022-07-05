import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import SimilarMovies from './SimilarMovies';
import SimilarShows from './SimilarShows';

const SimilarScreenPlay = () => {
  const currentLocation = useLocation();
  const movieId = useParams();
  const showId = useParams();

  if (currentLocation.pathname === `/movie/${movieId.movieId}`) {
    return <SimilarMovies />;
  }
  if (currentLocation.pathname === `/tv/${showId.showId}`) {
    return <SimilarShows />;
  }
};

export default SimilarScreenPlay;
