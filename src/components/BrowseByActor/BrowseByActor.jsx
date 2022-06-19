import { React, useState, useEffect } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { useLocation, useParams } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

const BrowseByActor = () => {
  const [actor, setActor] = useState(null);

  const { actorId } = useParams();

  useEffect(() => {
    const personEndpoint = `${API_URL}person/${actorId}?api_key=${API_KEY}`;
    fetchActor(personEndpoint);
  }, []);

  const fetchActor = async personEndpoint => {
    try {
      const result = await (await fetch(personEndpoint)).json();
      setActor(result);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <Container pt={100}>
      <div>
        <img src={`${IMAGE_BASE_URL}${POSTER_SIZE}${actor?.profile_path}`} />
      </div>
    </Container>
  );
};

export default BrowseByActor;
