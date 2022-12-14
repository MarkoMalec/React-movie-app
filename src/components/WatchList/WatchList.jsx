import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import { Container } from '@chakra-ui/react';
import NoPoster from '../../assets/NoPoster/no_poster.png';
import { ImEyeBlocked } from 'react-icons/im';
import './WatchList.scss';

const WatchList = () => {
  const { watchlist, tvWatchlist } = useContext(GlobalContext);
  const { removeMovieFromWatchlist, removeShowFromWatchlist } =
    useContext(GlobalContext);
  return (
    <Container as="main">
      {watchlist.length ? (
        <ThumbnailGrid
          preHeader={null}
          header={'Movie Watchlist'}
          loading={false}
        >
          {watchlist.map(movie => (
            <div key={movie.id} className="watchlist-thumbnail-wrapper">
              <ul className="watchlist-controlls">
                <li onClick={() => removeMovieFromWatchlist(movie.id)}>
                  <ImEyeBlocked />
                </li>
              </ul>
              <Thumbnail
                clickable={true}
                movieId={movie.id}
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : NoPoster
                }
                movieName={movie.title}
                originalTitle={movie.original_title}
                releaseDate={movie.release_date}
                voteAverage={movie.vote_average}
                tvShow={false}
              />
            </div>
          ))}
        </ThumbnailGrid>
      ) : (
        'Your movie watchlist is empty!'
      )}
      {tvWatchlist.length ? (
        <ThumbnailGrid preHeader={null} header={'TV Watchlist'} loading={false}>
          {tvWatchlist.map(show => (
            <>
              {console.log(show.first_air_date)}
              <div key={show.id} className="watchlist-thumbnail-wrapper">
                <ul className="watchlist-controlls">
                  <li onClick={() => removeShowFromWatchlist(show.id)}>
                    <ImEyeBlocked />
                  </li>
                </ul>
                <Thumbnail
                  clickable={true}
                  showId={show.id}
                  image={
                    show.poster_path
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                      : NoPoster
                  }
                  showName={show.name}
                  originalTitle={show.original_name}
                  showReleaseDate={show.first_air_date}
                  voteAverage={show.vote_average}
                  tvShow={true}
                />
              </div>
            </>
          ))}
        </ThumbnailGrid>
      ) : (
        'Your TV watchlist is empty!'
      )}
    </Container>
  );
};

export default WatchList;
