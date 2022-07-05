import React, { useEffect, useState } from 'react';
import { API_KEY, API_URL, POSTER_SIZE, IMAGE_BASE_URL } from '../../fetch';
import { Container, Center, Spinner } from '@chakra-ui/react';
import SearchBar from '../elements/SearchBar/SearchBar';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
import NoPoster from '../../assets/NoPoster/no_poster.png';

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

  const searchShows = searchTerm => {
    let endpoint = '';
    setSearchTerm(searchTerm);
    if (searchTerm === '') {
      endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      setCurrentPage(1);
      endpoint = `${API_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    searchFetch(endpoint);
  };

  const loadMoreItems = () => {
    let endpoint = '';
    if (searchTerm === '') {
      endpoint = `${API_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${
        currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/tv?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${
        currentPage + 1
      }`;
    }
    setCurrentPage(prev => prev + 1);
    loadMoreFetch(endpoint);
  };

  ////// FETCHES ////////

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
          setLoading(false);
        }, 300)
      )
      .catch(error => console.log(error));
  };

  const searchFetch = endpoint => {
    fetch(endpoint)
    .then(resolve => resolve.json())
    .then(result => {
      setShows(result.results);
      setTotalPages(result.total_pages);
    })
    .catch(error => console.log(error));
  };
  
  const loadMoreFetch = endpoint => {
    fetch(endpoint)
    .then(resolve => resolve.json())
    .then(result => {
      setShows([...shows, ...result.results])
    })
    .catch(error => console.log(error));
};

if (loading) {
  return (
    <Center h="100vh">
      <Spinner thickness="4px" speed="0.65s" color="brand.700" size="xl" />
    </Center>
  );
}

  return (
    <>
      <SearchBar placeholder="Search for a TV show" callback={searchShows} />
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
        {currentPage < totalPages && !loading ? (
          <LoadMoreButton onClick={loadMoreItems} text="Load more shows" />
        ) : null}
      </Container>
    </>
  );
};

export default TvHome;
