import React from 'react';
import { IMAGE_BASE_URL } from '../../../fetch';
import { Flex, Text } from '@chakra-ui/react';
import NoPoster from '../../../assets/NoPoster/no_poster.png';
import './ShowInfoMore.scss';

const ShowInfoMore = ({
  showName,
  originalName,
  voteCount,
  lastEpisode,
  nextEpisode,
  productionCompanies,
  productionCountries,
  homepage,
}) => {
  return (
    <>
      <div className="show-info-more-card">
        <h2>More details</h2>
        <div className="show-info-more-container">
          <Text color="whiteAlpha.900" className="subject-heading">
            Original name
          </Text>
          <p>{originalName ? originalName : showName}</p>
          <Text color="whiteAlpha.900" className="subject-heading">
            User votes
          </Text>
          <p>{voteCount ? voteCount : 'Nobody has voted yet'}</p>
          {nextEpisode ? (
            <>
              <Text color="whiteAlpha.900" className="subject-heading">
                Next episode
              </Text>
              <p>
                Season {nextEpisode.season_number} Episode{' '}
                {nextEpisode.episode_number}
              </p>
              <p>{nextEpisode.air_date}</p>
            </>
          ) : null}
          <Text color="whiteAlpha.900" className="subject-heading">
            Last aired episode
          </Text>
          {lastEpisode ? (
            <>
              <p>
                Season {lastEpisode.season_number} Episode{' '}
                {lastEpisode.episode_number}
              </p>
              <p>{lastEpisode.air_date}</p>
            </>
          ) : null}
          <Text color="whiteAlpha.900" className="subject-heading">
            Production studios
          </Text>
          {productionCompanies ? (
            <div className="show-production-companies">
              {productionCompanies.slice(0, 1).map(el => (
                <div key={el.id}>
                  <img
                    src={
                      el.logo_path
                        ? `${IMAGE_BASE_URL}w154/${el.logo_path}`
                        : NoPoster
                    }
                    alt={el.name}
                  />
                  <p>{el.name}</p>
                </div>
              ))}
            </div>
          ) : (
            'Unknown'
          )}
          <Text color="whiteAlpha.900" className="subject-heading">
            {productionCountries.length > 1 ? 'Countries' : 'Country'}
          </Text>
          {productionCountries ? (
            <>
              {productionCountries.map((el, i) => (
                <p key={i}>{el.name}</p>
              ))}
            </>
          ) : (
            'Unknown'
          )}

          {homepage ? (
            <>
              <Text color="whiteAlpha.900" className="subject-heading">
                Other links
              </Text>

              <Flex color="brand.600">
                <a
                  className="additional-link"
                  href={`${homepage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Text>Homepage</Text>
                </a>
              </Flex>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ShowInfoMore;
