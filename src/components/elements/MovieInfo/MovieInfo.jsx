import React from 'react';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../../fetch';
import { Link } from 'react-router-dom';
import {
  Container,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Spinner
} from '@chakra-ui/react';
import Thumbnail from '../Thumbnail/Thumbnail';
import NoPoster from './no_poster.png';
import './MovieInfo.scss';

const MovieInfo = ({ movie, movieName, directors, writers, loading }) => {
  const headerBackground = {
    backgroundImage: `url("${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}")`,
  };

  return (
    <>
      {loading ? (
        <Center>
        <Spinner size='xl' thickness='5px' speed='.65s' color='tomato' mt={100}/>
        </Center>
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
                    <Thumbnail
                      clickable={false}
                      image={
                        movie.poster_path ? (
                          `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        ) : (
                          NoPoster
                        )
                      }
                    />
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
                        size="53px"
                        trackColor="#1A202C"
                        color={
                          movie.vote_average >= 7.5
                            ? 'green'
                            : movie.vote_average >= 5
                            ? 'yellow'
                            : 'red'
                        }
                        thickness={4}
                        bgColor="rgba(0, 0, 0, .3)"
                        borderRadius="50px"
                        animation={true}
                      >
                        <CircularProgressLabel
                          fontSize="17px"
                          pt='4px'
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
                                <p>{el.name}</p>
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
                               <p>{el.name}</p>
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
