import React from 'react';
import { Link } from 'react-router-dom';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { IMAGE_BASE_URL } from '../../../fetch';
import './Sliders.scss';
import NoPoster from '../../../assets/NoPoster/no_poster.png';

const SeasonsSlider = ({ showSeasons }) => {
  return (
    <Splide
      options={{
        gap: '1rem',
        perPage: 5,
        Width: '100vw',
        autoplay: true,
        rewind: true,
        breakpoints: {
          991: {
            perPage: 3,
            width: '90vw',
          },
        },
      }}
      className="seasons-splide"
    >
      {showSeasons.map(season => (
        <SplideSlide key={season.id}>
          <Link
            key={season.id}
            to={{ pathname: `season/${season.season_number}` }}
          >
            <img
              src={
                season.poster_path
                  ? `${IMAGE_BASE_URL}w780${season.poster_path}`
                  : NoPoster
              }
              alt={season.name}
            />
            <p>{season.name}</p>
          </Link>
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SeasonsSlider;
