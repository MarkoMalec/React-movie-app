import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import SeasonInfo from '../SeasonInfo/SeasonInfo';

const Season = () => {
  const [season, setSeason] = useState(null);

  const { showId } = useParams();
  const { seasonId } = useParams();

  useEffect(() => {
    let endpoint = `${API_URL}tv/${showId}/season/${seasonId}?api_key=${API_KEY}&language=en-US`;
    fetchSeason(endpoint);
  }, [showId, seasonId]);

  const fetchSeason = endpoint => {
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setSeason(result);
        console.log(result);
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <SeasonInfo
        season={season}
        seasonName={season?.name}
        airDate={season?.air_date}
        overview={season?.overview}
      />
    </>
  );
};

export default Season;
