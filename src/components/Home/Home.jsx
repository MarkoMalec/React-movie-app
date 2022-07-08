import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { Container, Spinner, Center } from '@chakra-ui/react';
import { ImEyePlus, ImEyeBlocked } from 'react-icons/im';
import SearchBar from '../elements/SearchBar/SearchBar';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
import NoPoster from '../../assets/NoPoster/no_poster.png';
import './Home.scss';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const { addItemToWatchlist, watchlist } = useContext(GlobalContext);
  const { removeItemFromWatchList } = useContext(GlobalContext);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    initialFetch(endpoint);
  }, []);

  useEffect(() => {
    if (movies.length) {
      const scrollPosition = sessionStorage.getItem('ScrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 1));
        sessionStorage.removeItem('ScrollPosition');
      }
    }
  }, [movies]);

  const searchMovies = searchTerm => {
    let endpoint = '';
    setSearchTerm(searchTerm);
    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      setCurrentPage(1);
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    searchFetch(endpoint);
  };

  const loadMoreItems = () => {
    let endpoint = '';
    if (searchTerm === '') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        currentPage + 1
      }`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${
        currentPage + 1
      }`;
    }
    setCurrentPage(prev => prev + 1);
    loadMoreFetch(endpoint);
  };
  

  ////////// fetches ///////////

  const initialFetch = endpoint => {
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setMovies(result.results);
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
        setMovies(result.results);
        setTotalPages(result.total_pages);
      })
      .catch(error => console.log(error));
  };

  const loadMoreFetch = endpoint => {
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setMovies([...movies, ...result.results]);
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
      <SearchBar placeholder="Search for a movie" callback={searchMovies} />
      <Container as="main">
        <ThumbnailGrid
          preHeader={searchTerm ? 'Search Result for ' : null}
          header={searchTerm ? `"${searchTerm}"` : 'Trending Movies'}
          loading={loading}
        >
          {movies?.map((element, i) => {
            let storedMovie = watchlist.find(o => o.id === element.id);
            const watchlistDisabled = storedMovie ? true : false;

            return (
              <div key={i} className="watchlist-thumbnail-wrapper">
                <ul className="watchlist-controlls">
                  {!watchlistDisabled ? (
                    <li onClick={() => {addItemToWatchlist(element)}}>
                      <ImEyePlus />
                    </li>
                  ) : (
                    <li onClick={() => removeItemFromWatchList(element.id)}>
                      <ImEyeBlocked />
                    </li>
                  )}
                </ul>
                <Thumbnail
                  // key={i}
                  clickable={true}
                  image={
                    element.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}`
                      : NoPoster
                  }
                  movieId={element.id}
                  movieName={element.title}
                  originalTitle={element.original_title}
                  releaseDate={element.release_date}
                  voteAverage={element.vote_average}
                  tvShow={false}
                  handleClick={() =>
                    sessionStorage.setItem('scrollPosition', window.pageYOffset)
                  }
                />
              </div>
            );
          })}
        </ThumbnailGrid>
        {currentPage < totalPages && !loading ? (
          <LoadMoreButton onClick={loadMoreItems} text="Load more movies" />
        ) : null}
      </Container>
    </>
  );
};

export default Home;
