import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { Container, Spinner, Flex } from '@chakra-ui/react';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
import NoPoster from '../../assets/NoPoster/no_poster.png';

const BrowseByYear = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const { yearId } = useParams();

  useEffect(() => {
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&primary_release_year=${yearId}&page=1`;
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(res => {
        setMovies(res.results);
        setCurrentPage(res.page);
        setTotalPages(res.total_pages);
        setLoading(false);
      })
      .catch(error => console.error(error));
  }, [yearId]);

  const fetchItems = async endpoint => {
    try {
      const result = await (await fetch(endpoint)).json();
      setMovies([...movies, ...result.results]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreItems = () => {
    let endpoint = '';
    setLoading(true);
    endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&primary_release_year=${yearId}&page=${
      currentPage + 1
    }`;
    setCurrentPage(prev => prev + 1);
    fetchItems(endpoint);
  };

  return (
    <>
      <Container as="main" mt="-2.5rem">
        <ThumbnailGrid
          preHeader={'Browse by year'}
          header={yearId}
          loading={loading}
        >
          {movies?.map((el, i) => {
            return (
              <Thumbnail
                key={i}
                clickable={true}
                image={
                  el.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${el.poster_path}`
                    : NoPoster
                }
                movieId={el.id}
                movieName={el.title}
                originalTitle={el.original_title}
                releaseDate={el.release_date}
                voteAverage={el.vote_average}
              ></Thumbnail>
            );
          })}
        </ThumbnailGrid>
        <Flex justifyContent="center">
          {loading ? <Spinner size="xl" /> : null}
        </Flex>
        {currentPage < totalPages && !loading ? (
          <LoadMoreButton onClick={loadMoreItems} text="Load more movies" />
        ) : null}
      </Container>
    </>
  );
};

export default BrowseByYear;
