import React from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL, API_KEY } from '../../fetch';
import { useState, useEffect } from 'react';
import { Container, Center, Spinner, Text } from '@chakra-ui/react';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Actor from '../elements/Actor/Actor';
import ShowInfo from '../elements/ShowInfo/ShowInfo';

const Show = () => {
  const [show, setShow] = useState(null);
  const [actors, setActors] = useState(null);
  const [directors, setDirectors] = useState([]);
  const [writers, setWriters] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const showId = useLocation();

  useEffect(() => {
    const endpoint = `${API_URL}${showId.pathname}?api_key=${API_KEY}&language=en-US`;
    const fetchItems = async endpoint => {
      try {
        const result = await (await fetch(endpoint)).json();
        if (result.status_code) {
          return <Spinner size="xl" />;
        } else {
          setShow(result);
          const creditsEndpoint = `${API_URL}${showId.pathname}/credits?api_key=${API_KEY}`;
          const videosEndpoint = `${API_URL}${showId.pathname}/videos?api_key=${API_KEY}`;
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
        console.log('error: ', error);
      }
    };
    fetchItems(endpoint);
    window.scrollTo({
      top: -50,
    });
  }, [showId]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" color="brand.700" />
      </Center>
    );
  }

  return (
    <>
      {show && videos ? (
        <>
          <ShowInfo
            show={show}
            showName={show.name}
            airDate={show.first_air_date.slice(0, 4)}
            showSeasonsAmount={show.number_of_seasons}
            showSeasons={show.seasons}
            directors={directors}
            videos={videos}
            loading={loading}
          />
          {actors ? (
            <Container as="main">
              <ThumbnailGrid header="Cast">
                {actors.map((el, i) => {
                  return <Actor key={i} actor={el} loading={loading} />;
                })}
              </ThumbnailGrid>
            </Container>
          ) : (
            <Text as="h2" color="whiteAlpha.800">
              No cast provided for this title.
            </Text>
          )}
        </>
      ) : null}
    </>
  );
};

export default Show;
