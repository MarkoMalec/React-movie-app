import React, { Component } from 'react';
import { useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { Container, Spinner, Center, Box } from '@chakra-ui/react';
import SearchBar from '../elements/SearchBar/SearchBar';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
// import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
// import LoadingCircle from '../elements/LoadingCircle/LoadingCircle';
import { useEffect } from 'react';
import { ThemeContext } from '@emotion/react';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchItems(endpoint);
  }, []);

  const fetchItems = async endpoint => {
    const result = await (await fetch(endpoint)).json();
    try {
      setLoading(false);
      setMovies(result.results);
    } catch (error) {
      console.log(error);
    }
  };

  const searchMovies = searchTerm => {
    let endpoint = '';
    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    fetchItems(endpoint);
    setSearchTerm(searchTerm);
    console.log(searchTerm);
  };

  if (loading) {
    return (
      <Center h="100vh" color="white">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  }

  return (
    <>
      <section className="search-section">
        <SearchBar callback={searchMovies} />
      </section>
      <Container as="main" maxW="1400px" pt="10rem">
        <ThumbnailGrid
          preHeader={searchTerm ? 'Search Result for ' : null}
          header={searchTerm ? `"${searchTerm}"` : 'Trending Movies'}
          loading={loading}
        >
          {movies?.map((element, i) => {
            return (
              <Thumbnail
                key={i}
                clickable={true}
                image={
                  element.poster_path ? (
                    `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                  ) : (
                    <p>noposter</p>
                  )
                }
                movieId={element.id}
                movieName={element.title}
                originalTitle={element.original_title}
                releaseDate={element.release_date}
                voteAverage={element.vote_average}
              />
            );
          })}
        </ThumbnailGrid>
      </Container>
    </>
  );
};

export default Home;
