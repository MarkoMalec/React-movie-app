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
import pako from 'pako';
// import { setFiles } from '@testing-library/user-event/dist/types/utils';

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState(null);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const movieId = useLocation();

  const urls = [
    'http://files.tmdb.org/p/exports/movie_ids_11_22_2022.json.gz',
  ]
  

  useEffect(() => {
    
    async function exec(i = 0) {
      console.group('file: ', i);
      try {
        
        const res = await fetch(urls[i], {
          mode: 'no-cors'
        });
        // convert to arrayBuffer for further processing
        const buf = await res.arrayBuffer();
        // or get blob using `await res.blob()`
        // and convert blob to arrayBuffer using `await blob.arrayBuffer()`
    
        console.log('input size: ', buf.byteLength);
    
        // decompress file
        const outBuf = pako.inflate(buf);
        // console.log('output size: ', outBuf.byteLength);
    
        // convert arrayBuffer to string
        const str = new TextDecoder().decode(outBuf);
        // console.log('json string', str);
        
        // print json object
        console.log('json object', JSON.parse(str));
      } catch (err) {
        console.error('unable to decompress', err);
      }
      console.groupEnd('file: ', i);
    }

    async function init() {
      for (let i in urls) await exec(i)
    }
    init();

  },[])

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
                  {actors.map(el => {
                    return <Actor key={el.id} actor={el} loading={loading} />;
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
