import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
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
import { FiPlayCircle, FiPlay, FiPlus, FiPlusCircle } from 'react-icons/fi';
import Thumbnail from '../Thumbnail/Thumbnail';
import Rating from '../Rating/Rating';
import Vibrant from 'node-vibrant/dist/vibrant';
import NoPoster from '../../../assets/NoPoster/no_poster.png';
import '../../../styles/shared/screenplayInfo.scss';

const MovieInfo = ({
  movie,
  movieName,
  releaseYear,
  runtime,
  videos,
  directors,
  writers,
}) => {
  const { addItemToWatchlist, watchlist } = useContext(GlobalContext);
  let storedMovie = watchlist.find(i => i.id === movie.id);

  const [filter, setFilter] = useState(null);

  useEffect(() => {
    Vibrant.from(`${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`, [1])
      .getPalette()
      .then(palette => setFilter(palette.DarkVibrant));
  }, []);

  const watchlistDisabled = storedMovie ? true : false;

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
        className="screenplay-header-wrapper"
        style={
          movie.backdrop_path
            ? headerBackground
            : { backgroundColor: '#141821' }
        }
      >
        <div
          className="screenplay-header-filter"
          style={{
            backgroundColor: `rgba(${filter?._rgb[0]}, ${filter?._rgb[1]}, ${filter?._rgb[2]}, .9)`,
          }}
        >
          <Container pt={150}>
            <Center>
              <div className="screenplay-header-flex-container">
                <Thumbnail
                  clickable={false}
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                      : NoPoster
                  }
                />
                <div className="screenplay-header-description-container">
                  <h1>{movieName}</h1>
                  <div className="screenplay-header-description">
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
                              key={i}
                              to={{ pathname: `/genre/${el.id}` }}
                              className="additional-link"
                            >
                              <p>{el.name}</p>
                            </Link>
                          );
                        })}
                      </Box>
                    ) : null}
                    <Rating rating={movie.vote_average} />
                    <button
                      className={
                        linkKey !== '' ? 'playBtn' : 'playBtn disabled'
                      }
                      onClick={onOpen}
                    >
                      <FiPlayCircle />
                      <FiPlay />
                      {linkKey !== '' ? 'Play Trailer' : 'Not available'}
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
                      className="screenplay-header-description-overview"
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
                              key={i}
                              to={{ pathname: `/director/${el.id}` }}
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
                              key={i}
                              to={{ pathname: `/writer/${el.id}` }}
                              className="additional-link"
                            >
                              <p>{el.name}</p>
                            </Link>
                          );
                        })}
                      </>
                    ) : null}
                    <button
                      className="playBtn add_to_watchlist-btn"
                      style={
                        !watchlistDisabled
                          ? {}
                          : {
                              pointerEvents: 'none',
                              backgroundColor: '#696969',
                            }
                      }
                      disabled={watchlistDisabled}
                      onClick={() => addItemToWatchlist(movie)}
                    >
                      <FiPlusCircle />
                      <FiPlus />
                      Add to watchlist
                    </button>
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
