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
    <div key={Math.random()} className="thumbnail-grid-wrap">
      {header && !loading ? (
        <>
          {header === 'Cast' ? (
            <h3 className="thumbnail-grid-title">Cast</h3>
          ) : (
            <h1 className="thumbnail-grid-title">
              {preHeader ? (
                <span className="thumbnail-grid-title-pre">
                  {preHeader}
                </span>
              ) : null}
              {header}
            </h1>
          )}
        </>
      ) : <Spinner size='xl' color='brand.700' />}
      <Center>
        <SimpleGrid columns={header === 'Cast' ? [2, 3, 4] : [1, 2, 3, 4]} spacingX="20px" spacingY='30px'>
          {renderElements()}
        </SimpleGrid>
      </Center>
    </div>
  );
};

export default ThumbnailGrid;
