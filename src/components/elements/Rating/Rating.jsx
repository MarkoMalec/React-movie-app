import React, { useState, useEffect } from 'react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

const Rating = ({ rating, isThumbnailRating }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => {
        setProgress(rating);
    }, 500)
  }, []);


  if (isThumbnailRating) {
    return (
        <CircularProgress
                    min={0}
                    max={10}
                    value={progress}
                    size="27px"
                    trackColor="#1A202C"
                    color={rating >= 7.5 ? '#098500' : rating >= 5 ? '#c7b000' : '#9e0303'}
                    bgColor="rgba(0, 0, 0, .2)"
                    borderRadius="50px"
                    thickness={7}
                  >
                    <CircularProgressLabel
                      color="whiteAlpha.900"
                      fontWeight="700"
                      fontSize=".65rem"
                    >
                      {rating}
                    </CircularProgressLabel>
                  </CircularProgress>
    );
  }
  return (
    <CircularProgress
      min={0}
      max={10}
      value={progress}
      size="53px"
      mt="1rem"
      trackColor="#1A202C"
      color={rating >= 7.5 ? '#098500' : rating >= 5 ? '#f7da00' : '#9e0303'}
      thickness={4}
      bgColor="rgba(0, 0, 0, .3)"
      borderRadius="50px"
      animation={true}
    >
      <CircularProgressLabel fontSize="17px" pt="4px" color="whiteAlpha.900">
        {rating.toFixed(1)}
      </CircularProgressLabel>
    </CircularProgress>
  );
};

export default Rating;
