import React from 'react';
import { Center } from '@chakra-ui/react';
import { FiPlusCircle, FiPlus } from 'react-icons/fi';
import './LoadMoreButton.scss';

const LoadMoreButton = ({ onClick, text }) => {
  return (
    <>
      <Center>
        <div className="load-more-button-container">
          <button onClick={onClick}>
            <FiPlusCircle />
            <FiPlus />
            {text}
          </button>
        </div>
      </Center>
    </>
  );
};

export default LoadMoreButton;
