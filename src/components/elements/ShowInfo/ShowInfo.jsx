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
import './ShowInfo.scss';

const ShowInfo = ({
  show,
  showName,
  showSeasonsAmount,
  airDate,
  videos
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
  return (
    <>
      <div
        className="movie-header-wrapper"
        style={
          show.backdrop_path
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
                    show.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                      : NoPoster
                  }
                />
                <div className="movie-header-description-container">
                  <h1>{showName}</h1>
                  <div className="movie-header-description">
                    <Link
                      to={{ pathname: `/year/${airDate}` }}
                      className="additional-link"
                    >
                      <p className="marginTopBot">{airDate}</p>
                    </Link>
                    
                    
                    <span>{showSeasonsAmount} Seasons</span>
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
                    <Text
                      color="whiteAlpha.900"
                      className="movie-header-description-overview"
                    >
                      {show?.overview}
                    </Text>
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
