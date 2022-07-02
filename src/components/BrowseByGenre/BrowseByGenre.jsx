import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from "../../fetch";
import Thumbnail from "../elements/Thumbnail/Thumbnail";
import ThumbnailGrid from "../elements/ThumbnailGrid/ThumbnailGrid";
import { Container, Flex, Spinner } from "@chakra-ui/react";
import LoadMoreButton from "../elements/LoadMoreButton/LoadMoreButton";
import NoPoster from '../../assets/NoPoster/no_poster.png';

const BrowseByGenre = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState('');
  const { genreId } = useParams();

  useEffect(() => {
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=1`;
    const endpointName = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`;
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(res => {
        setMovies(res.results);
        setCurrentPage(res.page);
        setTotalPages(res.total_pages);
        fetchGenreName(endpointName, genreId);
        setLoading(false);
        console.log(res)
      })
      .catch(error => console.log(error));
  }, [genreId]);

  const fetchItems = async endpoint => {
    try {
      const result = await (await fetch(endpoint)).json();
      setMovies([...movies, ...result.results]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGenreName = async (endpointName, genreId) => {
    try {
        const genreName = await (await fetch(endpointName)).json();
        const genreArray = genreName.genres.filter(
            (member) => member.id === parseInt(genreId)
        );
        if(genreArray.length) {
            setGenre(genreArray[0].name)
        }
    } catch(error) {
        console.log(error);
    }
  }

  const loadMoreItems = () => {
    let endpoint = '';
    setLoading(true);
    endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&with_genres=${genreId}&page=${
      currentPage + 1
    }`;
    setCurrentPage(prev => prev + 1);
    fetchItems(endpoint);
  };

  return(
    <>
        <Container as="main" mt="-2.5rem">
        <ThumbnailGrid
          preHeader={'Browse by genre'}
          header={genre}
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
        <Flex justifyContent='center'>
          {loading ? <Spinner size='xl' /> : null}
        </Flex>
        {currentPage < totalPages && !loading ? (
          <LoadMoreButton onClick={loadMoreItems} text='Load more movies' />
        ) : null}
      </Container>
    </>
  )

}

export default BrowseByGenre;