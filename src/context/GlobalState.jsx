import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  watchlist: localStorage.getItem('watchlist')
    ? JSON.parse(localStorage.getItem('watchlist'))
    : [],
    tvWatchlist: localStorage.getItem('tvWatchlist')
    ? JSON.parse(localStorage.getItem('tvWatchlist'))
    : [],
  watched: localStorage.getItem('watched')
    ? JSON.parse(localStorage.getItem('watched'))
    : [],
};

// create context
export const GlobalContext = createContext(initialState);

// components provider
export const GlobalProvider = props => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    localStorage.setItem('tvWatchlist', JSON.stringify(state.tvWatchlist));
    localStorage.setItem('watched', JSON.stringify(state.watched));

  }, [state]);

  //actions
  const addMovieToWatchlist = screenplay => {
    dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: screenplay });
  };

  const addShowToWatchlist = screenplay => {
    dispatch({ type: 'ADD_SHOW_TO_WATCHLIST', payload: screenplay });
  };

  const removeMovieFromWatchlist = id => {
    dispatch({ type: 'REMOVE_MOVIE_FROM_WATCHLIST', payload: id })
  }
  const removeShowFromWatchlist = id => {
    dispatch({ type: 'REMOVE_SHOW_FROM_WATCHLIST', payload: id })
  }

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        tvWatchlist: state.tvWatchlist,
        watched: state.watched,
        addMovieToWatchlist,
        addShowToWatchlist,
        removeMovieFromWatchlist,
        removeShowFromWatchlist,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
