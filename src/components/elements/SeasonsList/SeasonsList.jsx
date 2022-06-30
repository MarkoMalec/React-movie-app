import React from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../fetch';
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Container, SimpleGrid, VStack, Flex } from '@chakra-ui/react';
import NoPoster from './no_poster.png';
import './SeasonsList.scss';
// https://api.themoviedb.org/3/tv/1418?api_key=42214994d64dce461ed78a05f2ce5b3b&language=en-US&append_to_response=season_groups
const SeasonsList = () => {
  const [seasons, setSeasons] = useState(null);
  const [loading, setLoading] = useState(true);

  const { showId } = useParams();
  const { seasonId } = useParams();

  useEffect(() => {
    let endpoint = `${API_URL}tv/${showId}?api_key=${API_KEY}&language=en-US&append_to_response=season_groups`;
    fetchSeasons(endpoint);
  }, [showId]);

  const fetchSeasons = endpoint => {
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        // console.table(result.seasons);
        setSeasons(result.seasons);
        setLoading(false);
      });
  };

  return (
    <>
      <Container as="main">
        {seasons && !loading ? (
          <div className="seasons-list">
            {console.log(seasons.length)}
            {seasons?.map((el, i) => (
              <div className="seasons-list-block" key={el.id} gap="1rem">
                <Link to={{ pathname: `/tv/${showId}/season/${i}` }}>
                  <img
                    src={
                      el.poster_path
                        ? `${IMAGE_BASE_URL}w154${el.poster_path}`
                        : NoPoster
                    }
                    alt={el.name}
                  />
                </Link>
                <div className="seasons-list-block-description">
                  <h3>{el.name}</h3>
                  <p>{el.overview}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No seasons provided for this show.</p>
        )}
      </Container>
    </>
  );
};

export default SeasonsList;
