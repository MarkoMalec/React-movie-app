import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import { useLocation, Link } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import SimilarShowsSlider from '../Sliders/SimilarShowsSlider';
import Thumbnail from '../Thumbnail/Thumbnail';
import NoPoster from '../../../assets/NoPoster/no_poster.png';
import './SimilarScreenplay.scss';

const SimilarShows = () => {
  const [similarShows, setSimilarShows] = useState();
  const currentLocation = useLocation();

  useEffect(() => {
    const endpoint = `${API_URL}${currentLocation.pathname}/similar?api_key=${API_KEY}`;
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setSimilarShows(result.results);
        console.log(result.results);
      });
  }, [currentLocation.pathname]);

  return (
   <SimilarShowsSlider similarShows={similarShows} />
  );
};

export default SimilarShows;
