import { React, useState, useEffect } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { useParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import PersonHeader from '../elements/PersonHeader/PersonHeader';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import NoPoster from './no_poster.png';
import './BrowseByActor.scss';

const BrowseByActor = () => {
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const { actorId } = useParams();

  useEffect(() => {
    const personEndpoint = `${API_URL}person/${actorId}?api_key=${API_KEY}`;
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&with_cast=${actorId}&language=en-US&&sort_by=release_date.desc&page=1`;
    fetchItems(endpoint);
    fetchActor(personEndpoint);
  }, [actorId]);

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
      setMovies(result.results);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Container pt={120}>
      <div className='person-page-container'>
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
      <ThumbnailGrid
        preHeader="Starring "
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
      </div>
    </Container>
  );
};

export default BrowseByActor;
