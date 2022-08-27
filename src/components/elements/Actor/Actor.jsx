import React from 'react';
import { useState, useRef } from 'react';
import { IMAGE_BASE_URL } from '../../../fetch';
import useIntersectionObserver from '../../../hooks/IntersectionObserver';
import { Link } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import ActorMale from '../../../assets/NoActor/male.svg';
import ActorFemale from '../../../assets/NoActor/female.svg';
import './Actor.scss';

const Actor = ({ actor, loading }) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const POSTER_SIZE = 'w342';

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        setIsVisible(true);
        observerElement.unobserve(ref.current);
      }
    }
  });

  return (
    <div className="actor-thumbnail-block" ref={ref}>
      {loading ? null : (
        <>
          <Link to={{ pathname: `/actor/${actor.id}`, name: `${actor.name}` }}>
            {isVisible && (
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
            )}
          </Link>
          <div className="actor-thumbnail-description">
            <h3>{actor.name}</h3>
            <Text color="whiteAlpha.900">
              <span>as </span>
              {actor.character ? `${actor.character}` : ' Unknown'}
            </Text>
          </div>
        </>
      )}
    </div>
  );
};

export default Actor;
