import React from 'react';
import { IMAGE_BASE_URL } from '../../../fetch';
import { Link } from 'react-router-dom';
import { Text, Container, Spinner } from '@chakra-ui/react';
import ActorMale from './male.svg';
import ActorFemale from './female.svg';
import './Actor.scss';

const Actor = ({ actor, loading }) => {
  const POSTER_SIZE = 'w342';

  return (
    <div className="actor-thumbnail-block">
      {loading ? null : (
        <>
          <Link to={{ pathname: `/actor/${actor.id}`, name: `${actor.name}` }}>
            <img
              src={
                actor.profile_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                  : actor.gender === 2
                  ? ActorMale
                  : ActorFemale
              }
              alt={actor.name}
              className="actor-thumbnail-img"
            />
          </Link>
          <div className="actor-thumbnail-description">
            <h3>{actor.name}</h3>
            <Text color="whiteAlpha.900">
              <span>as </span>
              {actor.character}
            </Text>
          </div>
        </>
      )}
    </div>
  );
};

export default Actor;
