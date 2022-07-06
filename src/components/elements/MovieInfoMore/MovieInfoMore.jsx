import React from 'react';
import { IMAGE_BASE_URL } from '../../../fetch';
import { Text } from '@chakra-ui/react';
import './MovieInfoMore.scss';

const MovieInfoMore = ({
  movieName,
  originalTitle,
  revenue,
  voteCount,
  productionCompanies,
  productionCountries,
  spokenLanguages,
}) => {
  return (
    <>
      <div className="movie-info-more-card">
        <h2>More details</h2>
        <div className="movie-info-more-container">
          <Text color="whiteAlpha.900" className="subject-heading">
            Original title
          </Text>
          <p>{originalTitle ? originalTitle : movieName}</p>
          <Text color="whiteAlpha.900" className="subject-heading">
            Revenue
          </Text>
          <p>{revenue ? revenue : 'Unknown'}</p>
          {voteCount ? (
            <>
              <Text color="whiteAlpha.900" className="subject-heading">
                User votes
              </Text>
              <p>{voteCount}</p>
            </>
          ) : null}
          <Text color="whiteAlpha.900" className="subject-heading">
            Production companies
          </Text>
          {productionCompanies ? (
            <>
              {productionCompanies.map(el => (
                <img
                  key={el.id}
                  src={`${IMAGE_BASE_URL}w154/${el.logo_path}`}
                  alt={el.name}
                />
              ))}
            </>
          ) : (
            'Unknown'
          )}
          {productionCountries ? (
            <>
              <Text color="whiteAlpha.900" className="subject-heading">
                {productionCountries.length > 1
                  ? 'Production Countries'
                  : 'Production Country'}
              </Text>
              {productionCountries.map(el => (
                <p key={el.id}>{el.name}</p>
              ))}
            </>
          ) : null}
          {spokenLanguages ? (
            <>
              <Text color="whiteAlpha.900" className="subject-heading">
                {spokenLanguages.length > 1
                  ? 'Spoken languages'
                  : 'Spoken Language'}
              </Text>
              {spokenLanguages.map(el => (
                <p>{el.name}</p>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default MovieInfoMore;
