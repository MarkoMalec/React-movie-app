import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { Box, Text } from '@chakra-ui/react';
import Thumbnail from '../Thumbnail/Thumbnail';
import NoPoster from '../../../assets/NoPoster/no_poster.png';

const SimilarShowsSlider = ({ similarShows }) => {
  return (
    <Box mt="5rem">
      <Text fontSize="xl" mb="1rem">
        Related Shows
      </Text>
      <Splide
      className="similar_screenplay_splide"
        options={{
          gap: '1rem',
          perPage: 5,
          Width: '100vw',
          autoplay: true,
          rewind: true,
          padding: '3rem',
          arrows: false,
          breakpoints: {
            991: {
              perPage: 3,
              arrows: true,
            },
            678: {
              perPage: 2,
              autoplay: false,
            }
          },
        }}
      >
        {similarShows?.map(el => (
          <SplideSlide key={el.id}>
            <Link to={{ pathname: `/tv/${el.id}` }}>
              <Thumbnail
                movieName={el.name}
                image={
                  el.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${el.poster_path}`
                    : NoPoster
                }
                // voteAverage={el.vote_average.toFixed(1)}
                releaseDate={el.first_air_date}
              />
            </Link>
          </SplideSlide>
        ))}
      </Splide>
    </Box>
  );
};

export default SimilarShowsSlider;
