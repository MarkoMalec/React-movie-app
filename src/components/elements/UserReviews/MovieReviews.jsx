import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../../fetch';
import { useLocation } from 'react-router-dom';
import { Container } from '@chakra-ui/react';
import { FiStar } from 'react-icons/fi';
import ReviewText from './ReviewText';

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState();
  const [color, setColor] = useState('');
  const currentLocation = useLocation();

  useEffect(() => {
    const endpoint = `${API_URL}${currentLocation.pathname}/reviews?api_key=${API_KEY}&page=1`;
    fetch(endpoint)
      .then(resolve => resolve.json())
      .then(result => {
        setMovieReviews(result.results);
      });
  }, [currentLocation.pathname]);

  const randomColor = () => {
    return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
  };

  return (
    <Container as="main">
      <div className="screenplay-reviews-container">
        {movieReviews ? (
          <>
            {movieReviews.map(review => (
              <div key={review.id} className="review-box">
                <div className="review-user-info">
                  <div className="review-user-image">
                    {review.author_details.avatar_path ? (
                      <img
                        src={
                          review.author_details.avatar_path?.includes(
                            'gravatar'
                          )
                            ? `https://www.gravatar.com/avatar/${review.author_details.avatar_path.slice(
                                33,
                                200
                              )}`
                            : `${IMAGE_BASE_URL}w154${review.author_details.avatar_path}`
                        }
                        alt={review.author.name}
                      />
                    ) : (
                      <div
                        className="blank-avatar"
                        style={{ backgroundColor: randomColor() }}
                      ></div>
                    )}
                  </div>
                  <h3>{review.author_details.username}</h3>
                  <p className="review_rating">
                    <FiStar />
                    {review.author_details.rating
                      ? review.author_details.rating
                      : '?'}
                  </p>
                  <span>{review.created_at.slice(0, 10)}</span>
                </div>
                <ReviewText text={review.content} />
              </div>
            ))}
          </>
        ) : (
          'No reviews available for this movie.'
        )}
      </div>
      {movieReviews?.length > 1 ? (
        <a className="see_more_reviews" href="#">See all reviews ({movieReviews.length})</a> 
      )
      : 'less than 1'}
    </Container>
  );
};

export default MovieReviews;
