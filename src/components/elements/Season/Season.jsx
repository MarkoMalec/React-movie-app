import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, API_KEY } from '../../../fetch';
import { Spinner, Center } from '@chakra-ui/react';
import SeasonInfo from '../SeasonInfo/SeasonInfo';
import SeasonEpisodes from '../SeasonEpisodes/SeasonEpisodes';

const Season = () => {
  const [season, setSeason] = useState(null);

  const { showId } = useParams();
  const { seasonId } = useParams();

  useEffect(() => {
    let endpoint = `${API_URL}tv/${showId}/season/${seasonId}?api_key=${API_KEY}&language=en-US`;
    fetchSeason(endpoint);
  }, [showId, seasonId]);

  const fetchSeason = async endpoint => {
    await fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setSeason(result);
        console.dirxml(result);
      })
      .catch(error => console.log(error));
  };

  if (!season) {
    return (
      <Center>
        <Spinner color='tomato' size='xl' />
      </Center>
    )
  }

  return (
    <>
      <SeasonInfo
        seasonId={season.id}
        season={season}
        posterPath={season.poster_path}
        seasonName={season.name}
        airDate={season.air_date}
        overview={season.overview}
        seasonEpisodes={season.episodes}
      />
      <SeasonEpisodes 
        seasonEpisodes={season.episodes}
      />
    </>
  );
};

export default Season;
