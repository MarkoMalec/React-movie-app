import React from 'react';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../../fetch';
import { Link } from 'react-router-dom';
import {
  Container,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Text,
} from '@chakra-ui/react';
import Thumbnail from '../Thumbnail/Thumbnail';
import './MovieInfo.scss';

const MovieInfo = ({ movie, movieName, directors, writers, loading }) => {
  const headerBackground = {
    backgroundImage: `url("${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}")`,
  };

  return (
    <>
      {loading ? (
        <p>WAIT</p>
      ) : (
        <div
          className="movie-header-wrapper"
          style={
            movie.backdrop_path
              ? headerBackground
              : { backgroundColor: '#141821' }
          }
        >
          <div className="movie-header-filter">
            <Container maxW="1100px" pt={150}>
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
                  <div className="movie-header-description-container">
                    <h1>{movieName}</h1>
                    <div className="movie-header-description">
                      <Text color='whiteAlpha.900' className="movie-header-description-release">
                        {movie?.release_date}
                      </Text>
                      <CircularProgress
                        min={0}
                        max={10}
                        value={movie.vote_average}
                        size="50px"
                        trackColor="#1A202C"
                        color={
                          movie.vote_average >= 7.5
                            ? 'green'
                            : movie.vote_average >= 5
                            ? 'yellow'
                            : 'red'
                        }
                        thickness={10}
                        bgColor="rgba(0, 0, 0, .3)"
                        borderRadius="50px"
                        animation={true}
                      >
                        <CircularProgressLabel
                          fontSize="1.1rem"
                          pt={1.5}
                          color="whiteAlpha.900"
                        >
                          {movie?.vote_average}
                        </CircularProgressLabel>
                      </CircularProgress>
                      <Text color='whiteAlpha.900' className="movie-header-description-overview">
                        {movie?.overview}
                      </Text>
                      {directors.length ? (
                        <>
                          {directors.length > 1 ? (
                              <Text color='whiteAlpha.900' className="subject-heading">Directors</Text>
                          ) : (
                              <Text color='whiteAlpha.900' className="subject-heading">Director</Text>
                          )}
                          {directors.map((el, i) => {
                            return (
                              <Link
                                to={{ pathname: `/director/${el.id}` }}
                                key={i}
                                className="additional-link"
                              >
                                {el.name}
                              </Link>
                            );
                          })}
                        </>
                      ) : null}
                      {writers.length ? (
                        <>
                          {writers.length > 1 ? (
                              <Text color='whiteAlpha.900' className="subject-heading">Writers</Text>
                          ) : (
                              <Text color='whiteAlpha.900' className="subject-heading">Writer</Text>
                          )}
                          {writers.map((el, i) => {
                            return (
                              <Link
                                to={{ pathname: `/writer/${el.id}` }}
                                key={i}
                                className="additional-link"
                              >
                                {el.name}
                              </Link>
                            );
                          })}
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Center>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieInfo;
