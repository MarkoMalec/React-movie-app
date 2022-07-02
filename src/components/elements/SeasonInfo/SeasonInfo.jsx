import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import { Container, Flex, Box, Text } from '@chakra-ui/react';
import NoPoster from '../../../assets/NoPoster/no_poster.png';
import './SeasonInfo.scss';

const SeasonInfo = ({
  seasonId,
  season,
  posterPath,
  seasonName,
  airDate,
  overview,
  seasonEpisodes
}) => {
  return (
    <>
      <div className="wrapperW100">
        <Container as="main" className="season-info-container">
          <Flex
            flexShrink="shrink"
            gap="2.5rem"
            className="season-info-details"
          >
            <img
              src={`${IMAGE_BASE_URL}${POSTER_SIZE}${posterPath}`}
              alt={seasonName}
            />
            <div>
              <h2>{seasonName}</h2>
              <div className="season-data">
                <h4>Airdate: </h4>
                <span>{airDate}</span>
                <h4>Number of episodes: </h4>
                <span>{seasonEpisodes.length}</span>
              </div>
              <h3>overview</h3>
              <p>{overview}</p>
            </div>
          </Flex>
        </Container>
      </div>
    </>
  );
};

export default SeasonInfo;
