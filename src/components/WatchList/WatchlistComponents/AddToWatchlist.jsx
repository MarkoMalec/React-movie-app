import React, { useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalState';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { ImEyePlus, ImEyeBlocked, ImCheckmark } from 'react-icons/im';
import { useLocation } from 'react-router-dom';

const AddToWatchlist = ({ movie, show }) => {
  const { addMovieToWatchlist, addShowToWatchlist, watchlist, tvWatchlist } =
    useContext(GlobalContext);
  const { removeMovieFromWatchlist, removeShowFromWatchlist } =
    useContext(GlobalContext);

  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (movie) {
    var storedMovie = watchlist.find(o => o.id === movie.id);
  }
  if (show) {
    var storedShow = tvWatchlist.find(o => o.id === show.id);
  }
  const watchlistDisabled = storedMovie || storedShow ? true : false;

  const modalTimeout = () => {
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  if (
    location.pathname.includes('TvHome') ||
    location.pathname.includes('tv')
  ) {
    return (
      <div className="watchlist-thumbnail-wrapper">
        <ul className="watchlist-controlls">
          <Modal
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInBottom"
            size="xs"
          >
            <ModalOverlay bg="none" />
            <ModalContent top="-3.5rem" boxShadow="none">
              <ModalBody>
                <p className="watchlist-modal-text-added">
                  <span>
                    <ImCheckmark />
                  </span>
                  Added to watchlist!
                </p>
              </ModalBody>
            </ModalContent>
          </Modal>
          {!watchlistDisabled ? (
            <li
              onClick={() => {
                addShowToWatchlist(show);
                onOpen();
                modalTimeout();
              }}
            >
              <ImEyePlus />
            </li>
          ) : (
            <li onClick={() => removeShowFromWatchlist(show.id)}>
              <ImEyeBlocked />
            </li>
          )}
        </ul>
      </div>
    );
  }

  return (
    <div className="watchlist-thumbnail-wrapper">
      <ul className="watchlist-controlls">
        <Modal
          blockScrollOnMount={false}
          isOpen={isOpen}
          onClose={onClose}
          motionPreset="slideInBottom"
          size="xs"
        >
          <ModalOverlay bg="none" />
          <ModalContent top="-3.5rem" boxShadow="none">
            <ModalBody>
              <p className="watchlist-modal-text-added">
                <span>
                  <ImCheckmark />
                </span>
                Added to watchlist!
              </p>
            </ModalBody>
          </ModalContent>
        </Modal>
        {!watchlistDisabled ? (
          <li
            onClick={() => {
              addMovieToWatchlist(movie);
              onOpen();
              modalTimeout();
            }}
          >
            <ImEyePlus />
          </li>
        ) : (
          <li onClick={() => removeMovieFromWatchlist(movie.id)}>
            <ImEyeBlocked />
          </li>
        )}
      </ul>
    </div>
  );
};

export default AddToWatchlist;
