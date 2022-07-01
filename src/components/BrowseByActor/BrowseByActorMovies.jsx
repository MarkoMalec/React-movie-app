import React from 'react';
import { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE } from '../../fetch';
import { useParams } from 'react-router-dom';
import ThumbnailGrid from '../elements/ThumbnailGrid/ThumbnailGrid';
import Thumbnail from '../elements/Thumbnail/Thumbnail';
import LoadMoreButton from '../elements/LoadMoreButton/LoadMoreButton';
import NoPoster from '../../assets/NoPoster/no_poster.png';

const BrowseByActorMovies = ({ person }) => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const { actorId } = useParams();

  useEffect(() => {
    const movieEndpoint = `${API_URL}discover/movie?api_key=${API_KEY}&with_cast=${actorId}&language=en-US&&sort_by=release_date.desc&page=1`;
    fetch(movieEndpoint)
      .then(resolve => resolve.json())
      .then(res => {
        setMovies(res.results);
        setCurrentPage(res.page);
        setTotalPages(res.total_pages);
      })
      .catch(error => console.log(error));
  }, [actorId]);

  const fetchItems = async endpoint => {
    try {
      const result = await (await fetch(endpoint)).json();
      setMovies([...movies, ...result.results]);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const loadMoreItems = () => {
    let endpoint = '';
    setLoading(true);
    endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&with_cast=${actorId}&language=en-US&&sort_by=release_date.desc&page=${
      currentPage + 1
    }`;
    setCurrentPage(prev => prev + 1);
    fetchItems(endpoint);
  };

  return (
    <>
      <ThumbnailGrid
        preHeader="Movies featuring "
        header={person.name}
        loading={loading}
      >
        {movies?.map((el, i) => {
          return (
            <Thumbnail
              key={i}
              clickable={true}
              image={
                el?.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${el.poster_path}`
                  : NoPoster
              }
              movieId={el?.id}
              movieName={el?.title}
              originalTitle={el?.original_title}
              releaseDate={el?.release_date}
              voteAverage={el?.vote_average}
            />
          );
        })}
      </ThumbnailGrid>
      {currentPage < totalPages && !loading ? (
        <LoadMoreButton onClick={loadMoreItems} text="Load more movies" />
      ) : null}
    </>
  );
};

export default BrowseByActorMovies;
