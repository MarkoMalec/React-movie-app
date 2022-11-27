import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import { useLocation, Link } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import Thumbnail from '../Thumbnail/Thumbnail';
import NoPoster from '../../../assets/NoPoster/no_poster.png';
import SimilarMoviesSlider from '../Sliders/SimilarMoviesSlider';
import './SimilarScreenplay.scss';

const SimilarMovies = () => {
  const currentLocation = useLocation();

  const [similarMovies, setSimilarMovies] = useState();
  useEffect(() => {
    const endpoint = `${API_URL}${currentLocation.pathname}/similar?api_key=${API_KEY}`;
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setSimilarMovies(result.results);
      });
  }, [currentLocation.pathname]);

  return (
    <SimilarMoviesSlider similarMovies={similarMovies} />
  );
};

export default SimilarMovies;
