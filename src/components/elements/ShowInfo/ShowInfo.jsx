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
  Spinner,
} from '@chakra-ui/react';
import '@splidejs/react-splide/css';
import { FiPlayCircle, FiPlay } from 'react-icons/fi';
import SeasonsSlider from '../Sliders/SeasonsSlider';
import Thumbnail from '../Thumbnail/Thumbnail';
import NoPoster from '../../../assets/NoPoster/no_poster.png';
import '../../../styles/shared/screenplayInfo.scss';
import './ShowInfo.scss';

const ShowInfo = ({
  show,
  showName,
  networks,
  creators,
  producers,
  showSeasonsAmount,
  showSeasons,
  airDate,
  videos,
}) => {
  const headerBackground = {
    backgroundImage: `url("${IMAGE_BASE_URL}${BACKDROP_SIZE}${show.backdrop_path}")`,
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

  if (!show) {
    return <Spinner size="xl" color="tomato" />;
  }

  return (
    <>
      <div
        className="screenplay-header-wrapper"
        style={
          show.backdrop_path ? headerBackground : { backgroundColor: '#141821' }
        }
      >
        <div className="screenplay-header-filter">
          <Container pt={150}>
            <Center>
              <div className="screenplay-header-flex-container">
                <div className="show-thumbnail-wrapper">
                  <Thumbnail
                    clickable={false}
                    image={
                      show.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                        : NoPoster
                    }
                  />
                  {networks ? (
                    <div className="network-banner">
                      {networks.map(el => (
                        <div key={el.id}>
                          <img
                            src={`${IMAGE_BASE_URL}w500/${el.logo_path}`}
                            alt={el.name}
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="screenplay-header-description-container">
                  <h1>{showName}</h1>
                  <div className="screenplay-header-description">
                    <Link
                      to={{ pathname: `/year/${airDate}` }}
                      className="additional-link"
                    >
                      <p className="marginTopBot">{airDate}</p>
                    </Link>

                    <span>
                      {showSeasonsAmount}{' '}
                      {showSeasonsAmount > 1 ? 'Seasons' : 'season'}
                    </span>
                    {show.genres.length ? (
                      <Box>
                        {show.genres.map((el, i) => {
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
                      value={show.vote_average}
                      size="53px"
                      mt="1rem"
                      trackColor="#1A202C"
                      color={
                        show.vote_average >= 7.5
                          ? 'green'
                          : show.vote_average >= 5
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
                        {show.vote_average.toFixed(1)}
                      </CircularProgressLabel>
                    </CircularProgress>
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
                        <ModalHeader fontSize=".8rem">{showName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <div className="video-container">
                            <iframe
                              title={showName}
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
                      {show.overview
                        ? `${show.overview}`
                        : 'No description provided for this show :('}
                    </Text>
                    {creators ? (
                      <>
                        <Text
                          color="whiteAlpha.900"
                          className="subject-heading"
                        >
                          {creators.length > 1 ? 'creators' : 'creator'}
                        </Text>
                        <Box>
                          {creators.map((el, i) => {
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
                        </Box>
                      </>
                    ) : null}
                    {producers ? (
                      <>
                        <Text
                          color="whiteAlpha.900"
                          className="subject-heading"
                        >
                          {producers.length > 1 ? 'producers' : 'producer'}
                        </Text>
                        <Box>
                          {producers.map((el, i) => {
                            return (
                              <Link
                                to={{ pathname: `/person/${el.id}` }}
                                key={i}
                                className="additional-link"
                              >
                                <p>{el.name}</p>
                              </Link>
                            );
                          })}
                        </Box>
                      </>
                    ) : null}
                    <h3>Season Showcase</h3>
                    <SeasonsSlider showSeasons={showSeasons} />
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

export default ShowInfo;
