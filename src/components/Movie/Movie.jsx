import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL, API_KEY } from '../../fetch';
import { Container, Center, Spinner, Text } from '@chakra-ui/react';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Actor from '../elements/Actor/Actor';
import MovieInfo from '../elements/MovieInfo/MovieInfo';
import MovieInfoMore from '../elements/MovieInfoMore/MovieInfoMore';
import SimilarScreenplay from '../elements/SimilarScreenplay/SimilarScreenplay';
import UserReviews from '../elements/UserReviews/UserReviews';

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState(null);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const movieId = useLocation();

  useEffect(() => {
    const endpoint = `${API_URL}${movieId.pathname}?api_key=${API_KEY}&language=en-US`;
    const fetchItems = async endpoint => {
      try {
        const result = await (await fetch(endpoint)).json();
        if (result.status_code) {
          return <Spinner size="xl" />;
        } else {
          setMovie(result);
          const creditsEndpoint = `${API_URL}${movieId.pathname}/credits?api_key=${API_KEY}`;
          const videosEndpoint = `${API_URL}${movieId.pathname}/videos?api_key=${API_KEY}`;
          const creditsResult = await (await fetch(creditsEndpoint)).json();
          const directors = creditsResult.crew.filter(
            member => member.job === 'Director'
          );
          const writers = creditsResult.crew.filter(
            member => member.job === 'Screenplay'
          );
          const videosResult = await (await fetch(videosEndpoint)).json();

          setActors(creditsResult.cast);
          setDirectors(directors);
          setWriters(writers);
          setVideos(videosResult.results);
          setLoading(false);
        }
      } catch (error) {
        console.error('error: ', error);
      }
    };
    fetchItems(endpoint);
    window.scrollTo({
      top: -50,
    });
  }, [movieId]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.700" />
      </Center>
    );
  }

  return (
    <>
      {movie && videos ? (
        <>
          <MovieInfo
            movie={movie}
            movieName={movie.title}
            releaseYear={movie.release_date.slice(0, 4)}
            runtime={movie.runtime}
            directors={directors}
            writers={writers}
            videos={videos}
            loading={loading}
          />
          <Container className="screenplay-MoreInfo-area" as="main">
            {actors ? (
              <>
                <ThumbnailGrid header="Cast">
                  {actors.map((el, i) => {
                    return <Actor key={i} actor={el} loading={loading} />;
                  })}
                </ThumbnailGrid>
                <MovieInfoMore
                  movieName={movie.title}
                  originalTitle={movie.original_title}
                  revenue={movie.revenue.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                  voteCount={movie.vote_count}
                  productionCompanies={movie.production_companies.slice(0, 1)}
                  productionCountries={movie.production_countries}
                  spokenLanguages={movie.spoken_languages}
                  imdb={movie.imdb_id}
                  homepage={movie.homepage}
                />
              </>
            ) : (
              <Text as="h2" color="whiteAlpha.800">
                No cast provided for this movie.
              </Text>
            )}
          </Container>
        </>
      ) : null}
      <UserReviews />
      <Container as="main">
        <SimilarScreenplay />
      </Container>
    </>
  );
};

export default Movie;
