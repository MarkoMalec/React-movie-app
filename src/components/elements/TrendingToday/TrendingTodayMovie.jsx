import React, { useEffect, useState } from 'react';
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  BACKDROP_SIZE,
} from '../../../fetch';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import './TrendingToday.scss';
import { Container } from '@chakra-ui/react';

const TrendingTodayMovie = () => {
  const [movies, setMovies] = useState([]);

  const fetchTrendingMovies = async () => {
    const response = await fetch(
      `${API_URL}trending/movie/day?api_key=${API_KEY}`
    );
    const data = await response.json();
    setMovies(data.results);
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, [])

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <Container as="main" className='trending_container'>
      <Splide
        className="trending_splider"
        options={{
          rewind: true,
          drag: false,
          autoplay: true,
          interval: 7000,
          arrows: false,
          easing: 'linear',
          type: 'fade',
        }}
      >
        {movies.map((movie) => (
          <SplideSlide key={movie.id}>
            <div
              className="trending_slide"
              style={{
                background: `top / cover no-repeat url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path})`,
              }}
            >
              <Container as="main" className="trending_slide_content">
                <small>Popular today:</small>
                <h2 className="trending_slide_title">{movie.title}</h2>
                <p className="trending_slide_overview">{movie.overview}</p>
              </Container>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </Container>
  );
};

export default TrendingTodayMovie;
