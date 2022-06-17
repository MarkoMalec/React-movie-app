import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../fetch";
import { useState, useEffect } from "react";
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid'
import Actor from "../elements/Actor/Actor";
import { motion } from "framer-motion";

import './Movie.css';
import MovieInfo from "../elements/MovieInfo/MovieInfo";


const Movie = () => {
    const [movie, setMovie] = useState(null);
    const [actors, setActors] = useState(null);
    const [directors, setDirectors] = useState([]);
    const [writers, setWriters] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false);

    const movieId = useLocation();

    useEffect(() => {
        const endpoint = `${API_URL}${movieId.pathname}?api_key=${API_KEY}&language=en-US`;
        setLoading(false);
        fetchItems(endpoint);
    }, [movieId])

    const fetchItems = async endpoint => {
        // const movieId = useLocation();
        try {
          const result = await (await fetch(endpoint)).json();
          if (result.status_code) {
            setLoading(false);
          } else {
            setMovie(result);
            const creditsEndpoint = `${API_URL}${movieId.pathname}/credits?api_key=${API_KEY}`;
            const videosEndpoint = `${API_URL}${movieId.pathname}/videos?api_key=${API_KEY}`;
            const creditsResult = await (await fetch(creditsEndpoint)).json();
            const directors = creditsResult.crew.filter(
              (member) => member.job === 'Director'
            );
            const writers = creditsResult.crew.filter(
              (member) => member.job === 'Screenplay'
            );
            setActors(creditsResult.cast);
            setDirectors()
            setWriters()
            setLoading(false)
            console.log(creditsResult.cast)
            const videosResult = await (await fetch(videosEndpoint)).json();
            setVideos(videosResult.results);
            setLoading(false);
            console.log(movie);
          }
        } catch(error) {
          console.log('error: ', error);
        }
      }

      return(
        <>
        <motion.div className="movie" style={{ backgroundColor: '', height: '100vw' }} transition={{ default: {duration: 0.1} }} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ x: window.innerWidth }}>
            {movie && videos ? 
            // <div className="movie-container">
            //   <div className="movie-header">
            //     <img src={`${IMAGE_BASE_URL}w342${movie.backdrop_path}`} />
            //     <h1>{movie.title}</h1>
            //   </div>
              <>
                <MovieInfo movie={movie} />
            
              {actors ? 
                <ThumbnailGrid header="Movie Cast">
                  {actors.map((el, i) => {
                    return <Actor key={i} actor={el} />
                  })}
                </ThumbnailGrid>
                :
                <p>No cast for this movie.</p>}
              <div className="movie-content">
              </div>
            </>
            : <div>nothing</div>}
            
            </motion.div>
        </>
        
      )
}

export default Movie;