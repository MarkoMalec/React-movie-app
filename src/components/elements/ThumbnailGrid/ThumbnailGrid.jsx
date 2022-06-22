import React from 'react';
import {
  SimpleGrid,
  Box,
  Center,
  Spinner,
  Container
} from '@chakra-ui/react';
import './ThumbnailGrid.scss';

const ThumbnailGrid = ({ children, header, preHeader, loading }) => {
  const renderElements = () => {
    const gridElements = children?.map((element, i) => {
      return (
        <Box maxW="350px" key={i} height='100%'>
          {element}
        </Box>
      );
    });
    return gridElements;
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
        <SimpleGrid columns={[1, 2, 3, 4]} spacing="20px">
          {renderElements()}
        </SimpleGrid>
      </Center>
    </div>
  );
};

export default ThumbnailGrid;
