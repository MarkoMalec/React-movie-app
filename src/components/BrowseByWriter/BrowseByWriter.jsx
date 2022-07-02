import React, { useState, useEffect } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from '@chakra-ui/react';
import PersonHeader from '../elements/PersonHeader/PersonHeader';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import NoPoster from '../../assets/NoPoster/no_poster.png';

const BrowseByWriter = () => {
  const [writer, setWriter] = useState(null);
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const { writerId } = useParams();

  useEffect(() => {
    const endpoint = `${API_URL}person/${writerId}/movie_credits?api_key=${API_KEY}&language=en-US`;
    const personEndpoint = `${API_URL}person/${writerId}?api_key=${API_KEY}`;
    fetchItems(endpoint);
    fetchWriters(personEndpoint);
  }, [writerId]);

  const fetchWriters = async personEndpoint => {
    const personResult = await (await fetch(personEndpoint)).json();
    try {
      setWriter(personResult);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchItems = async endpoint => {
    try {
      const result = await (await fetch(endpoint)).json();
      const writtenMovies = result.crew.filter(
        member => member.job === 'Screenplay'
      );
      setMovies(writtenMovies);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container pt={120}>
        {loading ? (
          <Spinner color="brand.main" size="xl" />
        ) : (
          <div className="person-page-container">
            <PersonHeader
              name={writer?.name}
              birthday={writer?.birthday}
              deathday={writer?.deathday}
              biography={writer?.biography}
              place_of_birth={writer?.place_of_birth}
              gender={writer?.gender}
              profile_path={writer?.profile_path}
              imdb={writer?.imdb_id}
              tmdb={writer}
              homepage={writer?.homepage}
            />
            <ThumbnailGrid
              preHeader="Movies directed by "
              header={writer?.name}
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
                    voteAverage={el?.vote_average.toFixed(1)}
                  />
                );
              })}
            </ThumbnailGrid>
          </div>
        )}
      </Container>
    </>
  );
};

export default BrowseByWriter;
