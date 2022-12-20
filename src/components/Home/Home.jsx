import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { Container, Spinner, Center } from '@chakra-ui/react';
import SearchBar from '../elements/SearchBar/SearchBar';
import TrendingTodayMovie from '../elements/TrendingToday/TrendingTodayMovie';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
import AddToWatchlist from '../WatchList/WatchlistComponents/AddToWatchlist';
import NoPoster from '../../assets/NoPoster/no_poster.png';
import './Home.scss';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Popular');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    initialFetch(endpoint);
  }, []);

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
    if (searchTerm === '' && activeTab === 'Popular') {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        currentPage + 1
      }`;
    }
    else if (searchTerm === '' && activeTab === 'In Theaters') {
      endpoint = `${API_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=${
        currentPage + 1
      }`;
    }
    else {
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
      .catch(error => console.error(error));
  };

  const searchFetch = endpoint => {
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setMovies(result.results);
        setTotalPages(result.total_pages);
      })
      .catch(error => console.error(error));
  };

  const loadMoreFetch = endpoint => {
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setMovies([...movies, ...result.results]);
      })
      .catch(error => console.error(error));
  };

  const handlePopularTab = () => {
    setActiveTab('Popular');
  };
  const handleTheatersTab = () => {
    setActiveTab('In Theaters');
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
      <TrendingTodayMovie />
      <SearchBar placeholder="Search for a movie" callback={searchMovies} />
      <Container as="main">
      <ul className="tabs-navigation on_home">
            <li
              onClick={handlePopularTab}
              className={activeTab === 'Popular' ? 'active' : ''}
            >
              <p>Popular</p>
            </li>
            <li
              onClick={handleTheatersTab}
              className={activeTab === 'In Theaters' ? 'active' : ''}
            >
              <p>In Theaters</p>
            </li>
            <li className='slide-indicator'></li>
          </ul>
          {/* <div className="tabs-outlet">
            {activeTab === 'Movies' ? (
              <BrowseByActorMovies person={actor} />
            ) : (
              <BrowseByActorTV person={actor} />
            )}
          </div> */}
          {activeTab === 'Popular' ? (
        <ThumbnailGrid
          preHeader={searchTerm ? 'Search Result for ' : null}
          header={searchTerm ? `"${searchTerm}"` : 'Trending Movies'}
          loading={loading}
        >
          {movies?.map((element, i) => {
            return (
              <span key={i}>
                <AddToWatchlist movie={element} />
                <Thumbnail
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
                />
              </span>
            );
          })}
        </ThumbnailGrid>
        

          ) : (
            <p>kekw</p>
          )}
          {currentPage < totalPages && !loading ? (
            <LoadMoreButton onClick={loadMoreItems} text="Load more movies" />
          ) : null}
      </Container>
    </>
  );
};

export default Home;
