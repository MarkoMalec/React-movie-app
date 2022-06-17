import React from "react";
import { IMAGE_BASE_URL, BACKDROP_SIZE, POSTER_SIZE } from "../../../fetch";
import { Container, Flex } from "@chakra-ui/react";
import Thumbnail from "../Thumbnail/Thumbnail";
import './MovieInfo.css';

const MovieInfo = ({ movie, movieName }) => {
    return (
        <>
        <Container maxW='1200px' pt={150}>
            <Flex gap={10}>
            <div className="movie-header-poster">
                <Thumbnail clickable={false} image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : <p>No poster</p>}/>
            </div>
            <div className="movie-header-overview">
                <h1>
                    {movie?.title}
                </h1>
            <div className="movie-header-description">
                {movie?.overview}

            </div>
            </div>
            <div>
            </div>
            </Flex>
        </Container>
        </>
    )
}

export default MovieInfo;