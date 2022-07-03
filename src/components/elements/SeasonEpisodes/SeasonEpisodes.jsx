import { React } from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import { Link } from 'react-router-dom';
import { Container, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import NoPoster from '../../../assets/NoPoster/no_poster.png';
import './SeasonEpisodes.scss';

const SeasonEpisodes = ({ seasonEpisodes }) => {
  return (
    <>
      <Container as="main" mt="2.5rem" className="episode-list">
        <h1>Episodes</h1>
        {seasonEpisodes.map((episode, i) => (
          <div key={episode.id} className="episode-wrapper">
            <div className="episode-box">
              <div className="episode-img-wrapper">
                {episode.still_path ? (
                    <img
                      src={`${IMAGE_BASE_URL}${POSTER_SIZE}${episode.still_path}`}
                      alt={episode.name}
                    />
                ) : null}
              </div>
              <div className="episode-info">
                <h3>
                  <span>{episode.episode_number}. </span>
                  {episode.name ? `${episode.name}` : 'Episode'}
                </h3>
                <span>{episode.runtime ? `${episode.runtime}min` : null}</span>
                <div className='episode-vote-average'>
                    <CircularProgress value={episode.vote_average} max={10} trackColor="primary.200" size='35px' color='tomato'>
                        <CircularProgressLabel fontSize='14px'>
                            {episode.vote_average.toFixed(1)}
                        </CircularProgressLabel>
                    </CircularProgress>
                </div>
                <p>{episode.overview ? `${episode.overview}` : 'The show has not provided any episode description.. yet'}</p>
              </div>
            </div>
            <h4>Guest stars</h4>
            {episode.guest_stars ? (
            <div key={i} className="person-carousel">
              <div className="person-showcase">
                {episode.guest_stars.map(person => (
                  <Link
                    key={person.id}
                    to={{ pathname: `/actor/${person.id}` }}
                  >
                    <div className="persons-showcase-item" key={person.id}>
                      <img
                        src={
                          person.profile_path
                            ? `${IMAGE_BASE_URL}w92${person.profile_path}`
                            : NoPoster
                        }
                        alt={person.name}
                      />
                    </div>
                    <p>{person.name}</p>
                  </Link>
                ))}
              </div>
            </div>
            ) : null}
          </div>
        ))}
      </Container>
    </>
  );
};

export default SeasonEpisodes;
