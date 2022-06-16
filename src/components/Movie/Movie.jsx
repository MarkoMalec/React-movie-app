import React from "react";
import { Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { API_URL, API_KEY } from "../../fetch";
import { useState, useEffect } from "react";
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid'
import { motion } from "framer-motion";


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
        console.log(movieId);
    }, [])

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
        <motion.div className="movie" style={{ backgroundColor: 'blue', height: '100vw' }} transition={{ default: {duration: 1} }} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} exit={{ x: window.innerWidth }}>
            {movie && videos ? 
            <div>
              <Heading color='tomato'>{movie.title}</Heading>
            </div> 
            : <div>nothiong</div>}
            </motion.div>
        </>
      )
}

export default Movie;