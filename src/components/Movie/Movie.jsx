import React from "react";
import { useLocation } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../fetch";
import { useState, useEffect } from "react";
import { Spinner, Text } from '@chakra-ui/react';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid'
import Actor from "../elements/Actor/Actor";
import MovieInfo from "../elements/MovieInfo/MovieInfo";
import { motion } from "framer-motion";

import './Movie.css';


const Movie = () => {
    const [movie, setMovie] = useState(null);
    const [actors, setActors] = useState(null);
    const [directors, setDirectors] = useState([]);
    const [writers, setWriters] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const movieId = useLocation();

    useEffect(() => {
        const endpoint = `${API_URL}${movieId.pathname}?api_key=${API_KEY}&language=en-US`;
        // setLoading(false);
        fetchItems(endpoint);
        window.scrollTo({
          top: -50,
        });
    }, [movieId])

    const fetchItems = async endpoint => {
        try {
          const result = await (await fetch(endpoint)).json();
          if (result.status_code) {
            return <Spinner size='xl'/>
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
            setDirectors(directors);
            setWriters(writers);
            const videosResult = await (await fetch(videosEndpoint)).json();
            setVideos(videosResult.results);
            setLoading(false);
          }
        } catch(error) {
          console.log('error: ', error);
        }
      }

      return(
        <>
        <motion.div className="movie" style={{ backgroundColor: '', height: '100vw' }} transition={{ default: {duration: 0.1} }} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ x: window.innerWidth }}>
            {movie && videos ? 
              <>
                <MovieInfo movie={movie} movieName={movie.title} directors={directors} writers={writers} videos={videos} loading={loading} />
              {actors ? 
                <ThumbnailGrid header="Movie Cast">
                  {actors.map((el, i) => {
                    return <Actor key={i} actor={el} loading={loading} />
                  })}
                </ThumbnailGrid>
                :
                <Text as='h2' color='whiteAlpha.800'>No cast provided for this movie.</Text>}            
            </>
            : null}          
            </motion.div>
        </>
        
      )
}

export default Movie;