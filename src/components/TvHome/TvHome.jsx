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
      <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 83.4 94.4"
              className='section_icon'
            >
              <g>
                <path
                  d="M790-287c3.49-.18,5.38,1.82,4.83,5.25q-2.93,18.27-5.92,36.54c-.63,3.82-2.82,5.4-6.64,5.08l-32.69-2.71c-3.74-.31-7.48-.6-11.2-1-2.68-.31-3.91-1.46-4.48-4.08-.74-3.5-1-7.07-1.48-10.61-.79-5.79-1.5-11.58-2.24-17.37a9.32,9.32,0,0,1-.1-1.05c-.09-3.31,1.31-5,4.59-5.29,6-.55,12-1,18-1.54q11.83-1,23.69-2Zm-13.46,4.91c-.28,0-.57,0-.85.05l-30.25,2.56c-2.67.23-5.36.42-8,.79-1.92.26-2.73,1.34-2.78,3.27a10.8,10.8,0,0,0,.06,1.27q.54,5,1.1,9.91c.48,4.4.94,8.8,1.47,13.19.3,2.49,1.32,3.5,3.64,3.82.39,0,.77.12,1.16.15q14.27,1.37,28.53,2.74c3.23.31,4.85-.9,5.32-4.15q2.15-14.86,4.25-29.72C780.53-280.8,779.19-282.2,776.53-282.06Zm14.52,7.86a3.27,3.27,0,0,0-3.37-3.32,4.06,4.06,0,0,0-3.95,4,3.32,3.32,0,0,0,3.33,3.28A4.07,4.07,0,0,0,791.05-274.2Zm-3.65,12.47a1.63,1.63,0,0,0-1.63-1.7,2,2,0,0,0-2,1.87,1.66,1.66,0,0,0,1.67,1.78A2.09,2.09,0,0,0,787.4-261.73Z"
                  transform="translate(-721.05 319.64)"
                  style={{fill:'tomato'}}
                />
                <path
                  d="M768.55-286.28,753.7-284.8c.18-3,3-5.87,6.23-6.39A7.8,7.8,0,0,1,768.55-286.28Z"
                  transform="translate(-721.05 319.64)"
                  style={{fill:'tomato'}}
                />
                <path
                  d="M756.82-290.6l-1.51,1.11-8.8-7.64-21.32-18.52a4.81,4.81,0,0,1-.48-.42c-.16-.19-.59-.3-.34-.65s.56,0,.76.16c2.94,2.39,5.86,4.8,8.79,7.19C741.52-303.13,749.13-296.9,756.82-290.6Z"
                  transform="translate(-721.05 319.64)"
                  style={{fill:'tomato'}}
                />
                <path
                  d="M767.84-289l-1.42-1.23,34.68-22.64c.71.51.08.69-.21.9-2.54,1.78-5.1,3.55-7.65,5.33l-24.46,17Z"
                  transform="translate(-721.05 319.64)"
                  style={{fill:'tomato'}}
                />
                <path
                  d="M777.56-239.56l4.51.42v13.87c-1.52.12-1.78,0-2.06-1.54C779.2-231,778.4-235.2,777.56-239.56Z"
                  transform="translate(-721.05 319.64)"
                  style={{fill:'tomato'}}
                />
                <path
                  d="M744.34-242.46l-2.75,9.69A3.16,3.16,0,0,1,740-233c.32-3.16.65-6.35,1-9.66Z"
                  transform="translate(-721.05 319.64)"
                  style={{fill:'tomato'}}
                />
                <path
                  d="M724.3-317.9,723-316.67l-1.91-1.65,1.18-1.32A15.36,15.36,0,0,1,724.3-317.9Z"
                  transform="translate(-721.05 319.64)"
                  style={{fill:'tomato'}}
                />
                <path
                  d="M803.58-315l.87,1.11-2.08,1.44-.87-1.07A10.9,10.9,0,0,1,803.58-315Z"
                  transform="translate(-721.05 319.64)"
                  style={{fill:'tomato'}}
                />
                <path
                  d="M778-276.87a3.71,3.71,0,0,1,.18,2.49q-1.65,11.76-3.34,23.52c-.1.66-.21,1.32-.35,2-.51,2.39-1.8,3.32-4.25,3.1l-11.2-1.05q-7.44-.71-14.88-1.45a2.11,2.11,0,0,1-1.51-.56,4,4,0,0,1,2.35-.47c6.4.3,12.8.52,19.2.6,1.42,0,2.84.06,4.25,0,2.32-.09,3.5-.92,4-3.17.75-3.12,1.31-6.29,1.94-9.45.94-4.64,1.85-9.28,2.81-13.92A2.13,2.13,0,0,1,778-276.87Z"
                  transform="translate(-721.05 319.64)"
                  style={{fill:'tomato'}}
                />
                <path
                  d="M778.38-279.75a1.46,1.46,0,0,1-.25,2.34C777.43-278.19,777.49-278.86,778.38-279.75Z"
                  transform="translate(-721.05 319.64)"
                  style={{fill:'tomato'}}
                />
              </g>
            </svg>
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
