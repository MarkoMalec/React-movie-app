import React from 'react';
import { useEffect, useState } from 'react';
import { API_URL, API_KEY } from '../../../fetch';
import { useLocation, useParams } from 'react-router-dom';
import SimilarMovies from './SimilarMovies';
import SimilarShows from './SimilarShows';

const SimilarScreenPlay = () => {
    const [similarMovies, setSimilarMovies] = useState(null);
    const [similarShows, setSimilarShows] = useState(null);
    
    const currentLocation = useLocation();
    const movieId = useParams();
    const showId = useParams();
  
  useEffect(() => {
    // const moviesEndpoint = `${API_URL}${movieId.pathname}/similar?api_key=${API_KEY}`;
    // const showsEndpoint = `${API_URL}${showId.pathname}/similar?api_key=${API_KEY}`;
    // console.log(showId)
    // const fetchItems = async endpoint => {
    //   try {
    //     if (currentLocation.pathname === movieId.movieId) {
    //       const moviesResult = await (await fetch(endpoint)).json();
    //       setSimilarMovies(moviesResult);
    //       console.log(moviesResult);
    //     //   console.log(movieId.pathname)
    //     }
    //     if (currentLocation.pathname === showId.showId) {
    //       const showsResult = await (await fetch(endpoint)).json();
    //       setSimilarShows(showsResult);
    //       console.log(showsResult)
    //     }
    //   } catch (error) {
    //     console.log(error, 'error');
    //   }
    // };

    // fetchItems(moviesEndpoint);
    // fetchItems(showsEndpoint);
  }, []);
 
  if (currentLocation.pathname === `/movie/${movieId.movieId}`) {

    return <SimilarMovies />
  }
  if (currentLocation.pathname === `/tv/${showId.showId}`) {
    return <SimilarShows />
  }

};

export default SimilarScreenPlay;
