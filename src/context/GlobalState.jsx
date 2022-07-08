import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

const initialState = {
  watchlist: localStorage.getItem('watchlist')
    ? JSON.parse(localStorage.getItem('watchlist'))
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
    localStorage.setItem('watched', JSON.stringify(state.watched));

  }, [state]);

  //actions
  const addItemToWatchlist = screenplay => {
    dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: screenplay });
  };

  const removeItemFromWatchList = id => {
    dispatch({ type: 'REMOVE_ITEM_FROM_WATCHLIST', payload: id })
  }

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addItemToWatchlist,
        removeItemFromWatchList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
