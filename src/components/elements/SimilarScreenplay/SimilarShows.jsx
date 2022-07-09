import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import { useLocation, Link } from 'react-router-dom';
import { Box, Text } from '@chakra-ui/react';
import Thumbnail from '../Thumbnail/Thumbnail';
import NoPoster from '../../../assets/NoPoster/no_poster.png';
import './SimilarScreenplay.scss';

const SimilarMovies = () => {
  const [similarShows, setSimilarShows] = useState();
  const currentLocation = useLocation();
  useEffect(() => {
    const endpoint = `${API_URL}${currentLocation.pathname}/similar?api_key=${API_KEY}`;
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setSimilarShows(result.results);
        console.log(result.results);
      });
  }, [currentLocation.pathname]);

  return (
    <Box mt="5rem">
      <Text fontSize="xl" mb="1rem">
        Similar TV Shows
      </Text>
      <div className="similar-screenplay-carousel">
        <div className="similar-screenplay-showcase">
          {similarShows?.map(el => (
            <Link key={el.id} to={{ pathname: `/tv/${el.id}` }}>
              <div className="similar-screenplay-showcase-item">
                <Thumbnail
                  tvShow={true}
                  showName={el.name}
                  originalTitle={el.original_name}
                  image={
                    el.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${el.poster_path}`
                      : NoPoster
                  }
                  voteAverage={el.vote_average.toFixed(1)}
                  showReleaseDate={el.first_air_date}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Box>
  );
};

export default SimilarMovies;
