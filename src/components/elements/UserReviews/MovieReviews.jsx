import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../fetch';
import { useLocation } from 'react-router-dom';
import ReviewText from './ReviewText';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState();
  const currentLocation = useLocation();

  useEffect(() => {
    const endpoint = `${API_URL}${currentLocation.pathname}/reviews?api_key=${API_KEY}&page=1`;
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setMovieReviews(result.results);
        console.table(result, ' movie review results');
      });
  }, [currentLocation.pathname]);

  return (
    <>
      {movieReviews?.length
        ? (
          
          <Splide options={{
            gap: '1rem',
            perPage: 4,
            breakpoints: {
              991: {
                perPage: 3,
              },
              678: {
                perPage: 2,
              },
              475: {
                paginationDirection: 'ttb',
                destroy: true,
              }
            }
          }}>
          {movieReviews.map(review => (
            <SplideSlide key={review.id}>
            <div className="review-box">
              <div className="review-user-info">
                <div className="review-user-image">
                <img
                  src={
                    review.author_details.avatar_path?.includes('gravatar')
                    ? `https://www.gravatar.com/avatar/${review.author_details.avatar_path.slice(
                      33,
                      200
                      )}`
                      : `${IMAGE_BASE_URL}w154${review.author_details.avatar_path}`
                    }
                    alt={review.author.name}
                    />
                    </div>
                <h3>{review.author_details.username}</h3>
                <p className="review_rating">{review.author_details.rating}</p>
                <span>{review.created_at.slice(0, 10)}</span>
              </div>
              
                <ReviewText text={review.content} />
              
            </div>
            </SplideSlide>
        ))}
        </Splide>
      
          )
        : 'No reviews available for this movie.'}
    </>
  );
};

export default MovieReviews;
