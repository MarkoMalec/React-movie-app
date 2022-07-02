import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../../fetch';
import { Container } from '@chakra-ui/react';
import NoPoster from '../../../assets/NoPoster/no_poster.png';
import './SeasonEpisodes.scss';

const SeasonEpisodes = ({ seasonEpisodes }) => {
  return (
    <>
      <Container as="main" className="episode-list">
        {seasonEpisodes.map((episode, i) => (
          <div key={episode.id} className='episode-wrapper'>
            <div className="episode-box">
              <div className="episode-img-wrapper">
                <img
                  src={`${IMAGE_BASE_URL}${POSTER_SIZE}${episode.still_path}`}
                />
              </div>
              <div className="episode-info">
                <h3><span>{episode.episode_number}. </span>{episode.name}</h3>
                <p>{episode.overview}</p>
              </div>
            </div>
            <h4>Guest stars</h4>
            <div key={i} className="person-carousel">
              <div className="person-showcase">
                {episode.guest_stars.map((person) => (
                  //   <Link
                  //     key={season.id}
                  //     to={{ pathname: `season/${i}` }}
                  //   >
                  <div className="persons-showcase-item" key={person.id}>
                    <img
                      src={
                        person.profile_path
                          ? `${IMAGE_BASE_URL}w92${person.profile_path}`
                          : NoPoster
                      }
                      alt={person.name}
                    />
                    <p>{person.name}</p>
                  </div>
                  //   </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Container>
    </>
  );
};

export default SeasonEpisodes;
