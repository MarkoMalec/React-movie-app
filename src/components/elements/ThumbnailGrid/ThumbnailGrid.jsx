import React from "react";
import { Grid, GridItem, SimpleGrid, Box } from "@chakra-ui/react";
// import { Box } from "@chakra-ui/react";

const ThumbnailGrid = ({ children, header, preHeader, loading }) => {
    const renderElements = () => {
        const GridElements = children.map((element, i) => {
            return(
                <Box key={i} height="100%">
                    {element}
                </Box>
            )
        })
        return GridElements;
    }

    
    return(
        <div className="movie-thumbnail-grid-wrap">
          {header && !loading ?
            <>
              {header === 'Cast' ?
                <h3 className="movie-thumbnail-grid-title">Cast</h3>
                :
                <h1 className="movie-thumbnail-grid-title">
                  {preHeader ?
                    <span className="movie-thumbnail-grid-title-pre">{preHeader}</span>
                    :
                    null
                  }
                  {header}
                </h1>
              }
            </>
            :
            null
          }
          <SimpleGrid minChildWidth='290px' spacing='30px'>
            {renderElements()}      
          </SimpleGrid>
        </div>
      )
    }


export default ThumbnailGrid;