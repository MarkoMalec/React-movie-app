import { React, useState, useEffect } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { useParams } from 'react-router-dom';
import { Container, Center, Flex, Spinner } from '@chakra-ui/react';
import PersonHeader from '../elements/PersonHeader/PersonHeader';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
import NoPoster from './no_poster.png';
import './BrowseByActor.scss';

const BrowseByActor = () => {
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [activeTab, setActiveTab] = useState('Movies');
  const [loading, setLoading] = useState(true);
  const { actorId } = useParams();

  useEffect(() => {
    const personEndpoint = `${API_URL}person/${actorId}?api_key=${API_KEY}`;
    const movieEndpoint = `${API_URL}discover/movie?api_key=${API_KEY}&with_cast=${actorId}&language=en-US&&sort_by=release_date.desc&page=1`;
    const tvCreditsEndpoint = `${API_URL}person/${actorId}/tv_credits?api_key=${API_KEY}&language=en-US`;
    fetch(movieEndpoint)
      .then(resolve => resolve.json())
      .then(res => {
        setMovies(res.results);
        setCurrentPage(res.page);
        setTotalPages(res.total_pages);
        setLoading(false);
      })
      .catch(error => console.log(error));
    fetchActor(personEndpoint);
    fetchTvCredits(tvCreditsEndpoint);
  }, [actorId]);

  const fetchTvCredits = endpoint => {
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        console.log(result);
        setShows(result.cast);
      });
  };

  const fetchActor = async personEndpoint => {
    try {
      const personResult = await (await fetch(personEndpoint)).json();
      setActor(personResult);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

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
    endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&with_cast=${actorId}&language=en-US&&sort_by=release_date.desc&page=${
      currentPage + 1
    }`;
    setCurrentPage(prev => prev + 1);
    fetchItems(endpoint);
  };

  // Tab switching
  const handleMoviesTab = () => {
    setActiveTab('Movies');
  };
  const handleShowsTab = () => {
    setActiveTab('Shows');
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.700" />
      </Center>
    );
  }

  return (
    <Container pt={120}>
      <div className="person-page-container">
        <PersonHeader
          name={actor?.name}
          birthday={actor?.birthday}
          deathday={actor?.deathday}
          biography={actor?.biography}
          place_of_birth={actor?.place_of_birth}
          gender={actor?.gender}
          profile_path={actor?.profile_path}
          imdb={actor?.imdb_id}
          tmdb={actorId}
          homepage={actor?.homepage}
        />
        <div className='person-page-credits'>
        <ul className="tabs-navigation">
          <li onClick={handleMoviesTab} className={activeTab === 'Movies' ? 'active' : ''}>Movies</li>
          <li onClick={handleShowsTab} className={activeTab === 'Shows' ? 'active' : ''}>TV Shows</li>
        </ul>
        <div className="tabs-outlet">
          {activeTab === 'Movies' ? (
            <ThumbnailGrid
              preHeader="Movies featuring "
              header={actor?.name}
              loading={loading}
            >
              {movies?.map((el, i) => {
                return (
                  <Thumbnail
                    key={i}
                    clickable={true}
                    image={
                      el?.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${el.poster_path}`
                        : NoPoster
                    }
                    movieId={el?.id}
                    movieName={el?.title}
                    originalTitle={el?.original_title}
                    releaseDate={el?.release_date}
                    voteAverage={el?.vote_average}
                  />
                );
              })}
            </ThumbnailGrid>
          ) : (
            <ThumbnailGrid
              preHeader="TV Shows featuring "
              header={actor?.name}
              loading={loading}
            >
              {shows?.map((el, i) => {
                return (
                  <Thumbnail
                    key={el.id}
                    clickable={true}
                    tvShow={true}
                    image={
                      el?.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${el.poster_path}`
                        : NoPoster
                    }
                    movieId={el?.id}
                    movieName={el?.name}
                    showId={el?.id}
                  />
                );
              })}
            </ThumbnailGrid>
          )}
        </div>
        </div>
      </div>
      {currentPage < totalPages && !loading ? (
        <LoadMoreButton onClick={loadMoreItems} text="Load more movies" />
      ) : null}
    </Container>
  );
};

export default BrowseByActor;
