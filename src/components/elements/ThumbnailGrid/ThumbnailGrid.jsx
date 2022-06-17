import React from 'react';
import {
  SimpleGrid,
  Box,
  Center,
} from '@chakra-ui/react';
import './ThumbnailGrid.css';

const ThumbnailGrid = ({ children, header, preHeader, loading }) => {
  const renderElements = () => {
    const GridElements = children.map((element, i) => {
      return (
        <Box maxW="275px" key={i} h="100%">
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
      ) : null}
      <Center>
        <SimpleGrid columns={[1, 2, 4]} spacing="20px">
          {renderElements()}
        </SimpleGrid>
      </Center>
    </div>
  );
};

export default ThumbnailGrid;
