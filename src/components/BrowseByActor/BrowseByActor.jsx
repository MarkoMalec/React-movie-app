import { React, useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../../fetch';
import { useParams } from 'react-router-dom';
import { Container, Center, Spinner } from '@chakra-ui/react';
import PersonHeader from '../elements/PersonHeader/PersonHeader';
import BrowseByActorMovies from './BrowseByActorMovies';
import BrowseByActorTV from './BrowseByActorTV';
import './BrowseByActor.scss';

const BrowseByActor = () => {
  const [actor, setActor] = useState(null);
  const [activeTab, setActiveTab] = useState('Movies');
  const [loading, setLoading] = useState(true);
  const { actorId } = useParams();

  useEffect(() => {
    const personEndpoint = `${API_URL}person/${actorId}?api_key=${API_KEY}`;

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
        <div className="person-page-credits">
          <ul className="tabs-navigation">
            <li
              onClick={handleMoviesTab}
              className={activeTab === 'Movies' ? 'active' : ''}
            >
              Movies
            </li>
            <li
              onClick={handleShowsTab}
              className={activeTab === 'Shows' ? 'active' : ''}
            >
              TV Shows
            </li>
          </ul>
          <div className="tabs-outlet">
            {activeTab === 'Movies' ? (
              <BrowseByActorMovies person={actor} />
            ) : (
              <BrowseByActorTV person={actor} />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BrowseByActor;
