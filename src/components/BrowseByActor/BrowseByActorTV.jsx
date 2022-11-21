import { React, useState, useEffect } from 'react';
import { API_KEY, API_URL, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { useParams } from 'react-router-dom';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import NoPoster from '../../assets/NoPoster/no_poster.png';

const BrowseByActorTV = ({ person }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);

  const { actorId } = useParams();

  useEffect(() => {
    const tvCreditsEndpoint = `${API_URL}person/${actorId}/tv_credits?api_key=${API_KEY}&language=en-US`;
    fetchTvCredits(tvCreditsEndpoint);
  }, [actorId]);

  const fetchTvCredits = endpoint => {
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setShows(result.cast);
        setLoading(false);
      });
  };

  return (
    <>
      <ThumbnailGrid
        preHeader="TV Shows featuring "
        header={person.name}
        loading={loading}
      >
        {shows?.map((el, i) => {
          return (
            <Thumbnail
              key={el.id}
              clickable={true}
              tvShow={true}
              image={
                el?.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${el.poster_path}`
                  : NoPoster
              }
              showId={el?.id}
              showName={el?.name}
              originalTitle={el?.original_name}
              showReleaseDate={el?.first_air_date}
              voteAverage={el.vote_average.toFixed(1)}
            />
          );
        })}
      </ThumbnailGrid>
    </>
  );
};

export default BrowseByActorTV;
