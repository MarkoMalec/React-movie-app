import React, { useEffect } from "react";
import { Container } from "@chakra-ui/react";
import MovieReviews from './MovieReviews'
import './UserReview.scss';

const UserReviews = () => {
    return (
        <Container as='main' className="screenplay-reviews-container">
            <h1>TMDB User reviews</h1>
            <MovieReviews />
        </Container>
    )
}

export default UserReviews;