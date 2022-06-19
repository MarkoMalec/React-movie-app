import React from 'react';
import {
  SimpleGrid,
  Box,
  Center,
  Spinner
} from '@chakra-ui/react';
import './ThumbnailGrid.scss';

const ThumbnailGrid = ({ children, header, preHeader, loading }) => {
  const renderElements = () => {
    const GridElements = children.map((element, i) => {
      return (
        <Box maxW="350px" minW='100px' key={i} h="100%">
          {element}
        </Box>
      );
    });
    return GridElements;
  };

  return (
    <div className="movie-thumbnail-grid-wrap">
      {header && !loading ? (
        <>
          {header === 'Cast' ? (
            <h3 className="movie-thumbnail-grid-title">Cast</h3>
          ) : (
            <h1 className="movie-thumbnail-grid-title">
              {preHeader ? (
                <span className="movie-thumbnail-grid-title-pre">
                  {preHeader}
                </span>
              ) : null}
              {header}
            </h1>
          )}
        </>
      ) : <Spinner />}
      <Center>
        <SimpleGrid columns={[2, 3, 4]} spacing="20px">
          {renderElements()}
        </SimpleGrid>
      </Center>
    </div>
  );
};

export default ThumbnailGrid;
