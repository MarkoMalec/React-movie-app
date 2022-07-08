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
  const { watchlist } = useContext(GlobalContext);
  const { removeItemFromWatchList } = useContext(GlobalContext);
  return (
    <Container as="main">
      {watchlist.length ? (
        <ThumbnailGrid preHeader={null} header={'Watchlist'} loading={false}>
          {watchlist.map(movie => (
            <div key={movie.id} className="watchlist-thumbnail-wrapper">
              <ul className="watchlist-controlls">
                <li onClick={() => removeItemFromWatchList(movie.id)}>
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
        `You have no movies on watchlist, go add some!`
      )}
    </Container>
  );
};

export default WatchList;
