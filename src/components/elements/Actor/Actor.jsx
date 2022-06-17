import React from 'react';
import { IMAGE_BASE_URL } from '../../../fetch';
import { Link } from 'react-router-dom';
import ActorMale from './male.svg';
import ActorFemale from './female.svg';
import './Actor.css';

const Actor = ({ actor }) => {
  const POSTER_SIZE = 'w342';

  return (
    <div className="actor-thumbnail-block">
      <Link to={{ pathname: `/actor/${actor.id}`, name: `${actor.name}` }}>
        <img
          src={
            actor.profile_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
              : actor.gender === 1
              ? ActorFemale
              : ActorMale
          }
          alt={actor.name}
          className='actor-thumbnail-img'
        />
      </Link>
      <div className='actor-thumbnail-description'>
        <p>{actor.name}</p>
      </div>
    </div>
  );
};

export default Actor;
