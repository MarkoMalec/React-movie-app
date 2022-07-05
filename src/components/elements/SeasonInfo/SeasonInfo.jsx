import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import { Container, Flex } from '@chakra-ui/react';
import NoPoster from '../../../assets/NoPoster/no_poster.png';
import './SeasonInfo.scss';

const SeasonInfo = ({
  posterPath,
  seasonName,
  airDate,
  overview,
  seasonEpisodes,
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
              src={posterPath ? `${IMAGE_BASE_URL}${POSTER_SIZE}${posterPath}` : NoPoster}
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
              <p>
                {overview
                  ? `${overview}`
                  : 'The show has not provided any description for this season :('}
              </p>
            </div>
          </Flex>
        </Container>
      </div>
    </>
  );
};

export default SeasonInfo;
