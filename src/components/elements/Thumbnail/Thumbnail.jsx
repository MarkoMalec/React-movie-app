import React from 'react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  CircularProgress,
  CircularProgressLabel,
  Text,
} from '@chakra-ui/react';
import useIntersectionObserver from '../../../hooks/IntersectionObserver';
import './Thumbnail.scss';

const Thumbnail = ({
  tvShow,
  clickable,
  image,
  movieId,
  releaseDate,
  movieName,
  originalTitle,
  showName,
  voteAverage,
  showId,
  showReleaseDate,
}) => {
  const ref = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        setIsVisible(true);
        observerElement.unobserve(ref.current);
      }
    },
  });

  return (
    <>
      {/* If tvShow prop is false; throw movie thumbnail */}
      {!tvShow ? (
        <div className="thumbnail-block">
          {clickable ? (
            <Link
              to={{ pathname: `/movie/${movieId}`, movieName: `${movieName}` }}
            >
              <div
                className="observer"
                style={{ position: 'absolute' }}
                ref={ref}
              ></div>
              <div className="thumbnail-img-wrap">
                {isVisible && <img src={image} alt={movieName} width='327px' height='490px' />}
              </div>
            </Link>
          ) : (
            <img src={image} alt={movieName} ref={ref} />
          )}
          {movieName ? (
            <div className="thumbnail-description">
              <div className="thumbnail-year">
                <Text color="whiteAlpha.900">
                  {releaseDate ? releaseDate.slice(0, 4) : null}
                </Text>
              </div>
              {clickable ? (
                <Link
                  to={{
                    pathname: `/movie/${movieId}`,
                    movieName: `${movieName}`,
                  }}
                >
                  <h3>{movieName}</h3>
                </Link>
              ) : (
                <h3>{movieName}</h3>
              )}
              {!originalTitle || originalTitle === movieName ? null : (
                <div className="thumbnail-og-title">
                  {' '}
                  Original Title: {originalTitle}
                </div>
              )}
              {voteAverage ? (
                <div className="average-score">
                  <CircularProgress
                    min={0}
                    max={10}
                    value={voteAverage}
                    size="27px"
                    trackColor="#1A202C"
                    color={
                      voteAverage >= 7.5
                        ? 'green'
                        : voteAverage >= 5
                        ? 'yellow'
                        : 'red'
                    }
                    bgColor="rgba(0, 0, 0, .2)"
                    borderRadius="50px"
                    thickness={7}
                  >
                    <CircularProgressLabel
                      color="whiteAlpha.900"
                      fontWeight="700"
                      fontSize=".65rem"
                    >
                      {voteAverage}
                    </CircularProgressLabel>
                  </CircularProgress>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        // if tvShow prop is true; throw Show thumbnail
        <div className="thumbnail-block">
          {clickable ? (
            <Link to={{ pathname: `/tv/${showId}`, showName: `${showName}` }}>
              <div className="thumbnail-img-wrap">
                <img src={image} alt={showName} ref={ref} width='327px' height='490px' />
              </div>
            </Link>
          ) : (
            <img src={image} alt={showName} ref={ref} />
          )}
          {showName ? (
            <div className="thumbnail-description">
              <div className="thumbnail-year">
                <Text color="whiteAlpha.900">
                  {showReleaseDate ? showReleaseDate.slice(0, 4) : null}
                </Text>
              </div>
              {clickable ? (
                <Link
                  to={{ pathname: `/tv/${showId}`, showName: `${showName}` }}
                >
                  <h3>{showName}</h3>
                </Link>
              ) : (
                <h3>{showName}</h3>
              )}
              {originalTitle === showName ? null : (
                <div className="thumbnail-og-title">
                  {' '}
                  Original Title: {originalTitle}
                </div>
              )}
              {voteAverage ? (
                <div className="average-score">
                  <CircularProgress
                    min={0}
                    max={10}
                    value={voteAverage}
                    size="27px"
                    trackColor="#1A202C"
                    color={
                      voteAverage >= 7.5
                        ? 'green'
                        : voteAverage >= 5
                        ? 'yellow'
                        : 'red'
                    }
                    bgColor="rgba(0, 0, 0, .2)"
                    borderRadius="50px"
                    thickness={7}
                  >
                    <CircularProgressLabel
                      color="whiteAlpha.900"
                      fontWeight="700"
                      fontSize=".65rem"
                    >
                      {voteAverage}
                    </CircularProgressLabel>
                  </CircularProgress>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Thumbnail;
