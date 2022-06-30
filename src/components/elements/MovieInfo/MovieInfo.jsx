import React from 'react';
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from '../../../fetch';
import { Link } from 'react-router-dom';
import {
  Container,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Box,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { FiPlayCircle, FiPlay } from 'react-icons/fi';
import Thumbnail from '../Thumbnail/Thumbnail';
import NoPoster from './no_poster.png';
import './MovieInfo.scss';

const MovieInfo = ({
  movie,
  movieName,
  releaseYear,
  runtime,
  videos,
  directors,
  writers,
}) => {
  
  const headerBackground = {
    backgroundImage: `url("${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path}")`,
  };

  var videoArray = [];
  var linkKey = '';
  if (videos.length > 0) {
    for (let i = 0; i < videos.length; i++) {
      if (videos[i].type === 'Trailer') {
        videoArray.push(videos[i].key);
      }
    }
    if (videoArray.length > 0) {
      linkKey =
        'https://www.youtube.com/embed/' + videoArray[0] + '?&autoplay=1';
    }
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Container pt={150}>
            <Center>
              <div className="movie-header-flex-container">
                
                <Thumbnail
                  clickable={false}
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                      : NoPoster
                  }
                />
                <div className="movie-header-description-container">
                  <h1>{movieName}</h1>
                  <div className="movie-header-description">
                    <Link
                      to={{ pathname: `/year/${releaseYear}` }}
                      className="additional-link"
                    >
                      <p className="marginTopBot">{releaseYear}</p>
                    </Link>
                    {runtime ? (
                    <span>{`${Math.floor(runtime / 60)}h ${
                      runtime % 60
                    }min`}</span>
                    ) : null}
                    {movie.genres.length ? (
                      <Box>
                        {movie.genres.map((el, i) => {
                          return (
                            <Link
                              to={{ pathname: `/genre/${el.id}` }}
                              key={i}
                              className="additional-link"
                            >
                              <p>{el.name}</p>
                            </Link>
                          );
                        })}
                      </Box>
                    ) : null}
                    <CircularProgress
                      min={0}
                      max={10}
                      value={movie.vote_average}
                      size="53px"
                      mt="1rem"
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
                        pt="4px"
                        color="whiteAlpha.900"
                      >
                        {movie.vote_average.toFixed(1)}
                      </CircularProgressLabel>
                    </CircularProgress>
                    <button onClick={onOpen}>
                      <FiPlayCircle />
                      <FiPlay />
                      Play Trailer
                    </button>
                    <Modal
                      isOpen={isOpen}
                      onClose={onClose}
                      size="2xl"
                      isCentered
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader fontSize=".8rem">{movieName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <div className="video-container">
                            <iframe
                              title={movieName}
                              id="videoIframe"
                              src={linkKey}
                              frameBorder="0"
                              allowFullScreen
                            ></iframe>
                          </div>
                        </ModalBody>
                        <ModalFooter />
                      </ModalContent>
                    </Modal>
                    <h3>overview</h3>
                    <Text
                      color="whiteAlpha.900"
                      className="movie-header-description-overview"
                    >
                      {movie?.overview}
                    </Text>
                    {directors.length ? (
                      <>
                        {directors.length > 1 ? (
                          <Text
                            color="whiteAlpha.900"
                            className="subject-heading"
                          >
                            Directors
                          </Text>
                        ) : (
                          <Text
                            color="whiteAlpha.900"
                            className="subject-heading"
                          >
                            Director
                          </Text>
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
                          <Text
                            color="whiteAlpha.900"
                            className="subject-heading"
                          >
                            Writers
                          </Text>
                        ) : (
                          <Text
                            color="whiteAlpha.900"
                            className="subject-heading"
                          >
                            Writer
                          </Text>
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
    </>
  );
};

export default MovieInfo;
