import React from 'react';
import { Link as A, Flex, Text } from '@chakra-ui/react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import Male from '../../../assets/NoActor/male.svg';
import Female from '../../../assets/NoActor/female.svg';
import './PersonHeader.scss';

const PersonHeader = ({
  name,
  profile_path,
  gender,
  biography,
  birthday,
  place_of_birth,
  deathday,
  imdb,
  tmdb
}) => {
  return (
    <div className="person-header">
      <img
        src={
          profile_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${profile_path}`
            : gender === 1
            ? Female
            : Male
        }
        alt={name}
      />
      <div className="person-header-info">
        <div className="person-header-info-name">
          <h3>{name}</h3>
          {''}
          <span>{deathday ? birthday + ' - ' + deathday : birthday}</span>
        </div>
        <h4>Place of birth</h4>
        {place_of_birth ? <p>{place_of_birth}</p> : <p>unknown</p>}
        <div className="person-header-info-biography">
          <h4>biography</h4>
          <p>{biography ? biography : 'No biography available.'}</p>
        </div>
        <h4>more information</h4>
        <Flex color="brand.600">
          <A
            className="additional-link"
            href={`https://www.imdb.com/name/${imdb}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text>IMDB</Text>
          </A>
          <A
            className="additional-link"
            href={`https://www.themoviedb.org/name/${tmdb}/`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Text>TMDB</Text>
          </A>
        </Flex>
      </div>
    </div>
  );
};

export default PersonHeader;
