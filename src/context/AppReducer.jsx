export default (state, action) => {
  switch (action.type) {
    case 'ADD_MOVIE_TO_WATCHLIST':
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
      case 'ADD_SHOW_TO_WATCHLIST':
        return {
          ...state,
          tvWatchlist: [action.payload, ...state.tvWatchlist],
        };
      case 'REMOVE_MOVIE_FROM_WATCHLIST':
        return {
          ...state,
          watchlist: state.watchlist.filter(screenplay => screenplay.id !== action.payload),
        };
        case 'REMOVE_SHOW_FROM_WATCHLIST':
        return {
          ...state,
          tvWatchlist: state.tvWatchlist.filter(screenplay => screenplay.id !== action.payload),
        };
    default:
      return state;
  }
};
