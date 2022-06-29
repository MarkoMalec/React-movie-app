import React from 'react';
import { useState, useEffect } from 'react';
import { API_KEY, API_URL, POSTER_SIZE, IMAGE_BASE_URL } from '../../fetch';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import NoPoster from './no_poster.png';

const TvHome = () => {
  const [shows, setShows] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    initialFetch(endpoint);
  }, []);

  const initialFetch = endpoint => {
    fetch(endpoint)
    .then(resolve => resolve.json())
    .then(result => {
      setShows(result.results);
      setCurrentPage(result.page);
      setTotalPages(result.total_pages);
    })
    .then(
      setTimeout(() => {
        setLoading(false)
      }, 300)
      )
      .catch(error => console.log(error));
    };

  return (
    <>
      <Container as="main">
        <ThumbnailGrid
          preHeader={searchTerm ? 'Search Result for ' : null}
          header={searchTerm ? `"${searchTerm}"` : 'Trending TV Shows'}
          loading={loading}
        >
          {shows?.map((element, i) => {
            return (
              <Thumbnail
                key={i}
                clickable={true}
                image={
                  element.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                    : NoPoster
                }
                showId={element.id}
                showName={element.name}
                originalTitle={element.original_name}
                showReleaseDate={element.first_air_date}
                voteAverage={element.vote_average}
                tvShow={true}
              />
            );
          })}
        </ThumbnailGrid>
        </Container>
    </>
  );
};

export default TvHome;
