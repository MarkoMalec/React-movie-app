import React from 'react';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../../fetch';
import { Container, Flex, Wrap, Center } from '@chakra-ui/react';
import Thumbnail from '../Thumbnail/Thumbnail';
import './MovieInfo.css';

const MovieInfo = ({ movie, movieName }) => {
  const headerBackground = {
    backgroundImage: `url("${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}")`,
  };
  return (
    <>
      <div
        className="movie-header-wrapper"
        style={
          movie.backdrop_path
            ? headerBackground
            : { backgroundColor: '#141821' }
        }
      >
        <div className="movie-header-filter">
          <Container maxW="1200px" pt={150}>
            <Center>
            <div className="movie-header-flex-container">
              <div className="movie-header-poster">
                <Thumbnail
                  clickable={false}
                  image={
                    movie.poster_path ? (
                      `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    ) : (
                      <p>No poster</p>
                    )
                  }
                />
              </div>
              <div className="movie-header-overview">
                <h1>{movie?.title}</h1>
                <div className="movie-header-description">
                  {movie?.overview}
                </div>
              </div>
              </div>
            </Center>
          </Container>
        </div>
      </div>
    </>
  );
};

export default MovieInfo;
