import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { useParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import PersonHeader from '../elements/PersonHeader/PersonHeader';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import NoPoster from './no_poster.png';

const BrowseByDirector = () => {
  const [director, setDirector] = useState(null);
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const { directorId } = useParams();

  useEffect(() => {
    const endpoint = `${API_URL}person/${directorId}/movie_credits?api_key=${API_KEY}&language=en-US`;
    const personEndpoint = `${API_URL}person/${directorId}?api_key=${API_KEY}`;
    fetchItems(endpoint);
    fetchDirectors(personEndpoint);
  }, []);

  const fetchDirectors = async personEndpoint => {
    const personResult = await (await fetch(personEndpoint)).json();
    try {
      setDirector(personResult);
      console.log(personResult);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchItems = async endpoint => {
    try {
      const result = await (await fetch(endpoint)).json();
      const directedMovies = result.crew.filter(
        member => member.job === 'Director'
      );
      setMovies(directedMovies);
      setLoading(false);
      console.log(directedMovies);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container pt={120}>
      <div className="person-page-container">
        <PersonHeader
          name={director?.name}
          birthday={director?.birthday}
          deathday={director?.deathday}
          biography={director?.biography}
          place_of_birth={director?.place_of_birth}
          gender={director?.gender}
          profile_path={director?.profile_path}
          imdb={director?.imdb_id}
          tmdb={directorId}
          homepage={director?.homepage}
        />
        <ThumbnailGrid
          preHeader="Movies directed by "
          header={director?.name}
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
      </div>
    </Container>
  );
};

export default BrowseByDirector;
