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

const AddToWatchlist = ({ movie }) => {
  const { addItemToWatchlist, watchlist } = useContext(GlobalContext);
  const { removeItemFromWatchList } = useContext(GlobalContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let storedMovie = watchlist.find(o => o.id === movie.id);
  const watchlistDisabled = storedMovie ? true : false;

  const modalTimeout = () => {
    setTimeout(() => {
      onClose();
    }, 2000);
  };

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
              addItemToWatchlist(movie);
              onOpen();
              modalTimeout();
            }}
          >
            <ImEyePlus />
          </li>
        ) : (
          <li onClick={() => removeItemFromWatchList(movie.id)}>
            <ImEyeBlocked />
          </li>
        )}
      </ul>
    </div>
  );
};

export default AddToWatchlist;
